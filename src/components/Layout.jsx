import React from 'react';
import Header from './header/Header.jsx';
import ItemBrowser from './body/ItemBrowser.jsx';
import SingleItem from './body/ItemBrowser/SingleItem.jsx';
import About from './body/About.jsx';
import './Layout.scss';
import { Route, BrowserRouter } from 'react-router-dom';



export default class Layout extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="Layout__container">
                    <Header />
                    <Route exact path='/' component={ItemBrowser} />
                    <Route exact path='/catalog' component={ItemBrowser} />
                    <Route exact path='/catalog/:id' component={ItemBrowser} />
                    <Route exact path='/about' component={About} />
                </div>
            </BrowserRouter>
        );
    }
}
