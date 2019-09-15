import React from 'react';
import { Hostspot } from './index';

import { shallow } from 'enzyme'

import configureStore from 'redux-mock-store'

import { REMOVE_MARKER } from '../../Actions/actionTypes'


describe('<Hotspot/>', () => {
  let hotspotComponent, store
  beforeEach(() => {
    const div = document.createElement('div')
    const mockStore = configureStore()
    store = mockStore()
    hotspotComponent = shallow(<Hostspot id={1}/>, div)
  })
  it('renders without crashing', () => {
    expect(hotspotComponent.length).toEqual(1)
  });
  it('execs function by clicking', () => {
    const removeMarkerMock = jest.fn()
    hotspotComponent = shallow(<Hostspot id={1} removeMarker={removeMarkerMock}/>, document.createElement('div'))
    hotspotComponent.find('button').simulate('click');
    expect(removeMarkerMock).toHaveBeenCalled()
  })
  it('remove marker', () => {
    store.dispatch({
        type: REMOVE_MARKER,
        id: 1
    })
    const action = store.getActions()
    expect(action[0].type).toBe("REMOVE_MARKER")
  })
})