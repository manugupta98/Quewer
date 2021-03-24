import '../style/SideBar.css';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CourseItem from './CourseItem';
import { FaFolderPlus, FaBook } from "react-icons/fa";
import sidebar from '../assets/sidebar.png';

function SideBar({style}) {
    const visible = style;

    return (
        <div className="SideBar FlexCard ColumnCard" style={ visible }>
            <img src={sidebar} />
            <h2>Menu</h2>
            <Link to="/enroll" style={{textDecoration: 'none'}}><CourseItem name={'Enroll Courses'} icon={<FaFolderPlus style={{marginRight: '5px'}}/>} /></Link>
            <br />
            <h2 style={{marginTop: '0px'}}>Your Courses</h2>
            <CourseList icon={<FaBook style={{marginRight: '5px'}} />}></CourseList>
        </div>
    );
}

const mapStateToProps = state => {
    if(state.user.sideBar) {
        return { style: {visibility: 'visible', width: '200px'} }
    }
    else
        return { style: {visibility: 'hidden', width: '0px'} }
}

export default connect(mapStateToProps)(SideBar);