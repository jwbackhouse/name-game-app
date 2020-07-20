import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, useHistory } from 'react-router-dom';
import database from '../firebase/firebase';
import withLiveData from '../helpers/withLiveData';


const AdminPage = ({ game, history }) => {
  const [submitMsg, setSubmitMsg] = useState('');
  
  // Number of passes allowed per player
  const [numPasses, setNumPasses] = useState(2);
  const onPassesChange = (e) => setNumPasses(e.target.value);
  useEffect(() => game.numPasses && setNumPasses(game.numPasses), [game.numPasses]);
  
  // Length of timer for guesses
  const [timerLength, setTimerLength] = useState(60);
  const onTimerChange = (e) => {
    const milliseconds = e.target.value * 1000;
    setTimerLength(milliseconds);
  };
  useEffect(() => game.timerLength && setTimerLength(game.timerLength), [game.timerLength]);
  
  // Very basic password protection for page access
  const [access, setAccess] = useState(undefined);
  useEffect(() => !access && history.goBack(), [access]);
  if (access === undefined ) {
    const password = prompt('Please enter your password to view this page');
    const pass1 = 'namegame';
    password === pass1 ? setAccess(true): setAccess(false);
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    database.ref('game').update({
      numPasses,
      timerLength,
    });
    setSubmitMsg('All saved for you.');
  };
  
  const pageContent = (
    <div>
      <h1>Game settings</h1>
      <form onSubmit={ onSubmit }>
        <label>Number of passes allowed
          <input
            name='numPasses'
            id='numPasses'
            value={ numPasses }
            onChange={ onPassesChange }
            placeholder='Suggest starting with 2'
            type='number'
          />
        </label>
        <label>Time allowed for guessing (in seconds)
          <input
            name='timerLength'
            id='timerLength'
            value={ timerLength / 1000 }
            onChange={ onTimerChange }
            placeholder='60 seconds works for most games'
            type='number'
          />
        </label>
        <button type='submit'>
          Submit
        </button>
      </form>
      { submitMsg && <p>{ submitMsg }</p> }
      <Link
        to='/'
        className='button'
      >
        Go home
      </Link>
    </div>
  );
  
  return access ? pageContent : null;
};

const mapStateToProps = (state) => ({
  game: state.game,
});

const connectedWithLiveData = compose(
  connect(mapStateToProps),
  withLiveData,
);

export default connectedWithLiveData(AdminPage);
