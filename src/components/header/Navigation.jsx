import React from 'react';
import './Navigation.scss';
import { Link } from 'react-router-dom';


export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='Navigation__container'>
                <nav>
                    <Link to='/catalog'>Catalog</Link>
                    <Link to='/about'>About</Link>
                </nav>


            </div>
        );
    }
}
