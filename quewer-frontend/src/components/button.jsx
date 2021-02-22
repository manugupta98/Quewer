import React from 'react';
import '../style/button.css';

class Button extends React.Component {
    render() {
        return (
            <button onClick={ this.props.onClick } className='self-button' style={{ backgroundColor: `${ this.props.color }`, color: `${ this.props.textColor }` }}>{ this.props.text }</button>
        );
    }
}
export default Button;