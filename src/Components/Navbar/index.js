import React, { Component } from 'react'
import logoConpass from './logoConpass.jpg'
import './index.scss'

class Navbar extends Component {
    render() {
        return( 
            <nav className='navbar'>
                <div className='wrapper-logo'>
                    <img alt='logo conpass' title='logo' src={logoConpass}/>
                </div>
                <ul className='wrapper-links'>
                    <li><a href='#!' className='link-navbar'>Link fake 1</a></li>
                    <li><a href='#!' className='link-navbar'>Link fake 2</a></li>
                    <li><a href='#!' className='link-navbar'>Link fake 3</a></li>
                    <li><a href='#!' className='link-navbar'>Link fake 4</a></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar