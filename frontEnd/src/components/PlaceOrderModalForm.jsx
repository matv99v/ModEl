import React from 'react';
import './PlaceOrderModalForm.scss';
import { Modal, Button, Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';



export default class PlaceOrderModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleConfirmOrder() {
        console.log('handleConfirmOrder');
        this.props.hideCb();
    }

    render() {
        return (
            <Modal show={this.props.isVisible} onHide={this.props.hideCb}>

                <Modal.Header closeButton>
                    <Modal.Title>Оформление заказа</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form horizontal>

                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Имя
                            </Col>

                            <Col sm={10}>
                                <FormControl type="text" placeholder="Имя" />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Телефон
                            </Col>

                            <Col sm={10}>
                                <FormControl type="tel" placeholder="Телефон" />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>

                            <Col sm={10}>
                                <FormControl type="email" placeholder="Email" />
                            </Col>
                        </FormGroup>


                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle='primary' onClick={this.handleConfirmOrder.bind(this)}>Подтвердить</Button>
                </Modal.Footer>
            </Modal>

        );
    }
}
