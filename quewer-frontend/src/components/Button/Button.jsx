import React, { Component } from 'react'

export class Button extends Component {
    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary text-left text-nowrap">{this.props.value}</button> 
            </div>
        )
    }
}

export default Button
