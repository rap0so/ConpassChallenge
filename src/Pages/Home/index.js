import React from 'react'

import Hotspots from '../../Components/Hotspots'
import Button from '../../Components/Common/Button'

import './index.scss'


const Home = ({ handleCreateHotspot }) => {
    return (
        <div className='home'>
            <div className="container">
                <div className='wrapper-button'>
                    <Button name='Create Hotspot' fn={handleCreateHotspot} />
                </div>
                <Hotspots />
            </div>
        </div>
    )
}


export default Home