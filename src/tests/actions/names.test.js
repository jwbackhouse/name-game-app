import {
  addName,
  startAddName,
  removeName,
  startRemoveName,
  removeAllNames,
  getNames,
  processNames,
  getNamesBegin,
  getNamesSuccess,
  getNamesFailure,
  updateNames,
} from '../../actions/names';
import database from '../../firebase/firebase';

// Mock Firebase object
jest.mock('../../firebase/firebase', () => {
  const set = jest.fn();
  const once = jest.fn();
  const push = jest.fn();
  const remove = jest.fn();
  
  return {
    ref: jest.fn(() => ({
      set,
      once,
      push,
      remove,
    })),
  };
});

describe('Adding names', () => {
  let nameObj, name, uid;
  beforeEach(() => {
    name = 'Duke Ellington';
    uid = '123abc';
    nameObj = {
      name,
      uid,
      isGuessed: false,
    };
  });
  
  test('Should setup addName object', () => {
    const expectedAction = {
      type:'ADD_NAME',
      nameObj,
    };
    expect(addName(nameObj)).toEqual(expectedAction);
  });
  
  test('Should push nameObj into Firebase', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      auth: { firebaseUID: uid }
    }));
    const push = database
      .ref()
      .push;
    push.mockResolvedValue(true);
    
    await startAddName(name)(dispatch, getState);
    
    expect(push).toBeCalledWith(nameObj);
    expect(dispatch).toBeCalledWith(addName(expect.objectContaining({
      ...nameObj
    })));
  });
});

describe('Removing name(s).', () => {
  const id = '246bdf';

  test('Should setup removeName object', () => {
    const expectedAction = {
      type:'REMOVE_NAME',
      id,
    };
    expect(removeName(id)).toEqual(expectedAction);
  });
  
  test('Should setup removeAllNames object', () => {
    const expectedAction = {
      type:'REMOVE_ALL_NAMES',
    };
    expect(removeAllNames()).toEqual(expectedAction);
  });
  
  test('Should remove name from Firebase and dispatch removeName()', async () => {
    const dispatch = jest.fn();
    const ref = database.ref;
    const remove = database
      .ref()
      .remove;
    remove.mockResolvedValue(true);
    
    await startRemoveName(id)(dispatch);
    
    expect(remove).toBeCalled();
    expect(ref).toBeCalledWith(`names/${id}`);
    expect(dispatch).toBeCalledTimes(1);
  });
});


describe('Calling getNames()', () => {
  let once, dispatch;
  beforeEach(() => {
    once = database
      .ref()
      .once;
    once.mockResolvedValue(true);
    dispatch = jest.fn();
  });
  
  test('Should dispatch getNamesBegin()', async () => {
    await getNames()(dispatch);
    expect(dispatch).toBeCalledWith(getNamesBegin());
  });
  
  test('Should get snapshot from Firebase', async () => {
    await getNames()(dispatch);
    expect(once).toBeCalledTimes(1);
    expect(once).toBeCalledWith('value');
  });
  
  // test('Should dispatch processNames if any names present', async () => {
  //   const processNames = jest.fn();
  //   await getNames()(dispatch);
    // expect(processNames).toBeCalled();
  // });
  
  describe('Processing the received snapshot', () => {
    const name1 = {
      name: 'Lester Young',
      id: 1234,
    };
    const name2 = {
      name: 'Oscar Peterson',
      id: 5678,
    };
    const mockSnapshot = [{
      val: () => ({ name: name1.name }),
      key: name1.id,
    },{
      val: () => ({ name: name2.name }),
      key: name2.id,
    }];
    
    test('Should dispatch getNamesSuccess', async () => {
      await processNames(mockSnapshot)(dispatch);
      
      expect(dispatch).toBeCalledWith(getNamesSuccess([{
        id: name1.id,
        name: name1.name,
      },{
        id: name2.id,
        name: name2.name
      }]));
    });
  });
  
  describe('Setting up the action objects', () => {
    test('Should set up the getNamesBegin object.', () => {
      const expectedAction = {
        type:'GET_NAMES_BEGIN',
      };
      expect(getNamesBegin()).toEqual(expectedAction);
    });
    
    test('Should set up the getNamesSuccess object.', () => {
      const mockArray = ['a', 'b'];
      const expectedAction = {
        type:'GET_NAMES_SUCCESS',
        payload: mockArray,
      };
      expect(getNamesSuccess(mockArray)).toEqual(expectedAction);
    });
    
    test('Should set up the getNamesFailure object.', () => {
      const error = 'Doh'
      const expectedAction = {
        type:'GET_NAMES_FAILURE',
        payload: { error },
      };
      expect(getNamesFailure(error)).toEqual(expectedAction);
    });
  });
  
  describe('Updating names', () => {
    test('Should update name status in Firebase.', async () => {
      const mockNames = [{ id: 1 }, { id: 2 }];
      const ref = database.ref;
      const set = database
        .ref()
        .set;
      
      await updateNames(mockNames)(dispatch);
      
      expect(set).toBeCalledTimes(2);
      expect(set).toBeCalledWith(true);
      expect(ref).lastCalledWith(`names/${ mockNames[1].id }/isGuessed`);
    });
  });
});

