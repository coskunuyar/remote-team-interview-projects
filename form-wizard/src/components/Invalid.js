import React from 'react';

export default class Invalid extends React.Component{
    render(){
        return(
            <div>
                <h1>This form is not suitable for you!</h1>
                <button onclick={() =>{ 
                    window.location.reload();
                }}>Refresh Page</button>
            </div>
        )
    }
}