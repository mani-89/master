import React, { Component } from 'react';
import NavigationtoLanding from './NavigationComponent';
import Login from '../components/login';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadControl: 'LOADING'
        };
        this.doLogin = this.doLogin.bind(this);
    }

    componentDidMount() {
        // window.location.reload();
        this.setState({
            loadControl: 'LOGIN'
        });
    }
    
    doLogin() {
        // window.LOGGED_IN_DATE_TIME = localStorage.getItem('LoggedInDateTime');
        this.setState({
            loadControl: 'HOME'
        });
    }

    render() {
        return (
            <div id="container">
                {{
                    ['LOADING']: <div>Loading . . .</div>,
                    ['HOME']: <NavigationtoLanding />,
                    ['LOGIN']: <Login onLogin={this.doLogin} />,
                }[this.state.loadControl]}
            </div>
        )
    }

}
export default App;
