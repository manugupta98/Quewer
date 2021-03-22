import '../style/SideBar.css';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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

function SideBar({style}) {
    const visible = style;

    return (
        <div className="SideBar FlexCard ColumnCard" style={ visible }>
            <Link to="/enroll"><button id="enrollButton">Enroll New Courses</button></Link>
            <h2>Your Courses:</h2>
            <CourseList onClick={handleClick}></CourseList>
        </div>
    );
}

const mapStateToProps = state => {
    console.log(state.user.sideBar);
    if(state.user.sideBar) {
        return { style: {visibility: 'visible', width: '200px'} }
    }
    else
        return { style: {visibility: 'hidden', width: '0px'} }
}

export default connect(mapStateToProps)(SideBar);