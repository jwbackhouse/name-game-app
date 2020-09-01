import React from 'react';

const PassedNamesButton = ({ toggleViewPassedNames, viewPassedNames }) =>
  <button className='button button--background' onClick={ toggleViewPassedNames }>
    { viewPassedNames ? 'Return to unguessed names' : 'Re-try your passed names' }
  </button>;

export default PassedNamesButton;
