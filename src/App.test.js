import React from 'react';
import { App } from './App';

import { shallow, mount } from 'enzyme'
import Inspector from './Inspector';

import { createStore } from 'redux';

import reducer from './Reducers';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { SET_NEW_MARKER, GET_ALL_MARKERS, UPDATE_MARKER } from './Actions/actionTypes'


describe('<App/>', () => {
  let appComponent
  beforeEach(() => {
    const div = document.createElement('div')
    const getSavedMarkersMock = () => true
    appComponent = shallow(<App getSavedMarkers={getSavedMarkersMock}/>, div)
  })
  it('renders without crashing', () => {
    expect(appComponent.length).toEqual(1)
  });
  it('render child components', () => {
    expect(appComponent.find('div').length).toBeGreaterThan(0)
  })
  it('execute inspector without error', () => {
    const spyInspector = jest.spyOn(Inspector, 'turnInspectorOn');
    const spyHandleCreateHotspot = jest.spyOn(appComponent.instance(), 'handleCreateHotspot');
    const returnInspector = spyInspector()
    
    appComponent.instance().handleCreateHotspot()
    
    expect(spyInspector).toHaveBeenCalled()
    expect(typeof Inspector.turnInspectorOn).toEqual('function')
    expect(spyHandleCreateHotspot).toHaveBeenCalled()
    expect(returnInspector).toBeTruthy()
  })
  it('connects properly to redux', () => {
    const store = createStore(reducer);
    const wrapper = mount( <Provider store={store}><App getSavedMarkers={() => true}/>/></Provider> )

    expect(wrapper.find(App).length).toEqual(1)
  })
  it('check actions and dispatchings', () => {
    const mockStore = configureStore()
    const store = mockStore({
      markers: []
    })
    store.dispatch({
      type: SET_NEW_MARKER,
      marker: {}
    })
    store.dispatch({
      type: UPDATE_MARKER,
      data: {}
    })
    store.dispatch({
      type: GET_ALL_MARKERS
    })
    const action = store.getActions()
    expect(action[0].type).toBe("SET_NEW_MARKER")
    expect(action[1].type).toBe("UPDATE_MARKER")
    expect(action[2].type).toBe("GET_ALL_MARKERS")
  })
})