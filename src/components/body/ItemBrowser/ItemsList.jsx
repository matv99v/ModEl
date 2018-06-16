import React from 'react';
import './ItemsList.scss';
import SingleItem from './SingleItem.jsx';
import { Route, Link, BrowserRouter } from 'react-router-dom';



export default class ItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/goods')
           .then(response => response.json())
           .then(data => this.setState({goods: data}))
           .catch(err => console.error(err));
   }

   componentWillRecieveProps

    render() {
        return (
            <div className='ItemsList__container'>

                {
                    this.state.goods
                        .filter(good => {
                            // return this.props.filterId
                            //     ? good.ID == this.props.filterId
                            //     : true;

                                return !this.props.filterId || good.ID == this.props.filterId;
                        })
                        .map((good, i) => {
                            const url = `/catalog/${good.ID}`;
                            return (
                                <Link to={url} key={i} >
                                    <SingleItem
                                        name={good.NAME}
                                        description={good.DESCRIPTION}
                                        price={good.PRICE}
                                        photos={good.PHOTOS}
                                    />
                                </Link>

                            );
                        })
                }

            </div>
        );
    }
}
