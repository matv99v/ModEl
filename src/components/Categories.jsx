import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { fetchExistingCategoriesAsync } from 'AliasReduxActions/categories-actions';
import { connect } from 'react-redux';
import { setActiveCategoryId } from 'AliasReduxActions/active-category-id-actions';
import utils from 'AliasSrc/utils';





class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeTab: 1};
    }

    componentWillMount() {
        this.props.dispatch(fetchExistingCategoriesAsync());
    }

    componentDidUpdate() {
        const activeCat = this.props.categories[this.state.activeTab - 1];
        this.props.dispatch(setActiveCategoryId(activeCat.idCategory));
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
                            <span className={utils.isProduction ? 'hidden' : 'dev-label'}>
                                catId:{cat.idCategory}
                            </span>

                            <span>
                                {cat.Category_Name}
                            </span>
                        </NavItem>
                    ))
                }

            </Nav>
        );
    }
};


const mapStateToProps = (state) => ({
    categories: state.categories,
    activeCategoryId: state.activeCategoryId
});

export default connect(mapStateToProps)(Categories);
