import CourseItem from './CourseItem';
import '../style/CourseList.css'

export default function CourseList() {
    const courses = ["DSA", "DBMS", "OOPS", "Comp Arch", "CN", "DSA", "DBMS", "OOPS", "Comp Arch", "CN", "DSA", "DBMS", "OOPS", "Comp Arch", "CN"];
    
    return (
        <div className="CourseList">
            <ul>
                {courses.map(course => {
                    return <CourseItem key={course} name={course}/>;
                })}
            </ul>
        </div>
    );
}
