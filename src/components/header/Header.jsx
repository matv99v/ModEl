import React from 'react';
import './Header.scss';
import Navigation from './Navigation.jsx';



export default class Header extends React.Component {
    render() {
        return (
            <div className='Header__container'>
                <h1>Modern electronics</h1>
                <Navigation />
            </div>
        );
    }
}
