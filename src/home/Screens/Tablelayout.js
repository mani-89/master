import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react'
import { DataTable } from 'react-data-components';
import $ from "jquery";
import { connect } from 'react-redux';
import { setlistitemsinstore } from '../actions/TableActions';

class Tablelayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listitems: props.listitems
        };
    }

    componentDidMount() {
        let options = {
            "async": true,
            "crossDomain": true,
            "url": "http://api.jsonbin.io/b/5b893aa03ffac56f4bd7905a",
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
            }
        };
        $.ajax(options).done((response) => {
            this.props.setlistitemsinstore(response.data)
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            listitems: newProps.listitems,
        });
    }

    render() {
        let columns = [
            { title: 'Keywords', prop: 'keyword' },
            { title: 'Position', prop: 'position' },
            { title: 'Change', prop: 'change' },
        ];
        return (
            <div className="table">
                <div className="table-layout">
                    <Input placeholder="Enter Keyword" />
                    <Input placeholder="Optional" />
                    <Button primary>+ Add</Button>
                    <div style={{ display: "inline-block" }}>
                        <span className="dot">+</span>
                        <span>Bulk Import</span>
                    </div>
                </div>
                <DataTable
                    keys="name"
                    columns={columns}
                    initialData={this.state.listitems}
                    initialPageLength={5}
                    initialSortBy={{ prop: 'keyword', order: 'descending' }}
                />
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    return state.reducer;
};

const mapDispatchToProps = {
    setlistitemsinstore: setlistitemsinstore,
};
let TablelayoutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Tablelayout);
export default TablelayoutContainer;
