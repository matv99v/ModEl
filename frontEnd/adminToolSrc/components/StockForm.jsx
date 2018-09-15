import React from 'react';
import { reduxForm } from 'redux-form';
import FormItem from './common/FormItem.jsx';
import { Button, Grid, Row, Col } from 'react-bootstrap';



class StockForm extends React.Component {

    print = data => {
        console.log(data);
    }

    render() {
        return (

            <Grid>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <form className="form-horizontal" onSubmit={this.props.handleSubmit(this.print)}>

                            <FormItem
                                id="idProduct"
                                component="input"
                                type="number"
                                label="1 - Good ID"
                            />

                            <FormItem
                                id="zakNumber"
                                component="input"
                                type="number"
                                label="2 - Order number"
                            />

                            <FormItem
                                id="zakLink"
                                component="input"
                                type="text"
                                label="3 - Order link"
                            />

                            <FormItem
                                id="zakQnty"
                                component="input"
                                type="number"
                                label="4 - Ordered qty"
                            />

                            <FormItem
                                id="frozQnty"
                                component="input"
                                type="number"
                                label="5 - Frozen qty"
                            />

                            <FormItem
                                id="restQnty"
                                component="input"
                                type="number"
                                label="6 - In stock qty"
                            />

                            <FormItem
                                id="zakSum"
                                component="input"
                                type="number"
                                label="7 - Total, uah"
                            />

                            <FormItem
                                id="curRate"
                                component="input"
                                type="number"
                                label="8 - Currency exchange rate"
                            />

                            <FormItem
                                id="zakDate"
                                component="input"
                                type="date"
                                label="9 - Date of order"
                            />

                            <FormItem
                                id="zakDateShp"
                                component="input"
                                type="date"
                                label="10 - Date of shipment"
                            />

                            <FormItem
                                id="zakDateRcv"
                                component="input"
                                type="date"
                                label="11 - Date of recieving"
                            />

                            <FormItem
                                id="zakDateProtct"
                                component="input"
                                type="date"
                                label="12 - Date of protection"
                            />

                            <Button bsStyle="primary" type="submit">Submit</Button>

                        </form>
                    </Col>
                </Row>

            </Grid>

        );
    }
}


const ReduxStockForm = reduxForm({
    // a unique name for the form
    form: 'StockForm'
})(StockForm);


export default ReduxStockForm;
