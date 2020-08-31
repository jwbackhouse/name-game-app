import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, useHistory } from 'react-router-dom';
import database from '../firebase/firebase';
import withLiveData from '../helpers/withLiveData';
import { resetGame, initialiseGame } from '../actions/game';
import { removeAllNames } from '../actions/names';


const AdminPage = ({ initialiseGame, removeAllNames, resetGame, game, history }) => {
  const [submitMsg, setSubmitMsg] = useState('');
  
  // Number of passes allowed per player
  const [numPasses, setNumPasses] = useState(game.numPasses || 2);
  const onPassesChange = (e) => setNumPasses(e.target.value);
  useEffect(() => {
    if (game.numPasses !== undefined) setNumPasses(game.numPasses)  // needed otherwise input becomes uncontrolled
  }, [game.numPasses]);

  // Number of names each player needs to submit
  const [numNames, setNumNames] = useState(game.numNames || 5);
  const onNamesChange = (e) => setNumNames(e.target.value);
  useEffect(() => {
    if (game.numNames !== undefined) setNumNames(game.numNames)  // needed otherwise input becomes uncontrolled
  }, [game.numNames]);
  
  // Length of timer for guesses
  const [timerLength, setTimerLength] = useState(game.timerLength || 60);
  const onTimerChange = (e) => setTimerLength(e.target.value);
  
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
          initialiseGame();
          setSubmitMsg('Data successfully reset.');
        });
      removeAllNames();
      resetGame();
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
        <label>Time allowed for guessing (in minutes)
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
  removeAllNames: () => dispatch(removeAllNames()),
  resetGame: () => dispatch(resetGame()),
  initialiseGame: () => dispatch(initialiseGame())
});


const connectedWithLiveData = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLiveData,
);

export default connectedWithLiveData(AdminPage);
