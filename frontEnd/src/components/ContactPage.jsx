import React from 'react';
import { Panel } from 'react-bootstrap';
import wordings from 'AliasSrc/misc/wordings.json';



export default class ContactPage extends React.Component {

    render() {
        return (
            <div>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">{wordings.contacts.heading}</Panel.Title>
                    </Panel.Heading>

                    <Panel.Body>
                        <div>{wordings.contacts.text1}</div>
                        <div>{wordings.contacts.text2}</div>
                        <div>{wordings.contacts.text3}</div>
                        <div>{wordings.contacts.text4}</div>
                        <div>{wordings.contacts.text5}</div>
                    </Panel.Body>
                </Panel>

            </div>
        );
    }
}
