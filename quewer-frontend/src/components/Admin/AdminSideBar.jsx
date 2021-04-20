import './admin-side-bar.css';
import { useSelector } from 'react-redux';
import sidebar from '../../assets/sidebar.png';
import {TiFolderAdd} from 'react-icons/ti';
import AddCoursePopUp from './AddCoursePopUp';

export default function SideBar() {
    const invisibleStyle = {
        display: "none"
    };
    const style = useSelector(state => state.user.sideBar) ? {} : invisibleStyle;

    const openPopUp = () => {
        document.getElementById('addcoursepopup').style.visibility = 'visible';
    };

    return (
        <div className="SideBar FlexCard ColumnCard" style={style}>
            <AddCoursePopUp />
            <img src={sidebar} />
            <div className="add-course" onClick={openPopUp}>
                <TiFolderAdd id="icon"/>
                <h3>New Course</h3>
            </div>
        </div>
    );
}