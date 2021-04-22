import './admin.css';
import UserList from './UserList';
import CoursePieChart from './CoursePieChart';
import {useState} from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { useEffect } from 'react';

export default function Admin(props) {
    const [courseOpen, setCourseOpen] = useState(true);
    const [teacherOpen, setTeacherOpen] = useState(false);
    const [studentOpen, setStudentOpen] = useState(false);
    const students = [];
    const teachers = [];
    const courses = [];
    const IDList = ['courses-list', 'teachers-list', 'students-list'];
    const classList = ['courses-list', 'user-list', 'user-list'];

    // For test purpose
    for (let i = 0; i < 20; i++) {
        students.push({ img: 'https://lh3.googleusercontent.com/a-/AOh14Gi6fl2Hi6HqxDEA0HxeQeRH03TaMvVLChw0ld_H=s96-c', name: "Parveen Jakhar", email: 'f20180623@hyderabad.bits-pilani.ac.in' });
        teachers.push({ img: 'link', name: i, email: 'email' });
    }
    courses.push({id:`CS F324`, name:"Compilers Construction", stud: students, tech: teachers, que: 12, sol: 20});
    courses.push({id:`CS F221`, name:"OOPS", stud: students, tech: teachers, que: 15, sol: 20});
    courses.push({id:`IS F194`, name:"Software Engineering", stud: students, tech: teachers, que: 10, sol: 2});
    // till here

    const toggleList = id => {
        document.getElementById(IDList[id]).classList.toggle('toggle');
        document.getElementById(IDList[id]).classList.toggle(classList[id]);
        switch(id) {
            case 0: setCourseOpen(x => !x); break;
            case 1: setTeacherOpen(x => !x); break;
            case 2: setStudentOpen(x => !x); break;
        }
    };

    useEffect(() => {
        [1, 2].forEach(id => {
            document.getElementById(IDList[id]).classList.toggle(classList[id]);
            document.getElementById(IDList[id]).classList.toggle('toggle');
        });
    }, []);

    return (
        <div className="admin-content">
            <div className="section">
                <div className="init-row">
                    <h1>All Courses: {courses.length}</h1>
                    {(courseOpen) ? <BsArrowUp className="drop-down" onClick={() => toggleList(0)} />
                     : <BsArrowDown className="drop-down" onClick={() => toggleList(0)} /> }
                </div>
                <CoursePieChart id={IDList[0]} list={courses} />
            </div>
            <div className="section">
                <div className="init-row">
                    <h1>Teachers: {teachers.length}</h1>
                    {(teacherOpen) ? <BsArrowUp className="drop-down" onClick={() => toggleList(1)} />
                     : <BsArrowDown className="drop-down" onClick={() => toggleList(1)} /> }
                </div>
                <UserList id={IDList[1]} list={teachers} />
            </div>
            <div className="section">
                <div className="init-row">
                    <h1>Students: {students.length}</h1>
                    {(studentOpen) ? <BsArrowUp className="drop-down" onClick={() => toggleList(2)} />
                     : <BsArrowDown className="drop-down" onClick={() => toggleList(2)} /> }
                </div>
                <UserList id={IDList[2]} list={students} />
            </div>
        </div>
    );
}
