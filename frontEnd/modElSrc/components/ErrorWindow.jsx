import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';


import './ErrorWindow.scss';

class ErrorWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='ErrorWindow__cnt'>
                <Modal show={!!this.props.error} bsSize="large">
                    <Modal.Header>
                        <Modal.Title>Server error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <p dangerouslySetInnerHTML={{__html: this.props.error}}></p>

                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.error
});

export default connect(mapStateToProps)(ErrorWindow);
