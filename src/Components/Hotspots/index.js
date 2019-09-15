import React from 'react'
import Hotspot from '../Hotspot'
import { connect } from 'react-redux'
import './index.scss'

const mapStateToProps = state => {
    return {
        markers: state.app.markers
    }
}

const Hostspots = props => {
    return (
        <ul className='hotspots'>
            <li className='hotspots-header'>List of hotspots</li>
            {props.markers.reverse().map((hotspot, idx) => {
                return (
                    <li key={idx}>
                        <Hotspot id={hotspot.id} />
                    </li>
                )
            })}
        </ul>
    )
}

export default connect(mapStateToProps)(Hostspots)