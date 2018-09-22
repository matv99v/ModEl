import React from 'react';
import { reduxForm, change } from 'redux-form';
import FormItem from './common/FormItem.jsx';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import RichTextEditor from './common/RichTextEditor.jsx';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import api from 'AliasApi/api';




class GoodForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            options: [],
        };
    }

    print = (data) => {
        console.log(data);
    }

    handleCategorySearch = (query) => {
        this.setState({isLoading: true});

        const obj = {
            table: 'category',
            field: 'CategoryName',
            like: query
        };

        api.autocomplete(obj)
            .then(json => this.setState({
                isLoading: false,
                options: json
            }));
    }

    handleCategoryInputChange = (selected) => {
        if (selected && selected.length > 0) {
            this.props.dispatch(change('GoodForm', 'idCategory', selected[0].idCategory));
        } else {
            this.props.dispatch(change('GoodForm', 'idCategory', ''));
        }
    }

    render() {
        return (

            <Grid>
                <Row>
                    <Col>
                        <form
                            className="form-horizontal"
                            onSubmit={this.props.handleSubmit(this.print)}
                        >

                            <div className="form-group">
                                <label className="col-sm-3 control-label">0 - Category</label>
                                <div className="col-sm-9">
                                    <AsyncTypeahead
                                        labelKey='CategoryName'
                                        isLoading={this.state.isLoading}
                                        options={this.state.options}
                                        onSearch={this.handleCategorySearch}
                                        onChange={this.handleCategoryInputChange}
                                    />
                                </div>

                            </div>

                            <Row>
                                <FormItem
                                    id="idCategory"
                                    component="input"
                                    type="number"
                                    label="idCategory"
                                    disabled
                                />
                            </Row>

                            <Row>
                                <FormItem
                                    id="idProduct"
                                    component="input"
                                    type="number"
                                    label="idProduct"
                                    disabled
                                />
                            </Row>

                            <Row>
                                <FormItem
                                    id="productName"
                                    component="input"
                                    type="text"
                                    label="productName"
                                />
                            </Row>

                            <Row>
                                <FormItem
                                    id="declarePrice"
                                    component="input"
                                    type="number"
                                    label="declarePrice"
                                />
                            </Row>

                            <Row>
                                <FormItem
                                    id="exist"
                                    component="input"
                                    type="checkbox"
                                    label="exist"
                                />
                            </Row>

                            <Row>
                                <FormItem
                                    id="detailName"
                                    component="input"
                                    type="text"
                                    label="detailName"
                                />
                            </Row>

                            <Row>
                                <FormItem
                                    id="idDescrip"
                                    component="input"
                                    type="text"
                                    label="idDescrip"
                                    disabled
                                />
                            </Row>

                            <Row>
                                <FormItem
                                    id="photosAmount"
                                    component="input"
                                    type="number"
                                    label="photosAmount"
                                    disabled
                                />
                            </Row>

                            <Row className="form-group">
                                <Col md={3} style={{textAlign: 'right', fontWeight: 'bold'}}>
                                    textDescripSource
                                </Col>
                                <Col md={9}>
                                    <RichTextEditor />
                                </Col>
                            </Row>


                            <Row>
                                <FormItem
                                    id="textDescrip"
                                    component="input"
                                    type="text"
                                    label="textDescrip"
                                    disabled
                                />
                            </Row>

                            <Row className="form-group">
                                <Col md={3} style={{textAlign: 'right', fontWeight: 'bold'}}>
                                    productParamsSource
                                </Col>
                                <Col md={9}>
                                    <RichTextEditor />
                                </Col>
                            </Row>

                            <Row>
                                <FormItem
                                    id="productParams"
                                    component="input"
                                    type="text"
                                    label="productParams"
                                    disabled
                                />
                            </Row>

                            <Button bsStyle="primary" type="submit">Submit</Button>



                        </form>
                    </Col>

                </Row>


                <Row>
                    <Col>
                    </Col>
                </Row>

            </Grid>

        );
    }
}


const ReduxGoodForm = reduxForm({
    // a unique name for the form
    form: 'GoodForm'
})(GoodForm);



export default ReduxGoodForm;
