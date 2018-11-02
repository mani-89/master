import React from 'react';
import Pagecontent from '../PageComponent';
import { withRouter } from 'react-router-dom';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        this.props.history.push('/');
    }
    
    render() {
        return (
            <Pagecontent />
        );
    }
}
export default withRouter(Content);