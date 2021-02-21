import '../style/SideBar.css';
import Burger from './Burger';
import CourseList from './CourseList';

export default function SideBar() {
    const handleClick = function() {
        console.log("Clicked");
        const list = document.getElementById('courseList');
        list.addEventListener("click", () => {
            const content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    };

    return (
        <div className="SideBar FlexCard ColumnCard">
            <Burger></Burger>
            <button id="enrollButton">Enroll New Courses</button>
            <hr></hr>
            <h2>Your Courses:</h2>
            <CourseList onClick={handleClick}></CourseList>
            <hr></hr>
        </div>
    );
}