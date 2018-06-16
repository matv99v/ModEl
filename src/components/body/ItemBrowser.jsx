import React from 'react';
import './ItemBrowser.scss';
import ItemCategories from './ItemBrowser/ItemCategories.jsx';
import ItemsList from './ItemBrowser/ItemsList.jsx';
import SearchItem from './SearchItem.jsx';


export default class ItemBrowser extends React.Component {
    render() {

        console.log(this.props.match.params.id);

        return (
            <div className='ItemBrowser__container'>
                <SearchItem />

                <div className='ItemBrowser__items-cont'>
                    <ItemCategories />
                    <ItemsList filterId={this.props.match.params.id} />
                </div>

            </div>
        );
    }
}
