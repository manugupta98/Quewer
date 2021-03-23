import '../style/SideBar.css';
import CourseList from './CourseList';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import CourseItem from './CourseItem';
import { FaFolderPlus, FaBook } from "react-icons/fa";
import sidebar from '../assets/sidebar.png';

function SideBar({style}) {
    const visible = style;
    
    let history = useHistory();

    function redirect() {
        history.push("/enroll")
    }

    return (
        <div className="SideBar FlexCard ColumnCard" style={ visible }>
            <img src={sidebar} />
            <h2>Menu</h2>
            <div onClick={redirect}><CourseItem name={'Enroll Courses'} icon={<FaFolderPlus style={{marginRight: '5px'}}/>} /></div>
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