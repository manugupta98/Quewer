import CourseItem from './CourseItem';
import '../style/CourseList.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function CourseList({enrolledCourses, icon}) {
    const courses = enrolledCourses;
    
    return (
        <div className="CourseList">
            {courses.map((course, id) => {
                return <Link key={id} to={`/course/${course.type}`} style={{ textDecoration: "none", color: "white" }}><CourseItem name={course.type} id={course.id} icon={icon} /></Link>;
            })}
        </div>
    );
}

const mapStateToProps = state => ({
    enrolledCourses: state.user.user.registeredCourses
});

export default connect(mapStateToProps)(CourseList);