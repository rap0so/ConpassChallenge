import reducer from './markers'

describe('Markers reducer', () => {
    let stateMock
    beforeEach(() => {
        stateMock = {
            markers: []
        }
    })
    it('returns unmodified state', () => {
        const reducerResult = reducer()
        expect(reducerResult).toEqual({markers: []})
    })
    it('returns default empty markers', () => {
        const reducerResult = reducer(stateMock, {type: "GET_ALL_MARKERS"})
        expect(reducerResult).toEqual({markers: []})
    })
    it('returns all markers', () => {
        const newStateMock = {
            markers: [...stateMock.markers, {
                id: 1,
                target: {
                    X: 'x',
                    Y: 'y'
                }
            }]
        }
        const reducerResult = reducer(newStateMock, {type: "GET_ALL_MARKERS"})
        expect(reducerResult).toEqual(newStateMock)
    })
    it('saves a new marker', () => {
        const newstateMock = {
            markers: [...stateMock.markers, {
                id: 1,
                target: {
                    X: 123,
                    Y: 123
                }
            }]
        }
        const actionMock = {
            type: "SET_NEW_MARKER",
            marker: {
                X: 123,
                Y: 123
            }
        }
        const reducerResult = reducer(stateMock, actionMock)
        expect(reducerResult).toEqual(newstateMock)
    })
    it('updates an existing marker', () => {
        const actionMock = {
            type: "UPDATE_MARKER",
            data: {
                id: '1',
                title: 'mock 1',
                description: 'mock 1',
            }
        }
        const reducerResult = reducer({
            markers: [{
                id: 1,
                target: {
                    x: 1,
                    y: 2
                }
            }]
        }, actionMock)
        expect(reducerResult.markers[0].title).toEqual(actionMock.data.title)
        expect(reducerResult.markers[0].description).toEqual(actionMock.data.description)
    })
    it('removes specified marker', () => {
        const actionMock = {
            type: "REMOVE_MARKER",
            id: 1
        }
        const reducerResult = reducer({
            markers: [{
                id: 1,
                target: {
                    x: 1,
                    y: 2
                }
            }]
        }, actionMock)
        expect(reducerResult.markers.length).toEqual(0)
    })
    it('return unmodified marker on delete error', () => {
        const markers = [{
            id: 1,
            target: {
                x: 1,
                y: 2
            }
        }]
        const actionMock = {
            type: "REMOVE_MARKER",
            id: 2
        }
        const reducerResult = reducer({
            markers
        }, actionMock)
        expect(reducerResult.markers).toEqual(markers)
    })
})