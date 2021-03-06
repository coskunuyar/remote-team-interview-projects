import React from 'react';
import './App.css';
import Question from './components/Question';
import Invalid from './components/Invalid';
import DownloadPDF from './components/DownloadPDF';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        formData: {
            personOrEntity:"",
            usOrNonus:"",
            name: "",
            surname: "",
            organizationName: "",
            organizationCountry: "",
            address: ""
        },
        currentStep: 1
    }
  }

  onNextClick = (value,bindingPath) => {
    if(value === "invalid"){
      this.setState({currentStep: -9999 });
      return;
    }
    let currentData = {...this.state.formData};
    currentData[bindingPath] = value;
    this.setState({ formData: currentData , currentStep: this.state.currentStep + 1 });
  }

  render(){
    return (
      <div className="App">
        <Question 
              inputType="select" 
              question="Are you a person or entity?" 
              bindingPath="personOrEntity"
              data={{ data: ["person","entity"] , invalidOption: "entity"}}
              onNextClick={this.onNextClick}
              questionStep={1}
              nextStep={2}
              currentStep={this.state.currentStep}
          />
          <Question 
              inputType="select" 
              question="What is your citizenship status?" 
              bindingPath="usOrNonus"
              data={{ data: ["US","NON US"] , invalidOption: "US"}}
              onNextClick={this.onNextClick}
              questionStep={2}
              nextStep={3}
              currentStep={this.state.currentStep}
          />
          <Question 
              inputType="text" 
              question="What is your name?" 
              bindingPath="name"
              onNextClick={this.onNextClick}
              questionStep={3}
              nextStep={4}
              currentStep={this.state.currentStep}
          />
          <Question 
              inputType="text" 
              question="What is your surname?" 
              bindingPath="surname"
              onNextClick={this.onNextClick}
              questionStep={4}
              nextStep={5}
              currentStep={this.state.currentStep}
          />
          <Question 
              inputType="text" 
              question="What is your organization name?" 
              bindingPath="organizationName"
              onNextClick={this.onNextClick}
              questionStep={5}
              nextStep={6}
              currentStep={this.state.currentStep}
          />
          <Question 
              inputType="text" 
              question="Country of your organization?" 
              bindingPath="organizationCountry"
              onNextClick={this.onNextClick}
              questionStep={6}
              nextStep={7}
              currentStep={this.state.currentStep}
          />
          <Question 
              inputType="address" 
              question="What is your address?" 
              bindingPath="address"
              onNextClick={this.onNextClick}
              questionStep={7}
              nextStep={8}
              currentStep={this.state.currentStep}
          />
          <DownloadPDF
              data={this.state.formData}
              questionStep={8}
              currentStep={this.state.currentStep}
          />
        {this.state.currentStep === -9999 && <Invalid />}
      </div>
    );
  }
}

export default App;
