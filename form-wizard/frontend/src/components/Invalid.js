import React from 'react';

export default class Invalid extends React.Component{
    render(){
        return(
            <div className="question-flex-container">
                <h1>This form is not suitable for you!</h1>
                <button onClick={() =>{
                    window.location.reload(true);
                }}>Refresh Page</button>
            </div>
        )
    }
}