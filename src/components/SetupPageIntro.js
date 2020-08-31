import React from 'react';
import TeamList from './TeamList';

export const SetupPageIntro = ({ remainingNames, word }) => (
  <div>
    <h1>Choose your names</h1>
    <p className='tip'>Friendly tip: It's a good idea to pick names everyone has heard of</p>
    { remainingNames !== 0
        ? <p className=''>{ `You have ${ remainingNames } ${ word } to add` }</p>
        : <p><b>You're good to go</b></p>
    }
  </div>
);

export default SetupPageIntro;
