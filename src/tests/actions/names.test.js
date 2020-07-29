import {
  startAddName,
  updateNames,
  getNames,
  processNames,
  getNamesBegin,
  getNamesSuccess,
  getNamesFailure
} from '../../actions/names';
import database from '../../firebase/firebase';

// Mock Firebase object
jest.mock('../../firebase/firebase', () => {
  const set = jest.fn();
  const once = jest.fn();
  const push = jest.fn();
  return {
    ref: jest.fn(() => ({
      set,
      once,
      push,
    })),
  };
});

describe('Should get names from Firebase', () => {
  let once, dispatch
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
    expect(once).toHaveBeenCalledTimes(1);
    expect(once).toBeCalledWith('value');
  });
  
  // test('Should dispatch processNames if any names present', async () => {
  //   const processNames = jest.fn();
  //   await getNames()(dispatch);
    // expect(processNames).toBeCalled();
  // });
});

describe('Should process the received snapshot', () => {
  const mockSnapshot = [{
    val: () => ({ name: 'Lester Young' }),
    key: 1234,
  },{
    val: () => ({ name: 'Oscar Peterson' }),
    key: 5678,
  }];
  const dispatch = jest.fn();
  
  test('Should dispatch getNamesSuccess', async () => {
    await processNames(mockSnapshot)(dispatch);
    expect(dispatch).toBeCalledWith(getNamesSuccess([{
      id: 1234,
      name: 'Lester Young',
    },{
      id: 5678,
      name: 'Oscar Peterson'
    }]));
  });
})
