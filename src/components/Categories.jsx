import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { fetchExistingCategoriesAsync } from 'AliasReduxActions/categories-actions';
import { connect } from 'react-redux';
import { setActiveCategoryId } from 'AliasReduxActions/active-category-id-actions';
import DevInfo from './DevInfo.jsx';





class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeTab: 1};
    }

    componentWillMount() { // // TODO: move this to upper Element
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
                          <DevInfo>
                            catId:{cat.idCategory}
                          </DevInfo>

                          <span>
                              {cat.CategoryName}
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
