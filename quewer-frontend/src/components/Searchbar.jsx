import React from 'react';
import '../style/Searchbar.css';
import { FaSearch } from 'react-icons/fa'

export default class Searchbar extends React.Component {
    
    handleChange = (event) => {
        this.props.onChange(event.target.value);
    }

    render() {
        return(
            <span className='search'>
                <FaSearch style={{alignSelf: 'center'}} />
                <input className='search-input' placeholder={'Search'} onChange={this.handleChange} />
            </span>
        );
    }
}