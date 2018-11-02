import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'Recharts';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from 'semantic-ui-react';
import $ from "jquery";
import { connect } from 'react-redux';
import { setdatainstore, setformateddatainstore, selecteddayvalueinstore } from '../actions/ChartActions';

class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serverdata: props.serverdata,
            data: props.data,
            xaxisdates: props.xaxisdates,
            datakey: props.datakey,
            selecteddayvalue: props.selecteddayvalue,
        };
        this.getline = this.getline.bind(this);
        this.handleinput = this.handleinput.bind(this);
    }

    componentDidMount() {
        var options = {
            "async": true,
            "crossDomain": true,
            "url": "http://api.jsonbin.io/b/5b893b00db948c68635a04eb",
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
            }
        };

        $.ajax(options).done((data)=> {

            //convert object of object to array of objects
            let result = Object.entries(data)
                .map(([k, v]) => ({ [k]: v }));

            //setting data in store
            this.props.setdatainstore(result);
            this.getconfig();
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            serverdata: newProps.serverdata,
            data: newProps.data,
            xaxisdates: newProps.xaxisdates,
            datakey: newProps.datakey,
            selecteddayvalue: newProps.selecteddayvalue,
        });
    }

    getconfig() {
        let data = this.state.serverdata;
        let length = data.length;
        let datakey = [];
        let xaxisdates = this.state.xaxisdates;
        let array = [];
        let object = {};
        let datakeyflag = 0;
        for (let i = 1; i <= xaxisdates; i++) {
            object.x = i;
            for (let k = 0; k < length; k++) {
                let key = Object.keys(data[k]);
                let keyvalue = Object.keys(data[k])[0];
                if (datakeyflag == 0) {
                    datakey.push(keyvalue);
                }
                object[keyvalue] = data[k][key].points[i - 1];
            }
            datakeyflag = 1;
            array.push(object);
            object = {};
        }
        this.props.setformateddatainstore(array,datakey);
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }

    getline() {
        let arraylinedata = [];
        let color;
        arraylinedata = this.state.datakey.map((item) => {
            color = this.getRandomColor();
            return (<Line type="monotone" dataKey={item} stroke={color} strokeWidth={4} />);
        });
        return arraylinedata;
    }

    handleinput(event) {
        this.props.selecteddayvalueinstore(event.target.value);
        this.setState({
            xaxisdates: event.target.value
        }, ()=>this.getconfig());
        
    }

    render() {
        return (
            <div className="ChartData">
                <div className="charts-header">
                    Key Ranks
                    <span>|</span>
                    Competitors
                </div>
                <div className="charts-middle-layout">
                    <Select
                        value={this.state.selecteddayvalue}
                        onChange={this.handleinput}
                        id="select-menu"
                    >
                        <MenuItem value={1}>ONE DAY</MenuItem>
                        <MenuItem value={2}>TWO DAYS</MenuItem>
                        <MenuItem value={3}>THREE DAYS</MenuItem>
                        <MenuItem value={4}>FOUR DAYS</MenuItem>
                        <MenuItem value={5}>FIVE DAYS</MenuItem>
                        <MenuItem value={6}>SIX DAYS</MenuItem>
                        <MenuItem value={7}>ONE WEEK</MenuItem>
                    </Select>
                    <div className="export-button">
                        <Button primary>Export to CSV</Button>
                    </div>
                </div>
                <LineChart
                    width={1143}
                    height={350}
                    data={this.state.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="x" tick={{ fill: 'white' }} />
                    <YAxis ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} tick={{ fill: 'white' }} />
                    <CartesianGrid stroke="#464242" />
                    <Tooltip />
                    <Legend />
                    {this.state.datakey.length > 0 ? this.getline() : null}
                </LineChart>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.reducer;
};

const mapDispatchToProps = {
    setdatainstore: setdatainstore,
    setformateddatainstore: setformateddatainstore,
    selecteddayvalueinstore: selecteddayvalueinstore
};

let ChartsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Charts);

export default ChartsContainer;