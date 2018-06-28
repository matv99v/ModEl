import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';



export default class ItemCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeTab: 1};
    }

    handleSelect(k) {
        console.log(k);
        this.setState({activeTab: k});
    };

    render() {
        console.log(this.state.activeTab);
        return (
            <Nav bsStyle="pills" stacked activeKey={this.state.activeTab} onSelect={k => this.handleSelect(k)}>
                <NavItem eventKey="1">
                    Светодиодные ленты
                </NavItem>
                <NavItem eventKey="2">
                    Лампы
                </NavItem>
                <NavItem eventKey="3">
                    Выключатели
                </NavItem>
            </Nav>
        );
    }
}
