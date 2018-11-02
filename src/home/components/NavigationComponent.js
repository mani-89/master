import React, { Component } from 'react';
import { apiPath } from '../utils';
import { connect } from 'react-redux';
import Header from '../components/Screens/Header';
import Navigation from '../components/Screens/Navigation';
import Content from '../components/Screens/Content';
import NotificationContainer from '../containers/notificationcontianer';
import $ from 'jquery'; 
import fetch from 'isomorphic-fetch';

/*eslint-disable no-undef */
/* eslint-disable react/prop-types */

class NavigationComponent extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     isLoading: false,
        //     // Environment: window.ENVIRONMENT,
        //     // showAbout: false,
        //     // LoggedInDateTime: window.LOGGED_IN_DATE_TIME,
        //     // loggedInUserName: (localStorage.getItem("loggedInUserName") == "undefined" ? "" : localStorage.getItem("loggedInUserName")),
        //     // path:''
        // };
        // this.handleOnClick = this.handleOnClick.bind(this);
        // this.navigatetoHome = this.navigatetoHome.bind(this);
    }
    componentDidMount() {
        var settings = {
            "id": "6da25dfc-c02e-488d-8705-ceaa6a5a02e7",
            "name": "View Attendance",
            "url": "http:\/\/iot.falconavl.in\/demo\/api\/Employee\/Attendance\/0018?StartTime=2018-03-01&EndTime=2018-09-01",
            "description": "",
            "data": null,
            "dataMode": "params",
            "headerData": [
                {
                    "key": "Authorization",
                    "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidWRheS5rQGZhbGNvbmF2bC5jb20iLCJleHAiOjE1Mzg1NDg0NjIsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzM4LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzM4LyJ9.HmCMVBZGP8q9nzh88CR2YLIg2k_wFAhLw8UBThsTClQ",
                    "description": "",
                    "enabled": true
                }
            ],
            "method": "GET",
            "pathVariableData": [

            ],
            "queryParams": [
                {
                    "key": "StartTime",
                    "value": "2018-03-01",
                    "equals": true,
                    "description": "",
                    "enabled": true
                },
                {
                    "key": "EndTime",
                    "value": "2018-09-01",
                    "equals": true,
                    "description": "",
                    "enabled": true
                }
            ],
            "auth": null,
            "events": [

            ],
            "folder": null,
            "currentHelper": null,
            "helperAttributes": null,
            "collectionId": "6663c96d-0be1-4872-be49-fb1ea1b5e3fb",
            "headers": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidWRheS5rQGZhbGNvbmF2bC5jb20iLCJleHAiOjE1Mzg1NDg0NjIsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzM4LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzM4LyJ9.HmCMVBZGP8q9nzh88CR2YLIg2k_wFAhLw8UBThsTClQ\n",
            "pathVariables": [

            ]
        };

        $.ajax(settings)
            .then(res => {
                console.log(res);
            });
        // this.getMaintenanceMessage();
    }


    // getMaintenanceMessage() {
    //     fetch("http:\/\/iot.falconavl.in\/demo\/api\/Employee\/Attendance\/0018?StartTime=2018-03-01&EndTime=2018-09-01", {
    //         "id": "f059e1f6-500e-4efe-bd89-d6bcf211771d",
    //         "name": "LoginEmployee",
    //         "url": "http:\/\/iot.falconavl.in\/demo\/api\/Auth\/employee",
    //         "description": "Auth",
    //         "data": [

    //         ],
    //         "dataMode": "raw",
    //         "headerData": [
    //             {
    //                 "key": "Content-Type",
    //                 "value": "application\/json"
    //             }
    //         ],
    //         "method": "POST",
    //         "pathVariableData": [

    //         ],
    //         "queryParams": [

    //         ],
    //         "auth": null,
    //         "events": [

    //         ],
    //         "folder": null,
    //         "currentHelper": null,
    //         "helperAttributes": null,
    //         "collectionId": "6663c96d-0be1-4872-be49-fb1ea1b5e3fb",
    //         "rawModeData": "{\n\t\t\"Username\":\"uday.k@falconavl.com\",\n\t\t\"Password\":\"falcon\"\n}",
    //         "headers": "Content-Type: application\/json\n",
    //         "pathVariables": [

    //         ]

    //         })
    //         .then((response) => { console.log(response) })
    //     }

    // componentWillReceiveProps(newProps) {
    //     if(newProps.changes.navigateWithoutSaving) {
    //         this.props.dispatch({type:'update' , navigateWithoutSaving:false , isPageHaveUnsavedChanges: false ,pageName:''});
    //         this.props.history.push(`${apiPath}/${this.state.path}`);
    //     }
    //  }

    // navigatetoHome() {
    //     this.props.history.push(`${apiPath}/Hompage`);
    // }

    // applicationLogout() {
    //         HomeApi.LogOut().then(() => {
    //             window.location.assign(apiPath + '/index.html');
    //         });
    // }

    // handleOnClick(selectedMenu) {
    //     this.props.history.push(`${apiPath}/${selectedMenu}`);
    // }
    render() {
        return (
            <div className="home-page">
                <div>
                    <Header />
                </div>
                <div>
                    <Navigation />
                </div>
                <div className="home-content">
                    <Content />
                    <NotificationContainer/>
                 </div>

            </div>
        );
    }
}

export default NavigationComponent;