import CourseItem from './CourseItem';
import '../style/CourseList.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function CourseList({enrolledCourses, icon}) {
    const courses = enrolledCourses;
    
    return (
        <div className="CourseList">
            {courses.map(course => {
                return <Link key={course.id} to={`/course/${course.title}`} style={{ textDecoration: "none", color: "white" }}><CourseItem name={course.title} id={course.id} icon={icon} /></Link>;
            })}
        </div>
    );
}

const mapStateToProps = state => ({
    enrolledCourses: state.user.user.registeredCourses
});

export default connect(mapStateToProps)(CourseList);