import CourseItem from './CourseItem';
import '../style/CourseList.css'
import { connect } from 'react-redux';

function CourseList({enrolledCourses, icon}) {
    const courses = enrolledCourses;
    
    return (
        <div className="CourseList">
            {courses.map((course, id) => {
                return <CourseItem key={id} name={course} icon={icon} />;
            })}
        </div>
    );
}

const mapStateToProps = state => ({
    enrolledCourses: state.course.enrolledCourses
});

export default connect(mapStateToProps)(CourseList);