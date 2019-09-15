import React from 'react'
import { connect } from 'react-redux'
import { REMOVE_MARKER } from '../../Actions/actionTypes'
import './index.scss'

const mapDispatchToProps = dispatch => ({
    removeMarker: id => dispatch({
        type: REMOVE_MARKER,
        id
    })
})

export const Hostspot = ({ id, removeMarker}) => {
    return (
        <div>
            <div className='hotspot-block wrapper-name'>Hotspot #{id}</div>
            <button className='hotspot-block wrapper-delete' onClick={() => removeMarker(id)}>
                Delete
            </button>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(Hostspot)