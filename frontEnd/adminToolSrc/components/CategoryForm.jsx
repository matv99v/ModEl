import React from 'react';
import { reduxForm, change } from 'redux-form';
import FormItem from './common/FormItem.jsx';
import { Button, Grid, Row, Col } from 'react-bootstrap';




class CategoryForm extends React.Component {

    print = (data) => {
        console.log(data);
    }

    render() {
        return (

            <Grid>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <form
                            className="form-horizontal"
                            onSubmit={this.props.handleSubmit(this.print)}
                        >

                            <FormItem
                                id="CategoryName"
                                component="input"
                                type="text"
                                label="CategoryName"
                            />

                            <Button bsStyle="primary" type="submit">Submit</Button>


                        </form>
                    </Col>

                </Row>

            </Grid>

        );
    }
}


const ReduxCategoryForm = reduxForm({
    // a unique name for the form
    form: 'CategoryForm'
})(CategoryForm);



export default ReduxCategoryForm;
