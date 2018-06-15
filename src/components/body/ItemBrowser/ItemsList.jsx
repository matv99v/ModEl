import React from 'react';
import './ItemsList.scss';
import SingleItem from './SingleItem.jsx';


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

    render() {
        return (
            <div className='ItemsList__container'>

                {
                    this.state.goods.map((good, i) => {
                        return (
                            <SingleItem
                                key={i}
                                name={good.NAME}
                                description={good.DESCRIPTION}
                                price={good.PRICE}
                                photos={good.PHOTOS}
                            />

                        );
                    })
                }

            </div>
        );
    }
}
