// HOC

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchData, endFetchData } from '../actions/game';


const withLiveData = (Component) => {
  return class extends React.Component {
    componentDidMount = () => {
      this.props.fetchData();
    }
    
    componentWillUnmount = () => {
      this.props.endFetchData();
    }
    
    render() {
      return <Component {...this.props } />
    }
  }
}
  
const mapStateToProps = state => ({
  players: state.players
})

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData()),
  endFetchData: () => dispatch(endFetchData()),
});

const connectedWithLiveData = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLiveData
);

export default connectedWithLiveData;
