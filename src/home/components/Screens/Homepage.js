import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import $ from 'jquery'; 


class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount(){
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

        $.ajax(settings).done(function(response) {
            console.log(response);
        });
    }

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
                     content
                 </div>
                
            </div>
        );
    }
}

export default Homepage;