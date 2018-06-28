import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';



export default class SearchItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isValid: true};
    };

    handleInputChange() {};

    handleSubmitClick() {};


    render() {
        return (

            <form>
              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel>Working example with validation</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Enter text"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
              </FormGroup>
            </form>


        );
    }
}
