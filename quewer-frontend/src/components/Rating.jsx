import React from 'react';
import '../style/rating.css';

class Rating extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            vals: [false, false, false, false, false, true],
            rate: 0
        }
    }

    componentDidMount() {
        this.setState({
            vals: [false, false, false, false, false, true],
            rate: 0
        })
    }

    handleClick = (index) => {
        var vals = [false, false, false, false, false, false];
        vals[index] = true;
        this.setState({
            vals: vals,
            rate: index
        });
    }

    render() {
        return (
            <div style={this.props.style}>
                {
                    this.state.vals.map((val, index) => {
                        if(val)
                            return <h3 key={index} className='rating-s rating'>{index}</h3>
                        else
                            return <h3 key={index} className='rating' onClick={() => this.handleClick(index)}>{index}</h3>
                    })
                }
            </div>
        );
    }
}

export default Rating;