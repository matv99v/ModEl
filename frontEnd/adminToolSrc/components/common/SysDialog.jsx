import React from 'react';
import './SysDialog.scss';
import { connect } from 'react-redux';
import SysDialogItem from './SysDialogItem';
import { killMessage } from '../../redux/actions/sysdialogs-actions';


class SysDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    killHandler = (i) => {
        this.props.dispatch(killMessage(i));
    }

    render() {
        return (
            <div className='SysDialog__cnt' >
                {
                    this.props.sysDialogs.map((dialog, i) => (
                        <SysDialogItem
                            key={i}
                            dialog={dialog}
                            kill={this.killHandler}
                        />
                    ))
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    sysDialogs: state.sysDialogs
});

export default connect(mapStateToProps)(SysDialog);
