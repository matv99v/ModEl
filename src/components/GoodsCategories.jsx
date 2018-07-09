import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { fetchGoodsCategoriesAsync } from 'AliasReduxActions/goods-categories-actions';
import { connect } from 'react-redux';




class GoodsCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeTab: 1};
    }

    componentWillMount() {
        this.props.dispatch(fetchGoodsCategoriesAsync());
    }

    render() {
        return (
            <Nav
                bsStyle="pills"
                stacked
                activeKey={this.state.activeTab}
                onSelect={k => this.setState({activeTab: k})}
            >

                {
                    this.props.categories.map((cat, i) => (
                        <NavItem eventKey={i + 1} key={i}>
                            {cat.Category_Name}
                        </NavItem>
                    ))
                }

            </Nav>
        );
    }
};


const mapStateToProps = (state) => ({
    categories: state.categories
});

export default connect(mapStateToProps)(GoodsCategories);
