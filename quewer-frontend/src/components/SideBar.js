import '../style/SideBar.css';
import CourseList from './CourseList';
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';

const handleClick = () => {
    console.log("Clicked");
    const list = document.getElementById('courseList');
    list.addEventListener("click", () => {
        const content = this.nextElementSibling;
        console.log(content);
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
};

export default function SideBar() {
    return (
        <div className="SideBar FlexCard ColumnCard">
            <FaBars style={{ fontSize:'20px', position:'relative', right:'80px' }} />
            <Link to="/enroll"><button id="enrollButton">Enroll New Courses</button></Link>
            <hr></hr>
            <h2>Your Courses:</h2>
            <CourseList onClick={handleClick}></CourseList>
            <hr></hr>
        </div>
    );
}