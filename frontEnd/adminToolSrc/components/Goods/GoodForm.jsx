import React from 'react';
import { reduxForm, change } from 'redux-form';
import { withRouter } from 'react-router-dom';
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
        const copyData = {...data}; // do not mutate data!!!!
        delete copyData.CategoryName; // this field for view only and belongs to another table
        delete copyData.photosAmount;
        console.log(copyData);

        if (this.props.type === 'put') {
            return api.updateGood(copyData.idProduct, copyData)
                .then(resp => {
                    this.props.dispatch(alertMessage({
                        msg: `Товар '${copyData.productName}' номер ${copyData.idProduct} обновлен`,
                        type: 'success'
                    }));
                    this.props.history.push('/goods/search');
                    return null;
                })
                .catch(err => {
                    this.props.dispatch(alertMessage({
                        msg: `Вознкла ошибка при обновлении товара '${copyData.productName}'`,
                        type: 'danger'
                    }));
                });
        } else {
            return api.postToGoods(copyData)
                .then(resp => {
                    this.props.dispatch(alertMessage({
                        msg: `Товар '${copyData.productName}' добавлен`,
                        type: 'success'
                    }));
                    this.props.history.push('/goods/search');
                    return null;
                })
                .catch(err => {
                    this.props.dispatch(alertMessage({
                        msg: `Вознкла ошибка при добавлении нового товара '${copyData.productName}'`,
                        type: 'danger'
                    }));
                });

        }
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

    changeEditorState = (fieldName, state, html) => {
        this.props.dispatch(change('GoodForm', fieldName, html));
    }

    render() {
        return (

            <Grid>

                <Row>
                    <Col smOffset={3}>
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
                                <label className="col-sm-3 control-label">Category</label>
                                <div className="col-sm-9">
                                    <AsyncTypeahead
                                        labelKey='CategoryName'
                                        isLoading={this.state.isLoading}
                                        options={this.state.options}
                                        onSearch={this.handleCategorySearch}
                                        onChange={this.handleCategoryInputChange}
                                        defaultSelected={
                                            [this.props.initialValues]
                                        }
                                        disabled={this.props.type === 'put'}

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

                            {false && <FormItem
                                id="idDescrip"
                                component="input"
                                type="text"
                                label="idDescrip"
                                disabled
                            />}

                            {false && <FormItem
                                id="photosAmount"
                                component="input"
                                type="number"
                                label="photosAmount"
                                disabled
                            />}

                            <div className="form-group">
                                <label className="col-sm-3 control-label">detailName</label>
                                <div className="col-sm-9">
                                    <RichTextEditor
                                        forField='detailName'
                                        change={this.changeEditorState}
                                        initVal={this.props.initialValues && this.props.initialValues.detailName}
                                        placeholder='Краткое описание...'
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">textDescrip</label>
                                <div className="col-sm-9">
                                    <RichTextEditor
                                        forField='textDescrip'
                                        change={this.changeEditorState}
                                        initVal={this.props.initialValues && this.props.initialValues.textDescrip}
                                        placeholder='Описание...'
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">productParams</label>
                                <div className="col-sm-9">
                                    <RichTextEditor
                                        forField='productParams'
                                        change={this.changeEditorState}
                                        initVal={this.props.initialValues && this.props.initialValues.productParams}
                                        placeholder='Технические характеристики...'
                                    />
                                </div>
                            </div>

                            {false && <FormItem
                                id="textDescrip"
                                component="input"
                                type="text"
                                label="textDescrip"
                                disabled
                            />}

                            {false && <FormItem
                                id="productParams"
                                component="input"
                                type="text"
                                label="productParams"
                                disabled
                            />}

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

const withRouterGoodForm = withRouter(GoodForm);

const ReduxGoodForm = reduxForm({
    // a unique name for the form
    form: 'GoodForm'
})(withRouterGoodForm);

export default ReduxGoodForm;
