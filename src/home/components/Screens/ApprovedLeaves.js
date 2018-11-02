import React from 'react';
import { Table } from 'semantic-ui-react';
import Header from '../../controls/header';

class ApprovedLeaves extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AppliedLeavesarray: [],
        };
        this.getitems = this.getitems.bind(this);
    }

    componentDidMount() {
        this.getitems();
    }

    getitems() {
        let data = JSON.parse(localStorage.getItem("appliedleaves"));
        let setdata = data.length > 0 ? data : [];
        this.setState({
            AppliedLeavesarray: setdata
        });
    }

    getlist(array) {
        let list = [];
        let data = array.filter((item)=> item.status=="approved");
        if(data.length>0){
            list = data.map((item, index) => {
                return (
                        <Table.Row onClick={this.handletabledata} id={index} >
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
        else{
            return <div id="text-msg">No records available</div>
        }
    }

    render() {
        return (
            <div>
                <Header label="Approved Leaves" />
                <Table striped >
                    <Table.Header>
                        <Table.Row >
                            <Table.HeaderCell>Employ Id</Table.HeaderCell>
                            <Table.HeaderCell>Leave Type</Table.HeaderCell>
                            <Table.HeaderCell>From Date</Table.HeaderCell>
                            <Table.HeaderCell>To Date</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body >
                        {this.state.AppliedLeavesarray.length > 0 ? this.getlist(this.state.AppliedLeavesarray) : null}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}
export default ApprovedLeaves;