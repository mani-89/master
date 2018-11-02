import React from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
Charts(FusionCharts);


class Dashboards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    
    render() {
        const myDataSource = {
            "chart": {
                "caption": "Leaves of the Month",
                "subcaption": "Report",
                "startingangle": "90",
                "showlabels": "0",
                "showlegend": "1",
                "enablemultislicing": "0",
                "slicingdistance": "15",
                "showpercentvalues": "1",
                "showpercentintooltip": "0",
                "plottooltext": "Type : $label Total visit : $datavalue",
                "theme": "zune"
            },
            "data": [
                {
                    "label": "Employes",
                    "value": "25"
                },
                {
                    "label": "Total",
                    "value": "10"
                },
                {
                    "label": "Approved",
                    "value": "4"
                },
                {
                    "label": "Rejected",
                    "value": "6"
                }
            ]
        };

        const chartConfigs = {
            type: 'pie3d',
            width: 600,
            height: 400,
            dataFormat: 'json',
            dataSource: myDataSource,
        };
        return (
            <div style={{paddingLeft:"180px",paddingTop:'60px'}}>
                 <ReactFC {...chartConfigs} />
            </div>
        );
    }
}
export default Dashboards;