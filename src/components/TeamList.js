import React from 'react';
import { connect } from 'react-redux';

export const TeamList = (props) => {
  let list;
  const teamRoster = props.players.players.filter(player => player.team === props.team);
  // Render loading message whilst db call runs
  if (teamRoster.length === 0 && !props.players.isLoading) {
    list = <li className='list__item list__item--message'>No one yet</li>
  } else if (props.players.isLoading) {
    list = <li className='list__item list__item--message'>Loading...</li>
  } else {
    // Generate list item for each player
    list = teamRoster.map(player => <li className='list__item' key={player.uid}>{player.userName}</li>)
  }
  
  return (
    <ul className='list'>
      {list}
    </ul>
  )
}

export default TeamList;

