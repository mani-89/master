import React from 'react';
import { Table } from 'semantic-ui-react';
import Header from '../../controls/header';
import { Button, Checkbox} from 'semantic-ui-react';
import store from '../../store/index';

class PendingLeaves extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AppliedLeavesarray: [],
            checkeditems:[]
        };
        this.getitems = this.getitems.bind(this);
        this.getlist = this.getlist.bind(this);
        this.handlecheckbox = this.handlecheckbox.bind(this);
        this.handleapprove = this.handleapprove.bind(this);
        this.handlereject = this.handlereject.bind(this);
    }

    componentDidMount() {
        this.getitems();
    }

    getitems() {
        let data = JSON.parse(localStorage.getItem("appliedleaves"));
        let setdata = data.length > 0 ? data : [];
        let filtereddata = setdata.filter((item) => item.status == "pending");
        filtereddata.forEach(element => {
            element.checked = false;
            return element;
        });
        this.setState({
            AppliedLeavesarray: filtereddata
        });
    } 

    handlecheckbox(event,index){
        let data = [...this.state.AppliedLeavesarray];
        let items = data[index];
        items.checked = !items.checked;
        this.setState({
            checkeditems:data
        });
    }

    getlist(array) {
        let list = [];
        if (array.length > 0) {
            list = array.map((item, index) => {
                return (
                        <Table.Row onClick={this.handletabledata} id={index} >
                            <Table.Cell><Checkbox label='' checked={item.checked} onChange={(e)=>this.handlecheckbox(e,index)}/></Table.Cell>
                            <Table.Cell>{item.employid}</Table.Cell>
                            <Table.Cell>{item.leavetype}</Table.Cell>
                            <Table.Cell>{item.fromdate}</Table.Cell>
                            <Table.Cell>{item.todate}</Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                        </Table.Row>
                );
            });
            return list;
        }
        else {
            return <div id="text-msg">No records available</div>;
        }
    }

    handleapprove(){
        let data = [...this.state.AppliedLeavesarray];
        let datalist = JSON.parse(localStorage.getItem("appliedleaves"));
        let filterdata = datalist.map((item)=>{
            data.map((element) => {
                if(item.id==element.id && element.checked){
                    element.status= 'approved'
                    item = element;
                    return item;
                }
            });
            return item;
        });
        localStorage.setItem("appliedleaves", JSON.stringify(filterdata));
        this.getitems();
        store.dispatch({ type: 'SET_NOTIFICATION_SUCCESS', "message": "leave Approved.", "open": true });
    }

    handlereject(){
        let data = [...this.state.AppliedLeavesarray];
        let datalist = JSON.parse(localStorage.getItem("appliedleaves"));
        let filterdata = datalist.map((item) => {
            data.map((element) => {
                if (item.id == element.id && element.checked) {
                    element.status = 'rejected';
                    item = element;
                    return item;
                }
            });
            return item;
        });
        localStorage.setItem("appliedleaves", JSON.stringify(filterdata));
        this.getitems();
        store.dispatch({ type: 'SET_NOTIFICATION_SUCCESS', "message": "leave Rejected.", "open": true });
    }

    render() {
        return (
            <div>
                <Header label="Pending Leaves" Button={<div><Button content='Approve' onClick={this.handleapprove} primary /><Button content='Reject' onClick={this.handlereject} primary /></div>} />
                <Table striped >
                    <Table.Header>
                        <Table.Row >
                            <Table.HeaderCell>Select All</Table.HeaderCell>
                            <Table.HeaderCell>Employ Id</Table.HeaderCell>
                            <Table.HeaderCell>Leave Type</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>From Date</Table.HeaderCell>
                            <Table.HeaderCell>To Date</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body >
                        {this.getlist(this.state.AppliedLeavesarray)}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}
export default PendingLeaves;