import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, useHistory } from 'react-router-dom';
import database from '../firebase/firebase';
import withLiveData from '../helpers/withLiveData';
import { startResetGame, initialiseGame } from '../actions/game';


const AdminPage = ({ initialiseGame, startResetGame, game, history }) => {
  const [submitMsg, setSubmitMsg] = useState('');
  
  // Number of passes allowed per player
  const [numPasses, setNumPasses] = useState(game.numPasses || '');
  const onPassesChange = (e) => setNumPasses(e.target.value);
  useEffect(() => {
    if (game.numPasses !== undefined) setNumPasses(game.numPasses)  // needed otherwise input becomes uncontrolled
  }, [game.numPasses]);

  // Number of names each player needs to submit
  const [numNames, setNumNames] = useState(game.numNames || '');
  const onNamesChange = (e) => setNumNames(e.target.value);
  useEffect(() => {
    if (game.numNames !== undefined) setNumNames(game.numNames)  // as above
  }, [game.numNames]);
  
  // Length of timer for guesses
  const [timerLength, setTimerLength] = useState(game.timerLength || '');
  const onTimerChange = (e) => setTimerLength(e.target.value);
  useEffect(() => {
    if (game.timerLength !== undefined) setTimerLength(game.timerLength)  // as above
  }, [game.timerLength]);
  
  // Very basic password protection for page access
  const [access, setAccess] = useState(undefined);
  if (access === undefined ) {
    const password = prompt('Please enter your password to view this page');
    const pass1 = 'namegame';
    password === pass1 ? setAccess(true): setAccess(false);
  }
  
  const onReset = () => {
    const confirm = window.confirm('Are you sure you want to reset the game? This can\'t be undone...');
    if (confirm) {
      database.ref().remove()
        .then(() => {
          startResetGame();
          initialiseGame();
          setSubmitMsg('Data successfully reset.');
        });
    }
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    if (+numNames <= 0 || timerLength <= 10 ) {
      setSubmitMsg('Sorry, something\'s not right with your figures.');
      return;
    }
    
    database.ref('game').update({
      numPasses: +numPasses,
      numNames: +numNames,
      timerLength: +timerLength,
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
            type='number'
          />
        </label>
        <label>Number of names for each player to submit
          <input
            name='numNames'
            id='numNames'
            value={ numNames }
            onChange={ onNamesChange }
            type='number'
          />
        </label>
        <label>Time allowed for guessing (in seconds)
          <input
            name='timerLength'
            id='timerLength'
            value={ timerLength }
            onChange={ onTimerChange }
            type='number'
          />
        </label>
        <button type='submit'>
          Save
        </button>
      </form>
      { submitMsg && <p>{ submitMsg }</p> }
      <br />
      <button onClick={ onReset }>
        Reset the game
      </button>
      <br />
      <br />
      <button onClick={ history.goBack } className='button'>
        Back
      </button>
    </div>
  );
  
  return access ? pageContent : null;
};

const mapStateToProps = (state) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch) => ({
  startResetGame: () => dispatch(startResetGame()),
  initialiseGame: () => dispatch(initialiseGame())
});


const connectedWithLiveData = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLiveData,
);

export default connectedWithLiveData(AdminPage);
