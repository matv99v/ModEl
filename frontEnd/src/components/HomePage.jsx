import React from 'react';
import { Panel } from 'react-bootstrap';
import wordings from 'AliasSrc/misc/wordings.json';


export default class Homepage extends React.Component {
    render() {
        return (
            <div>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">{wordings.homepage.heading}</Panel.Title>
                    </Panel.Heading>

                    <Panel.Body>
                        <div>{wordings.homepage.text1}</div>
                        <div>{wordings.homepage.text2}</div>
                        <div>{wordings.homepage.text3}</div>
                        <div>{wordings.homepage.text3}</div>
                        <div>{wordings.homepage.link1}</div>
                        <div>{wordings.homepage.link2}</div>
                    </Panel.Body>
                </Panel>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">{wordings.homepage.pricesHeading}</Panel.Title>
                    </Panel.Heading>

                    <Panel.Body>
                        <div>{wordings.homepage.pricesText1}</div>
                        <div>{wordings.homepage.pricesText2}</div>
                    </Panel.Body>
                </Panel>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">{wordings.howToBuy.heading}</Panel.Title>
                    </Panel.Heading>

                    <Panel.Body>
                        <div>{wordings.howToBuy.text1}</div>
                        <div>{wordings.howToBuy.text2}</div>
                        <div>{wordings.howToBuy.text3}</div>
                        <div>{wordings.howToBuy.text4}</div>
                    </Panel.Body>
                </Panel>

            </div>

        );
    }
}
