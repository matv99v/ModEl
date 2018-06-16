import React from 'react';
import './SearchItem.scss';


export default class SearchItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='SearchItem__cnt'>
                <input type='text' placeholder='Search by text' />
            </div>
        );
    }
}
