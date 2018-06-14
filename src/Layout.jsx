import React from 'react';

export default class Layout extends React.Component {
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
            <div>
                <h1>Modern Electronics</h1>

                {
                    this.state.goods.map((good, i) => {
                        return <div key={i}>{good.NAME}</div>;
                    })
                }

            </div>
        );
    }
}
