import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { setheadername } from 'src/home/actions/appActions';
import Header from '../controls/header';
import Formlabel from '../controls/Formlabel';
import CustomButton from '../controls/Button';
import AppBar from '@material-ui/core/AppBar';
import { apiPath } from '../utils';
import {setUsernameinStore,setPasswordinStore} from '../actions/LoginActions';
import store from '../store/index';
import NotificationContainer from '../containers/notificationcontianer';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedinUserName: props.loggedinUserName,
            loggedinUserPassword: props.loggedinUserPassword,
            Usernameerror:false,
            Passworderror:false
        };
        this.handleInprogress = this.handleInprogress.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.setitem = this.setitem.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            loggedinUserName: newProps.loggedinUserName,
            loggedinUserPassword: newProps.loggedinUserPassword
        });
    }

    handleUsername(e){
        this.props.setUsernameinStore(e.target.value);
    }

    handlePassword(e){
        this.props.setPasswordinStore(e.target.value);
    }

    handleLogin(){
        let filterlist =  [];
        filterlist = this.props.LoginUsers.filter((item)=>{
            return (this.state.loggedinUserName === item.username && this.state.loggedinUserPassword === item.password);
        });
        if(filterlist.length==1) {
            let appliedleaveslist = [
                                        {id:'1',leavetype:'vacation',fromdate:"12/12/12",todate:"12/12/12",description:"hello",status:"approved",employid:'user1'},
                                        {id:'2',leavetype: 'vacation', fromdate: "12/12/12", todate: "12/12/12", description: "hello", status: "pending",employid:"user2" },
                                        {id:'3', leavetype: 'Holiday', fromdate: "12/12/18", todate: "12/12/18", description: "Hi", status: "pending", employid: "user2"}
                                    ];
            if(!localStorage.getItem("appliedleaves")){
                localStorage.setItem("appliedleaves", JSON.stringify(appliedleaveslist));
            }

            localStorage.setItem("employid", JSON.stringify(this.state.loggedinUserName));

            let lastlogin = JSON.parse(localStorage.getItem("logintime"));
                lastlogin = lastlogin==null ? [] : lastlogin;
            let time = new Date();

            if(lastlogin.length>0){
                let checkuser = lastlogin.filter((item)=>{return item.username == this.state.loggedinUserName;});
                if(checkuser.length == 1){
                    // let filteredlist = lastlogin.filter((item) => {
                    //     if (item.username === this.state.username) {
                    //         item.time = time;
                    //         return item;
                    //     }
                    //     else {
                    //         return item;
                    //     }
                    // });
                    localStorage.setItem("logintime", JSON.stringify(lastlogin));
                }
                else{
                    this.setitem(lastlogin);
                }
            }
            else{
                this.setitem(lastlogin);
            }
            this.props.onLogin(); 
            }
            else{
                let errortext = [];
                errortext = this.props.LoginUsers.filter((item) => {
                    return (this.state.loggedinUserName === item.username);
                });
                if(errortext.length){
                    this.setState({
                        Passworderror: true,
                        Usernameerror:false
                    });
                }
            else{
                this.setState({
                    Usernameerror: true,
                    Passworderror:false
                });
            }
        }
    }

    setitem(lastlogin){
        let time = new Date();
        let username = this.state.loggedinUserName;
        let object = { username, time }
        lastlogin.push(object);
        localStorage.setItem("logintime", JSON.stringify(lastlogin));
    }

    handleInprogress(){
        store.dispatch({ type: 'SET_NOTIFICATION_SUCCESS', "message": "In progress.", "open": true });
    }


    render() {
        return (
            <div id="login">
                {/* <div className="login-section1">
                    section1
                </div>
                <div className="login-section2">
                    <div className="login-logo">logo</div>
                    <div className="login-content">conten</div>
                    <div className="login-footer">footer</div>
                </div> */}
            <div id="login-background"></div>
            <div className="login-page">
                    <NotificationContainer id="login-snackbar" />
                    <div className="login-header">
                        <AppBar position="static" color="default" id="login-header-container">
                        <div>
                            <CustomButton color="primary" onClick={this.handleInprogress} >
                                    About
                            </CustomButton>
                            <CustomButton color="secondary" onClick={this.handleInprogress} >
                                    Demo
                            </CustomButton>
                        </div>
                        </AppBar>
                    </div>
                    <div className="login-welcome">
                        <div className="welcome-header">Welcome...</div>
                        <div className="welcome-content" id="content-scroll">
                            <div>welome content</div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The course of English political, legal and cultural history was changed 
                        in 1066, when William, Duke of Normandy (also called William the Conqueror)
                        successfully invaded the nation and displaced the Saxon king, Harold II.
                        In 1066 King Edward, also called St Edward the Confessor, died. His cousin, 
                        the Duke of Normandy, claimed that the childless King had named him heir                              
                        </div>
                    </div>
                    <div className="login-content">
                        <div className="form-group">
                            {/* <Header label="Company Logo"/> */}
                            <Formlabel>
                                <div>Username</div>
                                <TextField
                                    error={this.state.Usernameerror}
                                    id="outlined-bare"
                                    defaultValue=""
                                    margin="normal"
                                    variant="outlined"
                                    placeholder="Enter Username"
                                    value={this.state.loggedinUserName}
                                    name="username"
                                    onChange={(e) => this.handleUsername(e)}
                                />
                            </Formlabel>
                            <Formlabel>
                                <div>Password</div>
                                <TextField
                                    type="password"
                                    error={this.state.Passworderror}
                                    id="outlined-bare"
                                    defaultValue=""
                                    margin="normal"
                                    variant="outlined"
                                    placeholder="Enter Password"
                                    value={this.state.loggedinUserPassword}
                                    name="password"
                                    onChange={(e) => this.handlePassword(e)}
                                />
                            </Formlabel>
                                <div id="error-text">
                                    {this.state.Usernameerror ? "Username does not exist." : (this.state.Passworderror ? "Please Enter correct Password" : null )}
                                </div>
                            <Formlabel>
                                <Button variant="contained" size="large" color="primary" onClick={this.handleLogin} >
                                    Login
                                </Button>

                                <label className="login-button">
                                    <CustomButton onClick={this.handleInprogress}>
                                        Forgot Password?
                                    </CustomButton>
                                    <CustomButton onClick={this.handleInprogress}>
                                        Register
                                    </CustomButton>
                                </label>
                            </Formlabel>
                            {/* <Formlabel>                              
                                <div>Login Using</div>
                                
                            </Formlabel> */}

                        </div>
                    </div>
                    <div className="login-footer">
                        <span>© 2018 Inc. All Rights Reserved. </span>
                        <a href="http://www.Google.com">Terms of Use</a>&nbsp;-&nbsp;
                        <a href="http://www.Google.com">Privacy</a>
                    </div>
            </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.reducer;
};

const mapDispatchToProps = {
    setUsernameinStore: setUsernameinStore,
    setPasswordinStore: setPasswordinStore
};
let LoginContainer = connect(
                    mapStateToProps,
                    mapDispatchToProps
            )(Login);

export default LoginContainer;