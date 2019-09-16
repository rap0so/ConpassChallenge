import React, { Component } from 'react';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import {
  SET_NEW_MARKER,
  GET_ALL_MARKERS,
  UPDATE_MARKER
} from './Actions/actionTypes';

import inspector from './Inspector';
import setDots from './Dots';
import './App.scss';
import { connect } from 'react-redux';

export class App extends Component {
  constructor() {
    super();
    this.handleCreateHotspot = this.handleCreateHotspot.bind(this);
  }

  /**
   * Handle all subfunctions relatives to first level hotspot creation
   */
  handleCreateHotspot() {
    inspector.turnInspectorOn(this.props.setNewMark);
  }
  componentDidMount() {
    this.props.getSavedMarkers();
    setDots(this.props.markers, this.props.updateMarker);
  }
  componentDidUpdate() {
    setDots(this.props.markers, this.props.updateMarker);
  }
  render() {
    return (
      <div>
        <Navbar />
        <Home handleCreateHotspot={this.handleCreateHotspot} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setNewMark: marker =>
    dispatch({
      type: SET_NEW_MARKER,
      marker
    }),
  updateMarker: data =>
    dispatch({
      type: UPDATE_MARKER,
      data
    }),
  getSavedMarkers: () =>
    dispatch({
      type: GET_ALL_MARKERS
    })
});

const mapStateToProps = state => ({
  markers: state.app.markers
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
