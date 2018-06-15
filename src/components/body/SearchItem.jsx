import React from 'react';
import './SearchItem.scss';
import ItemsList from './ItemBrowser/ItemsList.jsx';


export default class SearchItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='SearchItem__cnt'>
                <input type='text' placeholder='Search by text' />
                <ItemsList />
            </div>
        );
    }
}
