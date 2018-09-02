import React from 'react';
import './Spinner.scss';
import { connect } from 'react-redux';


class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const obj = {
            width: `${this.props.size}px`,
            height: `${this.props.size}px`,
            borderWidth: `${this.props.size / 5}px`,
            display: this.props.isLoading ? 'block' : 'none'
        };

        return (
            <div className='Spinner__cnt' style={obj}></div>
        );
    }
}


const mapStateToProps = (state) => ({
    isLoading: state.isLoading
});

export default connect(mapStateToProps)(Spinner);
