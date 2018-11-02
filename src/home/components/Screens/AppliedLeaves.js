import React from 'react';
import { Table } from 'semantic-ui-react';
import Header from '../../controls/header';
import { Button } from 'semantic-ui-react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Label from '../../controls/Label';
import Input from '@material-ui/core/Input';
import store from '../../store/index';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class AppliedLeaves extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog:false,
            data: { leavetype: '', fromdate: moment(), todate: moment(),description:"",status:""},
            AppliedLeavesarray: [],
            arrayindex:'apply',
            startDate: moment()
        };
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handletabledata = this.handletabledata.bind(this);
        this.getitems = this.getitems.bind(this);
        this.handleinput = this.handleinput.bind(this);
        this.handleaddlistitem = this.handleaddlistitem.bind(this);
        this.applyleave = this.applyleave.bind(this);
        this.handledelete = this.handledelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
    }

    componentDidMount(){
        this.getitems();  
    }

    getitems(){
        let data = JSON.parse(localStorage.getItem("appliedleaves"));
        let setdata = data.length >0 ? data : [];
        this.setState({
            AppliedLeavesarray: setdata
        });
    }

    handleOpenDialog(data, arrayindex) {
        this.setState({
            openDialog:true,
            data,
            arrayindex
        });
    }

    handleChange(date) {
        let data = { ...this.state.data };
        data["fromdate"] = date;
        this.setState({
            data
        });
    }

    handleToChange(date) {
        let data = { ...this.state.data };
        data["todate"] = date;
        this.setState({
            data
        });
    }

    applyleave(){
        let employid = JSON.parse(localStorage.getItem("employid"));
        let data = { leavetype: '', fromdate: moment(), todate: moment(), description: "", status: "pending", employid};
        let arrayindex = 'apply';
        this.handleOpenDialog(data,arrayindex);
    }

    handletabledata(event){
        let arrayindex = event.currentTarget.id;
        let data = {...this.state.AppliedLeavesarray[arrayindex]};
        data["fromdate"] = moment(data.fromdate);
        data["todate"] = moment(data.todate);
        this.handleOpenDialog(data,arrayindex);
    }

    handleClose() {
        this.setState({ openDialog: false });
    }

    getlist(array){
        let list = [];
        list = array.map((item, index)=>{return(
            <Table.Row disabled={(item.status === "pending") ? false : true} onClick={this.handletabledata} id={index} >
                <Table.Cell>{item.leavetype}</Table.Cell>
                <Table.Cell>{item.fromdate}</Table.Cell>
                <Table.Cell>{item.todate}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.status}</Table.Cell>
            </Table.Row>
        ); });
        return list;
    }

    handleinput(event){
        let name = event.target.name;
        let value = event.target.value;
        let data = {...this.state.data};
        data[name] = value;
        this.setState({
            data
        });
    }

    handledelete() {
        let arrayindex = this.state.arrayindex;
        let data = [...this.state.AppliedLeavesarray];
        data.splice(arrayindex,1);
        localStorage.setItem("appliedleaves", JSON.stringify(data));
        store.dispatch({ type: 'SET_NOTIFICATION_SUCCESS', "message": "Leave sucessfully Deleted.", "open": true });
        this.getitems();
        this.handleClose();
    }

    handleaddlistitem(){
        let arrayindex = this.state.arrayindex;

        if(arrayindex == 'apply'){
            this.handleadd();
        }
        else{
            let data = [...this.state.AppliedLeavesarray];
            data[arrayindex] = { ...this.state.data };
            // let appliedleaves = JSON.parse(localStorage.getItem("appliedleaves"));
            // appliedleaves.push(data);
            localStorage.setItem("appliedleaves", JSON.stringify(data));
            store.dispatch({ type: 'SET_NOTIFICATION_SUCCESS', "message": "Leave sucessfully Updated.", "open": true });
            this.getitems();
            this.handleClose();
        }
    }

    handleadd(){
        let data = this.state.data;
        let length = this.state.AppliedLeavesarray.length;
        let id = length+1;
        data.id = id.toString();
        if(data.leavetype!="" && data.fromdate!="" && data.todate != '' && data.description != ""){
            let getdata = JSON.parse(localStorage.getItem("appliedleaves"));
            getdata.push(data);
            localStorage.setItem("appliedleaves", JSON.stringify(getdata));
            store.dispatch({ type: 'SET_NOTIFICATION_SUCCESS', "message": "Leave sucessfully applied.", "open": true });
            this.getitems();
            this.handleClose();
        }
        else {
            store.dispatch({ type: 'SET_NOTIFICATION_SUCCESS', "message": "All fields are required.", "open": true });
        }
    }

    getDialog(){
        return(
            <div>
                <Dialog
                    open={this.state.openDialog}
                    aria-labelledby="form-dialog-title"
                    id="dialog-box"
                >
                    <DialogTitle id="form-dialog-title">Apply Leave</DialogTitle>
                    <DialogContent id="Input-label">
                        <div className="form-dialog" >
                            <Label label="Type" />
                            <Input placeholder="Select..." value={this.state.data.leavetype} name="leavetype" onChange={(e) => this.handleinput(e, "leavetype")} />
                        </div>
                        <div style={{ display: "inline-flex" }} className="form-dialog" >
                            <Label label="From" />
                            <DatePicker
                                customInput={<Input placeholder="Select..." value={this.state.data.fromdate.format("MM/DD/YYYY")} />}
                                selected={this.state.data.fromdate}
                                onChange={this.handleChange}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                todayButton={"Today"}
                                dropdownMode="select"
                            />
                        </div>
                        <div style={{ display: "inline-flex" }} className="form-dialog">
                            <Label label="To" />
                            <DatePicker
                                customInput={<Input placeholder="Select..." value={this.state.data.todate.format("MM/DD/YYYY")} />}
                                selected={this.state.data.todate}
                                onChange={this.handleToChange}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                todayButton={"Today"}
                                dropdownMode="select"
                            />
                        </div>
                        <div>
                            <Label label="Description" className="form-dialog"/>
                            <Input placeholder="Enter Text...." multiline rows="8" name="description" value={this.state.data.description} onChange={(e) => this.handleinput(e, "description")}  />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {this.state.arrayindex != 'apply' ? <Button onClick={this.handledelete} content='Delete' primary /> : null}
                        <Button onClick={this.handleClose} content='Cancel' primary />
                        <Button onClick={this.handleaddlistitem} content='Ok' primary />
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Header label="Applied Leaves" Button={<div><Button onClick={this.applyleave} content='Apply' primary /></div>} />
                <Table striped selectable>
                    <Table.Header>
                        <Table.Row >
                            <Table.HeaderCell>Leave Type</Table.HeaderCell>
                            <Table.HeaderCell>From Date</Table.HeaderCell>
                            <Table.HeaderCell>To Date</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body >
                        {this.state.AppliedLeavesarray.length>0 ? this.getlist(this.state.AppliedLeavesarray) : null}
                    </Table.Body>
                </Table>
                <div>
                    {this.state.openDialog ? this.getDialog() : null}
                </div>
            </div>
        );
    }
}
export default AppliedLeaves;