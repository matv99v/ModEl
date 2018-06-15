import React from 'react';
import Header from './header/Header.jsx';
import ItemBrowser from './body/ItemBrowser.jsx';
import SearchItem from './body/SearchItem.jsx';
import About from './body/About.jsx';
import './Layout.scss';
import { Route, Link, BrowserRouter } from 'react-router-dom';



export default class Layout extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="Layout__container">
                    <Header />
                    <Route exact path='/' component={SearchItem} />
                    <Route path='/catalog' component={ItemBrowser} />
                    <Route path='/search' component={SearchItem} />
                    <Route path='/about' component={About} />
                </div>
            </BrowserRouter>
        );
    }
}
