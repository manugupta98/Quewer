import './admin.css';
import UserList from './UserList';
import AllCoursesList from './AllCoursesList';
import {useState} from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { useEffect } from 'react';

export default function Admin() {
    const [courseOpen, setCourseOpen] = useState(false);
    const [teacherOpen, setTeacherOpen] = useState(false);
    const [studentOpen, setStudentOpen] = useState(false);
    const students = [];
    const teachers = [];
    const courses = [];
    const listIDs = ['courses-list', 'teachers-list', 'students-list'];

    // For test purpose
    for (let i = 0; i < 20; i++) {
        students.push({ img: 'https://lh3.googleusercontent.com/a-/AOh14Gi6fl2Hi6HqxDEA0HxeQeRH03TaMvVLChw0ld_H=s96-c', name: "Parveen Jakhar", email: 'f20180623@hyderabad.bits-pilani.ac.in' });
        teachers.push({ img: 'link', name: i, email: 'email' });
    }
    for (let i = 0; i < 20; i++)
        courses.push({id:`CS F${i+1}24`, name:"Compilers Construction"});
         // till here

    const toggleList = id => {
        document.getElementById(listIDs[id]).classList.toggle('toggle');
        document.getElementById(listIDs[id]).classList.toggle('list');
        switch(id) {
            case 0: setCourseOpen(x => !x); break;
            case 1: setTeacherOpen(x => !x); break;
            case 2: setStudentOpen(x => !x); break;
        }
    };

    useEffect(() => {
        listIDs.forEach(id => {
            document.getElementById(id).classList.toggle('list');
            document.getElementById(id).classList.toggle('toggle');
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
                <AllCoursesList id={listIDs[0]} list={courses} />
            </div>
            <div className="section">
                <div className="init-row">
                    <h1>Teachers: {teachers.length}</h1>
                    {(teacherOpen) ? <BsArrowUp className="drop-down" onClick={() => toggleList(1)} />
                     : <BsArrowDown className="drop-down" onClick={() => toggleList(1)} /> }
                </div>
                <UserList id={listIDs[1]} list={teachers} />
            </div>
            <div className="section">
                <div className="init-row">
                    <h1>Students: {students.length}</h1>
                    {(studentOpen) ? <BsArrowUp className="drop-down" onClick={() => toggleList(2)} />
                     : <BsArrowDown className="drop-down" onClick={() => toggleList(2)} /> }
                </div>
                <UserList id={listIDs[2]} list={students} />
            </div>
        </div>
    );
}
