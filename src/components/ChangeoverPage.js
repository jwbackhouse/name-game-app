import React from 'react';
import { connect } from 'react-redux';

export class ChangeoverPage extends React.Component {
  
  render = () => (
    <div>
      <h1>The scores on the doors</h1>
      <p>Team A: score</p>
      <p>Team B: score</p>
      <p>Up next: player</p>
      <button>If player, press to start</button>
    </div>
  )
  
}

export default ChangeoverPage;

