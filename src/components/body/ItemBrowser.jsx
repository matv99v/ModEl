import React from 'react';
import './ItemBrowser.scss';
import ItemCategories from './ItemBrowser/ItemCategories.jsx';
import ItemsList from './ItemBrowser/ItemsList.jsx';


export default class ItemBrowser extends React.Component {
    render() {
        return (
            <div className='ItemBrowser__container'>
                <div>
                    <ItemCategories />
                </div>

                <div>
                    <ItemsList />
                </div>
            </div>
        );
    }
}
