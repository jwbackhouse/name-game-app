import React from 'react';

const PassedNamesButton = ({ toggleViewPassedNames, viewPassedNames }) =>
  <button className='button button--delete' onClick={ toggleViewPassedNames }>
    { viewPassedNames ? 'Return to unguessed names' : 'Re-try your passed names' }
  </button>;

export default PassedNamesButton;
