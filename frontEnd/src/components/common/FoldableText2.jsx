import React from 'react';
import './FoldableText2.scss';
import { PanelGroup, Panel } from 'react-bootstrap';


export default class FoldableText2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='FoldableText2__cnt'>

              <PanelGroup accordion id="FoldableText2__accordion">

                {
                    this.props.data.map((el, i) => (
                      <Panel eventKey={i} key={i} >
                          <Panel.Heading>
                              <Panel.Title toggle>{el.head}</Panel.Title>
                          </Panel.Heading>

                          <Panel.Body collapsible dangerouslySetInnerHTML={{__html: el.body}}></Panel.Body>
                      </Panel>
                    ))
                }

              </PanelGroup>

            </div>
        );
    }
}
