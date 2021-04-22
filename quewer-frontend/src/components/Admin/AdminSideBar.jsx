import './admin-side-bar.css';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import sidebar from '../../assets/sidebar.png';
import {TiFolderAdd} from 'react-icons/ti';
import {VscDashboard} from 'react-icons/vsc';
import {useEffect} from 'react';

export default function SideBar() {
    const invisibleStyle = {
        display: "none"
    };
    const style = useSelector(state => state.user.sideBar) ? {} : invisibleStyle;

    const clickDash = () => {
        document.getElementById('dash-btn').classList.add('active-btn');
        document.getElementById('add-btn').classList.remove('active-btn');
    };
    const clickAddCourse = () => {
        document.getElementById('dash-btn').classList.remove('active-btn');
        document.getElementById('add-btn').classList.add('active-btn');
    };

    useEffect(() => {
        clickDash();
    }, []);

    return (
        <div className="SideBar FlexCard ColumnCard" style={style}>
            <img src={sidebar} />
            <Link to="/admin" onClick={clickDash} id="dash-btn" className="side-btns">
                <VscDashboard className="icon"/>
                <h3>Dashboard</h3>
            </Link>
            <Link to="/addcourse" onClick={clickAddCourse} id="add-btn" className="side-btns">
                <TiFolderAdd className="icon"/>
                <h3>New Course</h3>
            </Link>
        </div>
    );
}