import React from 'react';
import { connect } from 'react-redux';

export const TeamList = (props) => {
  let list;
  // Render loading message whilst db call runs
  if (props.players.players.length === 0 && !props.players.isLoading) {
    list = <li>No one yet</li>
  } else if (props.players.players.length === 0 || props.players.isLoading) {
    list = <li>Loading...</li>
  } else {
    // Generate list item for each player
    list = props.players.players.map(player => {
      return player.team === props.team && <li key={player.uid}>{player.userName}</li>
    })
  }
  
  return (
    <ul>
      {list}
    </ul>
  )
}
const mapStateToProps = (state) => ({
  players: state.players
});

export default connect(mapStateToProps)(TeamList);

