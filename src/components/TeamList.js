import React from 'react';
import { connect } from 'react-redux';

export const TeamList = ({ players, team }) => {
  let list;
  const teamRoster = players.data.filter(player => player.team === team);
  
  // Render loading message whilst db call runs
  if (teamRoster.length === 0 && !players.isLoading) {
    list = <li className='list__item list__item-message'>No one yet</li>
  } else if (players.isLoading) {
    list = <li className='list__item list__item-message'>Loading...</li>
  } else if (players.error) {
    list = <li className='list__item list__item-message'>Oops, something went wrong</li>
  } else {
    // Generate list item for each player
    list = teamRoster.map(player => <li className='list__item' key={ player.uid }>{ player.username }</li>)
  }
  
  return (
    <ul className='list'>
      { list }
    </ul>
  )
}

export default TeamList;
