import React from 'react';
import { Panel } from 'react-bootstrap';



export default class ContactPage extends React.Component {

    render() {
        return (
            <div>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Контакты</Panel.Title>
                    </Panel.Heading>

                    <Panel.Body>
                        <p>Контактное лицо - Валерий.</p>
                        <p>Связаться можно одним из способов:</p>
                        <ul>
                          <li>Телефон - 050-487-7079; 096-575-5429</li>
                          <li>E-Mail - ZAIKA.VALERII@gmail.com</li>
                        </ul>
                    </Panel.Body>
                </Panel>

            </div>
        );
    }
}
