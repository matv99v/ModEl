import React from 'react';
import { reduxForm } from 'redux-form';
import FormItem from 'AliasAdminToolSrc/components/common/FormItem';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { connect } from 'react-redux';
import { change } from 'redux-form';

import api from 'AliasApi/api';

import { alertMessage } from 'AliasAdminToolSrc/redux/actions/sysdialogs-actions';
import { withRouter } from 'react-router-dom';
import validateBarnForm from 'AliasRoot/validation/validateBarnForm';




class BarnForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            options: [],
        };
    }

    print = (data) => {
        // TODO: get only changed fields
        const copyData = {...data}; // do not mutate data!!!!
        delete copyData.productName; // this field for view only and belongs to another table

        if (this.props.type === 'put') {
            return api.updateBarn(this.props.hash, copyData)
                .then(resp => {
                    this.props.dispatch(alertMessage({
                        msg: `Заказ номер ${copyData.zakNumber} для продукта '${data.productName}' обновлен`,
                        type: 'success'
                    }));
                    this.props.history.push('/barn/purchase/actual');
                    return null;
                })
                .catch(err => {
                    this.props.dispatch(alertMessage({
                        msg: `Вознкла ошибка при обновлении заказа номер ${copyData.zakNumber} для продукта '${copyData.productName}'`,
                        type: 'danger'
                    }));
                });
        } else {
            return api.postToBarn(copyData)
                .then(resp => {
                    this.props.dispatch(alertMessage({
                        msg: `Заказ номер ${copyData.zakNumber} для продукта '${data.productName}' добавлен`,
                        type: 'success'
                    }));
                    this.props.history.push('/barn/purchase/actual');
                    return null;
                })
                .catch(err => {
                    this.props.dispatch(alertMessage({
                        msg: `Вознкла ошибка при добавлении заказа номер ${copyData.zakNumber} для продукта '${copyData.productName}'`,
                        type: 'danger'
                    }));
                });
        }
    }

    handleGoodSearch = (query) => {
        this.setState({isLoading: true});

        const obj = {
            table: 'products',
            field: 'productName',
            like: query
        };

        api.autocomplete(obj)
            .then(json => this.setState({
                isLoading: false,
                options: json
            }));
    }

    handleGoodInputChange = (selected) => {
        if (selected && selected.length > 0) {
            this.props.dispatch(change('BarnForm', 'idProduct', selected[0].idProduct));
            this.props.dispatch(change('BarnForm', 'productName', selected[0].productName));
        } else {
            this.props.dispatch(change('BarnForm', 'idProduct', ''));
            this.props.dispatch(change('BarnForm', 'productName', ''));
        }
    }

    render() {
        return (

            <Grid style={{paddingBottom: '25px'}}>

                <Row>
                    <Col smOffset={3}>
                        <h3>{this.props.type === 'put' ? 'Правка транзакции' : 'Новая транзакция'}</h3>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <form
                            className='form-horizontal'
                            onSubmit={this.props.handleSubmit(this.print)}
                        >

                            <div className='form-group'>
                                <label className='col-sm-3 control-label'>0 - Good name</label>
                                <div className='col-sm-9'>
                                    <AsyncTypeahead
                                        labelKey='productName'
                                        isLoading={this.state.isLoading}
                                        options={this.state.options}
                                        onSearch={this.handleGoodSearch}
                                        onChange={this.handleGoodInputChange}
                                        defaultSelected={
                                            [this.props.initialValues]
                                        }
                                        disabled={this.props.type === 'put'}
                                    />
                                </div>

                            </div>

                            <FormItem
                                id='idProduct'
                                type='number'
                                label='1 - idProduct'
                                disabled
                            />

                            <FormItem
                                id='zakNumber'
                                type='number'
                                label='2 - zakNumber'
                                disabled={this.props.type === 'put'}
                            />

                            <FormItem
                                id='zakLink'
                                type='text'
                                label='3 - zakLink'
                            />

                            <FormItem
                                id='zakQnty'
                                type='number'
                                label='4 - zakQnty'
                            />

                            <FormItem
                                id='frozQnty'
                                type='number'
                                label='5 - frozQnty'
                            />

                            <FormItem
                                id='restQnty'
                                type='number'
                                label='6 - restQnty'
                            />

                            <FormItem
                                id='zakSum'
                                type='number'
                                label='7 - zakSum'
                            />

                            <FormItem
                                id='curRate'
                                type='number'
                                label='8 - curRate'
                                step='0.1'
                            />

                            <FormItem
                                id='zakDate'
                                type='date'
                                label='9 - zakDate'
                            />

                            <FormItem
                                id='zakDateShp'
                                type='date'
                                label='10 - zakDateShp'
                            />

                            <FormItem
                                id='zakDateRcv'
                                type='date'
                                label='11 - zakDateRcv'
                            />

                            <FormItem
                                id='zakDateProtct'
                                type='date'
                                label='12 - zakDateProtct'
                            />

                            <Row>
                                <Col smOffset={3}>
                                    <Button bsStyle='primary' type='submit' bsSize='large' disabled={this.props.submitting || this.props.pristine}>Submit</Button>
                                </Col>
                            </Row>

                        </form>
                    </Col>

                </Row>

            </Grid>

        );
    }
}

const withRouterBarnForm = withRouter(BarnForm);

const ReduxBarnForm = reduxForm({
    // a unique name for the form
    form: 'BarnForm',
    enableReinitialize: true,
    validate(values, props) {
        return {
            idProduct: validateBarnForm.idProduct(values.idProduct),
            zakNumber: validateBarnForm.zakNumber(values.zakNumber),
            // zakLink: validateBarnForm.zakLink(values.zakLink, values.zakNumber),
            zakQnty: validateBarnForm.zakQnty(values.zakQnty),
            frozQnty: validateBarnForm.frozQnty(values.frozQnty),
            restQnty: validateBarnForm.restQnty(values.restQnty),
            zakSum: validateBarnForm.zakSum(values.zakSum),
            curRate: validateBarnForm.curRate(values.curRate),
            // zakDate: validateBarnForm.zakDate(values.zakDate),
            // zakDateShp: validateBarnForm.zakDateShp(values.zakDateShp, values.zakDate),
            // zakDateRcv: validateBarnForm.zakDateRcv(values.zakDateRcv, values.zakDateShp),
            // zakDateProtct: props.type === 'put'
            //     ? null
            //     : validateBarnForm.zakDateProtct(values.zakDateProtct, values.zakDateShp),
        };
    },

})(withRouterBarnForm);



export default connect(null)(ReduxBarnForm);
