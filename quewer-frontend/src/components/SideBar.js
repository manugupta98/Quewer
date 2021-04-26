import '../style/SideBar.css';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CourseItem from './CourseItem';
import { FaFolderPlus, FaBook, FaHome } from "react-icons/fa";
import sidebar from '../assets/sidebar.png';

export default function SideBar() {
    const invisibleStyle = {
        display: "none"
    };
    const style = useSelector(state => state.user.sideBar) ? {} : invisibleStyle;

    return (
        <div className="SideBar FlexCard ColumnCard" style={style}>
            <img src={sidebar} />
            <h2>Menu</h2>
            <Link to="/main" style={{textDecoration: 'none'}}><CourseItem name={'Home'} icon={<FaHome style={{marginRight: '5px'}}/>} /></Link>
            <Link to="/enroll" style={{textDecoration: 'none'}}><CourseItem name={'Enroll Courses'} icon={<FaFolderPlus style={{marginRight: '5px'}}/>} /></Link>
            <br />
            <h2 style={{marginTop: '0px'}}>Your Courses</h2>
            <CourseList icon={<FaBook style={{marginRight: '5px'}} />}></CourseList>
        </div>
    );
}