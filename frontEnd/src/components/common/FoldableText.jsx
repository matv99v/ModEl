import React from 'react';
import './FoldableText.scss';

import { Panel } from 'react-bootstrap';


export default class FoldableText extends React.Component {
    render() {
        return (
            <div className='FoldableText__cnt'>

                <Panel id="collapsible-panel-example-2">

                    <Panel.Heading>
                        <Panel.Title toggle>
                            {this.props.head}
                        </Panel.Title>
                    </Panel.Heading>

                    <Panel.Collapse>
                        <Panel.Body>
                            <div dangerouslySetInnerHTML={{__html: this.props.body}}></div>
                        </Panel.Body>
                    </Panel.Collapse>

                </Panel>

            </div>
        );
    }
}
