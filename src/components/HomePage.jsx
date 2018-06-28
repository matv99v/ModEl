import React from 'react';
import { Panel } from 'react-bootstrap';


export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Несколько слов о компании</Panel.Title>
                    </Panel.Heading>

                    <Panel.Body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Panel.Body>
                </Panel>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Отзывы или другая секция</Panel.Title>
                    </Panel.Heading>

                    <Panel.Body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Panel.Body>
                </Panel>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Возможно тут будет еще какой-то текст</Panel.Title>
                    </Panel.Heading>

                    <Panel.Body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Panel.Body>
                </Panel>

            </div>

        );
    }
}
