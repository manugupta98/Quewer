import './all-courses-list.css';
import UserPopUp from './UserPopUp';
import {useState} from 'react';

export default function AllCoursesList({ list, id }) {
    return (
        <div className="list" id={id}>
            {list.map(course => {
                return <CourseItem course={course} />
            })}
        </div>
    );
}

function CourseItem({ course }) {
    const [studentPopUp, setStudentPopUp] = useState(false);
    const [teacherPopUp, setTeacherPopUp] = useState(false);

    const students = [];
    const teachers = [];
    const questionCount = 12, answerCount = 26;
    for (let i = 0; i < 20; i++) {
        students.push({ img: 'https://lh3.googleusercontent.com/a-/AOh14Gi6fl2Hi6HqxDEA0HxeQeRH03TaMvVLChw0ld_H=s96-c', name: "Parveen Jakhar", email: 'f20180623@hyderabad.bits-pilani.ac.in' });
        teachers.push({ img: 'link', name: i, email: 'email' });
    }

    return (
        <div className="course-item">
            {(studentPopUp) ? <UserPopUp list={students} setFn={setStudentPopUp}/> : ""}
            {(teacherPopUp) ? <UserPopUp list={teachers} setFn={setTeacherPopUp}/> : ""}
            <div className="details">
                <h2 className="course-id firstEle">{course.id}</h2>
                <h3 >{course.name}</h3>
            </div>
            <div className="questions">
                <h3 className="midRow firstEle">{questionCount} questions</h3>
                <h3 className="midRow">{answerCount} solutions</h3>
            </div>
            <div className="participants">
                <button onClick={() => setStudentPopUp(true)}><h1>{students.length}</h1> Students</button>
                <button onClick={() => setTeacherPopUp(true)}><h1>{teachers.length}</h1> Teachers</button>
            </div>
        </div>
    );
}