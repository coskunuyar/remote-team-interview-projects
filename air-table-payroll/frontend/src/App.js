import React from 'react';
import Item from './Item';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  async componentWillMount(){
    let response = await fetch("http://localhost:5000/");
    this.setState({data: await response.json()});
  }

  render(){
    const { data }= this.state;
    let header = "";
    let result = [];
    if(data.length > 0){
      header = data[0]["Value 1"];
    }
    data.shift();
    data.forEach((field,index) => {
      result.push(<Item 
        header={field["Value 1"]} 
        description={field["Value 2"]} 
        image={field["Value 3"]}
        isImageLeft={index === 1}
        />);
    });
    return (
      <div className="App">
          <div className="header-container">
            <p>{header}</p>
          </div>
          {result}
      </div>
    );    
  }
}

export default App;
