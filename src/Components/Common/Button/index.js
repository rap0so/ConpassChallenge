import React from 'react'
import './index.scss'

const Button = ({name, fn}) => <button className='blue-btn' onClick={fn}>{name}</button>

export default Button