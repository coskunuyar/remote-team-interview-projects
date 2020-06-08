import React from 'react';

export default class Item extends React.Component{
    render(){
        if(this.props.image && this.props.image[0] && this.props.image[0].url){
            let containerClassName = this.props.isImageLeft ? " reverse" : "";
            return(
                <div className={"item-container-flex-box" + containerClassName}>
                    <div className="container">
                        <p className="container-title">{this.props.header}</p>
                        <p className="container-description">{this.props.description}</p>
                        <button className="start-now-button">START NOW</button>
                        <p className="discount-motto">Free Up to 3 People!</p>
                    </div>
                    <div className="container">
                        <img src={this.props.image[0].url} alt="sample" />
                    </div>
                </div>
            );
        }else{
            return(
                <div className="item-container">
                    <p className="container-title">{this.props.header}</p>
                    <p className="container-description">{this.props.description}</p>
                    <button className="start-now-button">START NOW</button>
                    <p className="discount-motto">Free Up to 3 People!</p>
                </div>
            );
        }

    }
}