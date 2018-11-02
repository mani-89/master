import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { apiPath } from '../utils';
import Dashboards from '../components/Screens/Dashboards';
import PendingLeaves from '../components/Screens/PendingLeaves';
import AppliedLeaves from '../components/Screens/AppliedLeaves';
import ApprovedLeaves from '../components/Screens/ApprovedLeaves';
import Applyleave from '../components/Screens/AppliedLeaves';
import RejectedLeaves from '../components/Screens/RejectedLeaves';

class PageComponent extends Component {
    render() {
        return (
            <Switch>
                <Route path={`${apiPath}/Dashboards`} component={Dashboards} exact={true} />
                <Route path={`${apiPath}/PendingLeaves`} component={PendingLeaves} />
                <Route path={`${apiPath}/AppliedLeaves`} component={AppliedLeaves} />
                <Route path={`${apiPath}/ApprovedLeaves`} component={ApprovedLeaves} />
                <Route path={`${apiPath}/Applyleave`} component={Applyleave} />
                <Route path={`${apiPath}/RejectedLeaves`} component={RejectedLeaves} />
                <Route component={Dashboards} />    
            </Switch>
        );
    }
}

export default PageComponent;