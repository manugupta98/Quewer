import CourseItem from './CourseItem';
import '../style/CourseList.css'
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import jQuery from 'jquery';

function CourseList({ enrolledCourses, icon }) {
    const courses = enrolledCourses;
    const location = useLocation();
    const path = location.pathname;
    if (path.startsWith('/course/')) {
        const courseName = path.split('/')[2];
        jQuery('.Selected').removeClass('Selected');
        jQuery(`h4:contains(${courseName})`).addClass('Selected');
    } else if (path.startsWith('/enroll')) {
        jQuery('.Selected').removeClass('Selected');
        jQuery(`h4:contains("Enroll Courses")`).addClass('Selected');
    } else {
        jQuery('.Selected').removeClass('Selected');
    }

    return (
        <div className="CourseList">
            {courses.map(course => {
                return <Link key={course.id} to={`/course/${course.title}`} style={{ textDecoration: "none", color: "white" }}>
                    <CourseItem name={course.title} id={course.id} icon={icon} />
                </Link>;
            })}
        </div>
    );
}

const mapStateToProps = state => ({
    enrolledCourses: state.user.user.registeredCourses
});

export default connect(mapStateToProps)(CourseList);