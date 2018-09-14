import React from 'react';
import './LoadingBar.scss';
import { connect } from 'react-redux';

// TODO: make dumb component

class LoadingBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={this.props.isLoading ? 'LoadingBar__cnt' : 'hidden'} >
                <div className="load-bar">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    isLoading: state.isLoading
});

export default connect(mapStateToProps)(LoadingBar);
