import React , {Component} from 'react';
import Chart from 'chart.js';

export default class ChartDrawer extends Component{
    constructor(props){
        super(props);
        let labels = {};
        this.props.data.forEach(element => {
            let currentValue  = element[this.props.label]
            if(!labels.hasOwnProperty(currentValue)){
                labels[currentValue] = 1;
            }else{
                labels[currentValue]++;
            }
        });
        this.state = {
            randomId: Math.random().toString(36).substring(7),
            labels
        }
    }
    
    getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    componentDidMount(){
        let ctx = document.getElementById(this.state.randomId).getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(this.state.labels),
                datasets: [{
                    label: this.props.label,
                    data: Object.values(this.state.labels),
                    backgroundColor: [
                        `${this.getRandomColor()}`,
                        `${this.getRandomColor()}`,
                        `${this.getRandomColor()}`,
                        `${this.getRandomColor()}`,
                        `${this.getRandomColor()}`,
                        `${this.getRandomColor()}`,
                    ]
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    render(){
        return (<div>
                    <h3 style={{textAlign:"center"}}>{this.props.label}</h3>
                    <canvas id={this.state.randomId} width="400" height="400"></canvas>
                    <hr></hr>
                </div>);
    }
}