import React from 'react';

export default class Qeustion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            localData: ""
        }
    }

    onChange = (e) => {
        this.setState({localData: e.target.value })
    }

    handleNext = () => {
        if(this.props.data && this.props.data.invalidOption){
            if(this.props.data.invalidOption === this.state.localData){
                this.props.onNextClick("invalid",this.props.bindingPath);
                return;
            }
        }
        this.props.onNextClick(this.state.localData,this.props.bindingPath);
    }

    render(){
        let isVisible = this.props.currentStep !== this.props.questionStep ? "none" : "block"
        if(this.props.inputType === "text"){
           return( <div style={{ display: isVisible }}>
                        <p>{this.props.question}</p>
                        <input type="text" onChange={this.onChange} />
                        <button
                            disabled={this.state.localData === ""} 
                            type="button" 
                            onClick={this.handleNext}>Next</button>                  
                    </div> 
                );
        }else if(this.props.inputType === "select"){
            return(<div style={{ display: isVisible }}>
                        <p>{this.props.question}</p>
                        <select onChange={this.onChange}>
                            <option disabled selected value> -- select an option -- </option>
                            {this.props.data.data.map(option => <option value={option}>{option}</option> )}
                        </select>
                        <button 
                            disabled={this.state.localData === ""} 
                            type="button" 
                            onClick={this.handleNext}>Next</button>
                    </div>
                  );
        }else if(this.props.inputType === "adress"){
            return(
                <div style={{ display: isVisible }}>
                    <p>{this.props.question}</p>
                    <h1>Adress</h1>
                    <button 
                            disabled={this.state.localData === ""} 
                            type="button" 
                            onClick={this.handleNext}>Next</button>
                </div>
            );
        }
    }
}