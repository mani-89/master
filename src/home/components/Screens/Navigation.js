import React from 'react';
import { withRouter } from 'react-router-dom';
import { apiPath } from '../../utils';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Sidebar } from 'semantic-ui-react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(selectedMenu) {
        this.props.history.push(
            `${apiPath}/${selectedMenu}`
        );  
    }

    render() {
        return (
            <div>
                <Sidebar
                    as="div"
                    animation='overlay'
                    icon='labeled'
                    inverted
                    vertical
                    visible
                    width='thin'
                    className="side-bar"
                >
                    <div>
                        <List>
                            <div>
                                <ListItem button onClick={()=>this.handleOnClick("Dashboards")}>
                                    <ListItemText primary="Home" />
                                </ListItem>
                                <Divider />
                                {this.props.loggedinUserName=="Admin" ? 
                                        <div>
                                            <ListItem button onClick={() => this.handleOnClick("PendingLeaves")}>
                                                <ListItemText primary="Pending" />
                                            </ListItem>
                                            <Divider />
                                            <ListItem button onClick={() => this.handleOnClick("ApprovedLeaves")}>
                                                <ListItemText primary="Approved" />
                                            </ListItem>
                                            <Divider />
                                            <ListItem button onClick={() => this.handleOnClick("RejectedLeaves")}>
                                            <ListItemText primary="Rejected" />
                                            </ListItem>
                                            <Divider />
                                        </div>
                                    :
                                    null
                                }
                                {this.props.loggedinUserName == "User" ?
                                    <div>
                                        <ListItem button onClick={() => this.handleOnClick("AppliedLeaves")}>
                                            <ListItemText primary="Leaves" />
                                        </ListItem>
                                        <Divider />
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </List>
                    </div>


                </Sidebar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.reducer;
};

const mapDispatchToProps = {

};

let NavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);

export default withRouter(NavigationContainer);
