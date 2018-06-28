import React from 'react';
import { Panel } from 'react-bootstrap';



export default class ContactPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Здесь будут контакты</Panel.Title>
                    </Panel.Heading>

                    <Panel.Body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Panel.Body>
                </Panel>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Тут можно добавить карту</Panel.Title>
                    </Panel.Heading>

                    <Panel.Body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Panel.Body>
                </Panel>

            </div>
        );
    }
}
