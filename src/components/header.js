import React, { useState, useEffect } from 'react';
import canvasJs from '../assets/js/canvas';

import { Link } from 'react-router-dom';


const Header = () => {
    useEffect(() => {
        canvasJs('.header .logo_header',{
            size: 120,
            backgroundStyles: 'fill',
            Color: '#80B1C2',
            variation_speed: 200,
            cycle_speed: 1.5
        })
        // canvasJs('.header .logo_line',{
        //     size: 80,
        //     backgroundStyles: 'line',
        //     Color: '#000000',
        //     variation_speed: 200,
        //     cycle_speed: 1.5
        // })
    }, []);

    return (
        <div className='header'>
            <h2 className='logoWrap'>
                <Link to="/" className="logo_header"></Link>
                <div className='logo_line'></div>
            </h2>
        </div>
    )
}
export default Header;