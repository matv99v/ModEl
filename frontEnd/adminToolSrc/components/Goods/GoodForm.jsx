import React from 'react';
import { reduxForm, change } from 'redux-form';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import RichTextEditor from 'AliasAdminToolSrc/components/common/RichTextEditor';
import FormItem from 'AliasAdminToolSrc/components/common/FormItem';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { alertMessage } from 'AliasAdminToolSrc/redux/actions/sysdialogs-actions';
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

        return api.postToGoods(data)
            .then(resp => {
                this.props.dispatch(alertMessage({
                    msg: `Товар '${data.productName}' номер ${data.idProduct} добавлен`,
                    type: 'success'
                }));
                // this.props.history.push('/barn/purchase/actual');
                return null;
            })
            .catch(err => {
                this.props.dispatch(alertMessage({
                    msg: `Вознкла ошибка при добавлении нового товара '${data.productName}'`,
                    type: 'danger'
                }));
            });
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

    changeEditorState = (fieldName, state) => {
        this.props.dispatch(change('GoodForm', fieldName, state));
    }

    render() {
        return (

            <Grid>

                <Row>
                    <Col smOffset={3}>
                        {/*TODO: */}
                        <h3>{this.props.type === 'put' ? 'Правка товара' : 'Новый товар'}</h3>
                    </Col>
                </Row>

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

                            <FormItem
                                id="idCategory"
                                component="input"
                                type="number"
                                label="idCategory"
                                disabled
                            />

                            <FormItem
                                id="idProduct"
                                component="input"
                                type="number"
                                label="idProduct"
                                disabled
                            />

                            <FormItem
                                id="productName"
                                component="input"
                                type="text"
                                label="productName"
                            />

                            <FormItem
                                id="declarePrice"
                                component="input"
                                type="number"
                                label="declarePrice"
                            />

                            <FormItem
                                id="exist"
                                component="input"
                                type="checkbox"
                                label="exist"
                            />

                            <FormItem
                                id="detailName"
                                component="input"
                                type="text"
                                label="detailName"
                            />

                            <FormItem
                                id="idDescrip"
                                component="input"
                                type="text"
                                label="idDescrip"
                                disabled
                            />

                            <FormItem
                                id="photosAmount"
                                component="input"
                                type="number"
                                label="photosAmount"
                                disabled
                            />

                            <div className="form-group">
                                <Col md={3} style={{textAlign: 'right', fontWeight: 'bold'}}>
                                    textDescripSource
                                </Col>
                                <Col md={9}>
                                    <RichTextEditor
                                        forField='textDescrip'
                                        change={this.changeEditorState}
                                        initVal={null}
                                    />
                                </Col>
                            </div>


                            <FormItem
                                id="textDescrip"
                                component="input"
                                type="text"
                                label="textDescrip"
                                disabled
                            />

                            <div className="form-group">
                                <Col md={3} style={{textAlign: 'right', fontWeight: 'bold'}}>
                                    productParamsSource
                                </Col>
                                <Col md={9}>
                                    <RichTextEditor
                                        forField='productParams'
                                        change={this.changeEditorState}
                                        initVal={null}
                                    />
                                </Col>
                            </div>

                            <FormItem
                                id="productParams"
                                component="input"
                                type="text"
                                label="productParams"
                                disabled
                            />

                            <Row>
                                <Col smOffset={3}>
                                    <Button bsStyle='primary' type='submit' bsSize='large' disabled={this.props.submitting || this.props.pristine}>Submit</Button>
                                </Col>
                            </Row>

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
