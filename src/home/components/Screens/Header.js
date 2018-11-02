import React from 'react';
import store from 'src/home/store';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: JSON.parse(localStorage.getItem("employid"))
        };
        this.handlelogout = this.handlelogout.bind(this);
    }

    handlelogout(){
        let lastlogin = JSON.parse(localStorage.getItem("logintime"));
        let time = new Date();
        let checkuser = lastlogin.filter((item) => { return item.username == this.state.username; });
        if (checkuser.length == 1) {
            let filteredlist = lastlogin.filter((item) => {
                if (item.username === this.state.username) {
                    item.time = time;
                    return item;
                }
                else {
                    return item;
                }
            });
            localStorage.setItem("logintime", JSON.stringify(filteredlist));
        }
        window.location.reload();
        this.props.history.push('/');
    }

    render() {
        let listdata = JSON.parse(localStorage.getItem("logintime"));
        let filterdata;
        if(listdata.length>0){
            filterdata = listdata.filter((item) => { return item.username = this.state.username; });
        }

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton color="inherit" aria-label="Open drawer">
                                <MenuIcon onClick={this.HandleSideBar} />
                            </IconButton> */}
                        <Typography variant="title" color="inherit" noWrap>
                            Leave Application
                        </Typography>
                        <div className="header-icons">
                            <div>
                                <span style={{ paddingRight: '20px', color: "red" }}>Last Login:{listdata.length > 0 ? filterdata[0].time : ""}</span>
                                <IconButton color="inherit" title="Logout" onClick={this.handlelogout}><AccountCircle /></IconButton>
                                <span onClick={this.handlelogout}>Logout</span>
                                {/* <Menu > */}
                                    {/* <Dropdown
                                        item
                                        icon={<IconButton color="inherit"><AccountCircle /></IconButton>}
                                        simple >
                                        <Dropdown.Menu>
                                            <div><IconButton color="inherit"><AccountCircle /></IconButton></div>
                                            <Dropdown.Item>Settings</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown> */}
                                {/* </Menu> */}
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
export default withRouter(Header);