import React, { Component } from 'react';
import Homepage from './Screens/Homepage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
               <Homepage/>
            </div>
        );
    }
}
export default App;
