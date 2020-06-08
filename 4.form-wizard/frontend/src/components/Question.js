import React from 'react';
import Address from './Adress';

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
        let isVisible = this.props.currentStep !== this.props.questionStep ? "none" : "flex"
        if(this.props.inputType === "text"){
           return( <div className="question-flex-container" style={{ display: isVisible }}>
                        <h1>{this.props.question}</h1>
                        <div>
                            <input type="text" onChange={this.onChange} />
                            <button
                                disabled={this.state.localData === ""} 
                                type="button" 
                                onClick={this.handleNext}>Next</button>    
                        </div>              
                    </div> 
                );
        }else if(this.props.inputType === "select"){
            return(<div className="question-flex-container"  style={{ display: isVisible }}>
                        <h1>{this.props.question}</h1>
                        <div>
                            <select onChange={this.onChange}>
                                <option disabled selected value> select an option </option>
                                {this.props.data.data.map(option => <option value={option}>{option}</option> )}
                            </select>
                            <button 
                                disabled={this.state.localData === ""} 
                                type="button" 
                                onClick={this.handleNext}>Next</button>
                        </div>
                    </div>
                  );
        }else if(this.props.inputType === "address"){
            return(
                <div className="question-flex-container" style={{ display: isVisible }}>
                    <h1>{this.props.question}</h1>
                    <div>
                        {this.state.localData}
                        <Address onChange={this.onChange}/>
                        <button 
                                disabled={this.state.localData === ""} 
                                type="button" 
                                onClick={this.handleNext}>Next</button>
                    </div>
                </div>
            );
        }
    }
}