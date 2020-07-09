import React from 'react';
import TeamList from './TeamList';

export const RegisterPage = props => {
  const { error, username, team, players, onSubmit, onChange } = props;
  
  const errorMsg = error && <p className='error'>{error}</p>
  
  return (
    <div className='content-container'>
      <h1>Sign up here</h1>
      <form onSubmit={ onSubmit }>
        <input
          autoFocus
          className='text-input'
          placeholder='Name'
          name='username'
          onChange={ onChange }
          value={ username }
        />
        
        <select
          className='select'
          name='team'
          onChange={ onChange }
          value={ team }
        >
          <option value='A'>Team A</option>
          <option value='B'>Team B</option>
        </select>
        
        <button className='button button--input'>Go</button>
        
        { errorMsg }
        
        <div>
          <p className='list-header'>Already on Team A:</p>
          <TeamList players={ players } team='A' />
          
          <p className='list-header'>Already on Team B:</p>
          <TeamList players={ players } team='B' />
        </div>
      </form>
    </div>
  )
}

export default RegisterPage;
