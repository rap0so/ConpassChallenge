import {
    SET_NEW_MARKER,
    REMOVE_MARKER,
    GET_ALL_MARKERS,
    UPDATE_MARKER
} from '../Actions/actionTypes.js';

import localManager from '../LocalStorage'

const defaultState = {
    markers: []
}
const defaultAction = {
    type: undefined
}
export default (state = defaultState, action = defaultAction) => {
    switch (action.type) {
        case GET_ALL_MARKERS:
            const savedHotspots = localManager.getAllHotspots()
            return {
                ...state, markers: [...state.markers, ...savedHotspots]
            }
        case SET_NEW_MARKER:
            let newId = 0
            if (state.markers.length) {
                newId = Math.max(...state.markers.map(marker => marker.id))
            }
            const marker = {
                id: newId + 1,
                target: action.marker
            }
            let markers = [
                ...state.markers, marker
            ]
            localManager.saveHotspot(markers)

            return {
                ...state, markers
            };
        case UPDATE_MARKER:
            const data = action.data
            const sanitizedId = Number(data.id.replace(/\D+/g, ''))
            let totalMarkers
            
            if (data) {
                totalMarkers = state.markers.map(marker => {
                    if (marker.id === sanitizedId) {
                        marker.title = data.title || marker.title || undefined
                        marker.description = data.description || marker.description || undefined
                    }
                    return marker;
                });
                localManager.saveHotspot(totalMarkers)
            }
            return { ...state, totalMarkers }
        case REMOVE_MARKER:
            const totalMarker = state.markers.filter(marker => {
                return marker.id !== action.id;
            });
            localManager.saveHotspot(totalMarker)

            return { ...state, markers: totalMarker }
        default:
            return state;
    }
};
