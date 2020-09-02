import React from 'react';
import TeamList from './TeamList';

const RegisterPage = props => {
  const {
    error,
    username,
    team,
    players,
    onSubmit,
    onNameChange,
    onTeamChange,
  } = props;
  
  const errorMsg = error && <p className='error'>{error}</p>;
  
  return (
    <div className='content-container'>
      <h1>Sign up here</h1>
      <form onSubmit={ onSubmit }>
        <div className='row-container'>
          <input
            autoFocus
            className='input'
            placeholder='Name'
            name='username'
            onChange={ onNameChange }
            value={ username }
          />
          
          <select
            className='select'
            name='team'
            onChange={ onTeamChange }
            value={ team }
          >
            <option value='A'>Team A</option>
            <option value='B'>Team B</option>
          </select>
          
          <button className='button button--no-margin'>Go</button>
        </div>
      </form>

      { errorMsg }

      <div className='block'>
        <p className='list__header'>Already on Team A:</p>
        <TeamList players={ players } team='A' />
        
        <p className='list__header'>Already on Team B:</p>
        <TeamList players={ players } team='B' />
      </div>
    </div>
  )
}

export default RegisterPage;
