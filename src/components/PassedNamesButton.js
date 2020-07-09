import React from 'react';

const PassedNamesButton = props =>
  <button onClick={ props.toggleViewPassedNames }>
    { props.viewPassedNames ? 'Return to unguessed names' : 'Re-try your passed names' }
  </button>;


export default PassedNamesButton;


  // let viewPassedNamesButton;
  // if (this.state.passedNames.length > 0 && this.state.names.length > 0) {
  //   viewPassedNamesButton = (
  //     <button onClick={ this.toggleViewPassedNames }>
  //       { this.state.viewingPassedNames ? 'Return to unguessed names' : 'Re-try your passed names' }
  //     </button>
  //   );
  // }
    
    
  // toggleViewPassedNames = () => {
  //   if (this.state.viewingPassedNames) {
  //     this.setState(prevState => ({
  //       viewingPassedNames: false,
  //       unguessedIndex: '',
  //       index: this.state.unguessedIndex
  //     }));
  //   } else {
  //     this.setState(prevState => ({
  //       viewingPassedNames: true,
  //       // Save index of the last unguessed name
  //       unguessedIndex: prevState.index,
  //       index: 0
  //     }));
  //   }
  // };