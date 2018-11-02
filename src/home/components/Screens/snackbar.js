import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import store from '../../store/index';

class Notification extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            message: props.message,
            open: props.open,
            vertical: 'bottom',
            horizontal: 'right',
        };
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            ...this.state,
            message:newProps.message,
            open:newProps.open
        });
    }

    handleTimeoutSnackbar() {
        this.setState({ open: false });
        store.dispatch({ type: 'RESET_NOTIFICATION_SUCCESS', "message": "", "open": false });
    }

    render() {
        const { vertical, horizontal, open } = this.state;
        return (
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={this.handleTimeoutSnackbar}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.state.message}</span>}
                id={this.props.id}
            />
        );
    }
}
export default Notification;