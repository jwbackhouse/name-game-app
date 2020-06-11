import React from 'react';
import { connect } from 'react-redux';

export const TeamList = (props) => {
  let list;
  const teamRoster = props.players.players.filter(player => player.team === props.team);
  // Render loading message whilst db call runs
  if (teamRoster.length === 0 && !props.players.isLoading) {
    list = <li>No one yet</li>
  } else if (teamRoster.length === 0 || props.players.isLoading) {
    list = <li>Loading...</li>
  } else {
    // Generate list item for each player
    list = teamRoster.map(player => <li key={player.uid}>{player.userName}</li>)
  }
  
  return (
    <ul>
      {list}
    </ul>
  )
}

export default TeamList;

