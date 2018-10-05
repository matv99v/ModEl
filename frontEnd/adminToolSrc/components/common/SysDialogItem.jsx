import React from 'react';
import { Alert } from 'react-bootstrap';



export default class SysDialogItem extends React.Component {
    componentDidMount() {
        this.timerId = setTimeout(() => {
            this.props.kill(this.props.dialog.id);
        }, 25000);
    }

    handleDissmiss = () => {
        clearTimeout(this.timerId);
        this.props.kill(this.props.dialog.id);
    }

    render() {
        return (
            <Alert bsStyle={this.props.dialog.type} onDismiss={this.handleDissmiss}>
                <h4>{this.props.dialog.msg}</h4>
            </Alert>
        );
    }
}
