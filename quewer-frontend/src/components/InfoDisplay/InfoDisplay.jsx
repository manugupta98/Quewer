import React, { Component } from 'react'
import './InfoDisplay.css';

export class InfoDisplay extends Component {
    render() {
        return (
            <div>
                <p className="text-nowrap" id="infoPara">{this.props.value}</p>
                <p className="text-nowrap" id="infoPara">{this.props.name}</p>
            </div>
        )
    }
}

export default InfoDisplay
