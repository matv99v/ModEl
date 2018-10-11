import React from 'react';
import { Grid, Row, Col, Table, ButtonGroup, Button, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import api from 'AliasApi/api';
import Bluebird from 'bluebird';
import BarnPurchaseTableCat from './BarnPurchaseTableCat.jsx';
import './BarnPurchase.scss';
import helpers from '../../helpers/helpers.js';




class Barn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barn: {},
            showKey: 1
        };
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    componentWillMount() {
        Bluebird.all([api.getCategories(), api.getBarn()])
            .then(data => {
                const cats = data[0];
                const barn = data[1];

                const barnCats = barn.reduce((acc, el) => { // pick distinct categories
                    return {
                        ...acc,
                        ...{[el.idCategory]: true}
                    };
                }, {});

                const barnCatsKeys = Object.keys(barnCats);

                if (barnCatsKeys.length > cats.length) {
                    throw new Error('Barn categories amount exceeded categories!');
                }

                // TODO: move this logic to BE!!

                const fullBarn = cats.reduce((acc, cat) => {
                    return {
                        ...acc,
                        ...{[cat.idCategory]: {
                            ...cat,
                            goods: barn.filter(el => el.idCategory === cat.idCategory) || []
                        }}
                    };
                }, {});

                this.setState({barn: fullBarn});
            })
            .catch(err => console.log(err));

    }

    handleRowClick(transaction, e) {
        if (e.target.tagName !== 'A') {
            this.props.history.push(`/barn/edit/${transaction.zakNumber}-${transaction.idProduct}`);
        }
    }

    handleChange = (e) => {
        this.setState({ showKey: e });
    }

    filterFunctions = {
        1: el => el,
        2: el => el.restQnty !== el.frozQnty,
        3: el => !el.zakDateShp,
        4: el => el.zakDateShp && !el.zakDateRcv
    }

    render() {
        return (
            <Grid className='BarnPurchase__Cnt'>

                <Row className='BarnPurchase__controls'>
                    <Col smPush={9}>
                        <ButtonToolbar>
                            <ToggleButtonGroup
                                type="radio"
                                name="options"
                                value={this.state.showKey}
                                onChange={this.handleChange}
                            >
                                <ToggleButton value={1}>Все</ToggleButton>
                                <ToggleButton value={2}>Актуальные</ToggleButton>
                                <ToggleButton value={3}>Ожидающие отправки</ToggleButton>
                                <ToggleButton value={4}>Отправленные</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>

                <Row>
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
                                    .map(el => { // filter goods in each category
                                        return {
                                            ...el,
                                            goods: el.goods.filter(this.filterFunctions[this.state.showKey])
                                        };
                                    })
                                    .filter(cat => { // filter out empty categories but not for 'view all'
                                        return this.state.showKey == 1 ? true : !!cat.goods.length;
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

const withRouterBarn = withRouter(({ history }) => (
    <Barn history={history}/>
));

export default withRouterBarn;
