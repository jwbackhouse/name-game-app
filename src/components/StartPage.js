import React from 'react';
import { connect } from 'react-redux';
import {startSetPlayer} from '../actions/users';


export const StartPage = (props) => {
  const teamA = props.teams.teamA;
  const teamB = props.teams.teamB;
  
  // Choose starting team
  const chooseTeam = () => {
    const index = Math.floor(Math.random() * 2);
    return index===0 ? 'A': 'B';
  };
  const startingTeam = chooseTeam();
  
  
  // TODO: check at least one person on each team
  const onClick = () => {
    const team = `team${startingTeam}`;
    // const index = Math.floor(Math.random() * props.teams[team].length);
    // const player = props.teams[team][index];
    
    // FOR TESTING
    const index = props.teams.teamA.length - 1;
    const player = props.teams.teamA[index];
    
    console.log('Player:', player.userName, player.uid);
    props.startSetPlayer(player.uid);
    props.history.push('/play');
  };
  
  return (
    <div>
      <h1>Ready to go?</h1>
      <h3>Team A</h3>
      {teamA.map((teamMember) =>
        <p key={teamMember.uid}>{teamMember.userName}</p>
      )}
      <h3>Team B</h3>
      {teamB.map((teamMember) =>
        <p key={teamMember.uid}>{teamMember.userName}</p>
      )}
      <p>{`Team ${startingTeam} will start.`}</p>
      <button onClick={onClick}>Let's play</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  teams: state.teams
});

const mapDispatchToProps = (dispatch) => ({
  startSetPlayer: (id) => dispatch(startSetPlayer(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(StartPage);