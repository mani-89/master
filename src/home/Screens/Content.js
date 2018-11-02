import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';;
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BusinessIcon from '@material-ui/icons/Business';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import Account_boxIcon from '@material-ui/icons/AccountBox';
import Charts from './Charts';
import Tablelayout from './Tablelayout';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebaropen: false,
            anchor: 'left',
        };
        this.handleSidebar = this.handleSidebar.bind(this);
    }

    handleSidebar() {
        this.setState({ sidebaropen: !this.state.sidebaropen });
    }

    getsidebarbutton() {
        return (
            <IconButton color="inherit" aria-label="Open drawer" title="Open" onClick={this.handleSidebar} >
                <MenuIcon />
            </IconButton>
        );
    }

    getsidebar() {
        const { anchor, sidebaropen } = this.state;
        return (
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={sidebaropen}
                className="sidebar"
            >
                <div>
                    <div>
                        <IconButton onClick={this.handleSidebar} title="Close">
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <div className="sidebar-title">
                        <div className="sidebar-ls">LS</div>
                        <ListItemText className="sidebar-header" primary="LEADSENSE" />
                    </div>
                </div>
                <Divider />
                <ListItem button>
                    <DashboardIcon />
                    <ListItemText primary="DASHBOARD" />
                </ListItem>
                <ListItem button>
                    <AssessmentIcon />
                    <ListItemText primary="ANALYTICS" />
                </ListItem>
                <ListItem button>
                    <BusinessIcon />
                    <ListItemText primary="PAIDMARKETING" />
                </ListItem>
                <ListItem button >
                    <ExpansionPanel className="expanded-layout">
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className="expandable-icon">
                            <SettingsIcon />
                            <ListItemText primary="SEO" />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="expandable-list">
                            <List >
                                <ListItem>
                                    <ListItemText primary="- In Page Optimisation" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="- Link Sense" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="- Beautifully" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className="organic-color" primary="- Organic Sense" />
                                </ListItem>
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </ListItem>
                <ListItem button>
                    <SearchIcon />
                    <ListItemText primary="CONTENT" />
                </ListItem>
                <ListItem button>
                    <Account_boxIcon />
                    <ListItemText primary="LEAD NINJA" />
                </ListItem>
            </Drawer>
        );
    }

    render() {
        return (
            <div className="app-header">
                <AppBar position="static">
                    <Toolbar className="toolbar">
                        {this.state.sidebaropen ? null : this.getsidebarbutton()}
                        <div className="header-layout">
                            <div>In Page Optimisation</div>
                            <div>Link Sense</div>
                            <div>Beautifully</div>
                            <div>Organic Sense</div>
                        </div>
                    </Toolbar>
                </AppBar>
                {this.state.sidebaropen ? this.getsidebar() : null}
                <div>
                    <div className="charts-layout">
                        <Charts />
                        <Tablelayout />
                    </div>
                </div>
            </div>
        );
    }
}
export default Content;