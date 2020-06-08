import React from 'react';
import ChartDrawer from './Chart';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keys : [],
      data: []
    }
  }

  async componentWillMount(){
    let response = await fetch("http://localhost:5000/");
    let data = await response.json();
    this.setState({
      keys: data.shift().keys,
      data
    })
  }

  render(){
    let {keys, data} = this.state;
    let result = [];
    keys.forEach((key , index )=> {
      if( key !== "Name"){
        result.push(<div className="col-md-6 col-lg-4 chart-container">
                      <ChartDrawer label={key} data={data} />
                  </div>);
      }
    });
    return (
      <div className="App container">
        <h1 style={{ textAlign: "center"}}>Diversity App</h1>
        <div className="row">
          { result }
        </div>
      </div>
    );
  }
}

export default App;
