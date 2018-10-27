import React from 'react';
import { Grid, Row, Col, Table, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import api from 'AliasApi/api';
import Bluebird from 'bluebird';
import BarnPurchaseTableCat from './BarnPurchaseTableCat.jsx';
import './BarnPurchase.scss';
import helpers from '../../helpers/helpers.js';
import Spinner from './common/Spinner.jsx';




class Barn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { barn: {}, isLoading: false };
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    fetchData() {
        let data = {};
        let isData = true;

        this.setState({isLoading: true});

        const queryObj = this.props.match.params.type == 'all'
            ? {}
            : {excludeProductsCount: 0};

        Bluebird.all([
            api.getCategories(queryObj),
            api.getBarn({queryAddition: this.props.match.params.type})
        ])
            .then(resp => {
                const cats = resp[0];
                const barn = resp[1];
                isData = !!barn.length;

                const fullBarn = cats.reduce((acc, cat) => { // TODO: move this logic to BE!!
                    return {
                        ...acc,
                        ...{[cat.idCategory]: {
                            ...cat,
                            goods: barn.filter(el => el.idCategory === cat.idCategory) || []
                        }}
                    };
                }, {});
                data = fullBarn;
            })
            .catch(err => console.log(err))
            .finally(() =>  this.setState({
                isLoading: false,
                barn: data,
                isData
            }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.type !== prevProps.match.params.type) {
            this.fetchData();
        }
    }

    componentWillMount() {
        this.fetchData();
    }

    handleRowClick(transaction, e) {
        if (e.target.tagName !== 'A') {
            this.props.history.push(`/barn/edit/${transaction.zakNumber}-${transaction.idProduct}`);
        }
    }

    handleTypeChange(val) {
        this.props.history.push(`/barn/purchase/${val}`);
    }

    render() {
        return (
            <Grid className='BarnPurchase__Cnt'>

                <Spinner show={this.state.isLoading} />

                <Row className='BarnPurchase__controls'>
                    <Col smPush={9}>
                        <ButtonToolbar>
                            <ToggleButtonGroup
                                type='radio'
                                name='options'
                                value={this.props.match.params.type}
                                onChange={this.handleTypeChange}
                            >
                                <ToggleButton value={'all'}>Все</ToggleButton>
                                <ToggleButton value={'actual'}>Актуальные</ToggleButton>
                                <ToggleButton value={'pendingshp'}>Ожидающие отправки</ToggleButton>
                                <ToggleButton value={'intransit'}>Отправленные</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>

                <Row className={this.state.isData ? 'BarnPurchase__hideMe' : 'BarnPurchase__nodata'} >
                    <Col>No data</Col>
                </Row>

                <Row className={this.state.isData ? null : 'BarnPurchase__hideMe'} >
                    <Col>
                        <Table condensed responsive hover className='BarnPurchase__table'>
                            <thead>
                                <tr>
                                    {
                                        [
                                            '', // empty for padding
                                            'productName',
                                            'zakNumber',
                                            'zakDate',
                                            'zakDateShp',
                                            'zakDateRcv',
                                            'zakDateProtct',
                                            'zakQnty',
                                            'frozQnty',
                                            'restQnty',
                                            'zakSum',
                                            'curRate',
                                        ].map((field, i) => (
                                            <th key={i}>{field}</th>
                                        ))
                                    }

                                </tr>
                            </thead>

                            {
                                Array.prototype.sort.call( // sort by category name
                                    Object.keys(this.state.barn).map(key => this.state.barn[key]),
                                    helpers.sortByPropName('CategoryName')
                                )
                                    .filter(cat => { // filter out empty categories but not for 'view all'
                                        return this.props.match.params.type == 'all' ? true : !!cat.goods.length;
                                    })
                                    .map((transaction, i) => {
                                        return (
                                            <BarnPurchaseTableCat
                                                key={i}
                                                name={transaction.CategoryName}
                                                items={transaction.goods}
                                                rowClick={this.handleRowClick}
                                            />
                                        );
                                    })
                            }
                        </Table>

                    </Col>
                </Row>

            </Grid>

        );
    }
}


const withRouterBarn = withRouter(Barn);
export default withRouterBarn;
