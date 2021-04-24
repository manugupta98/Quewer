import './admin.css';
import UserList from './UserList';
import CoursePieChart from './CoursePieChart';
import {useState} from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTeachers, fetchStudents, fetchCourses} from '../../Redux/actions';

export default function Admin() {
    const [courseOpen, setCourseOpen] = useState(true);
    const [teacherOpen, setTeacherOpen] = useState(false);
    const [studentOpen, setStudentOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const courseList = useSelector(state => state.course.courseList);
    const IDList = ['courses-list', 'teachers-list', 'students-list'];
    const classList = ['courses-list', 'user-list', 'user-list'];
    const dispatch = useDispatch();

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
        dispatch(fetchCourses());
    }, []);

    useEffect(() => {
        let studs = new Set(), techs = new Set();
        courseList.forEach(x => {
            x.registeredUsers.forEach(user => studs.add(JSON.stringify(user)));
            // x.registeredTeachers.forEach(user => techs.add(JSON.stringify(user))));
        });
        setStudents([...studs].sort().map(x => JSON.parse(x)));
        // setTeachers([...techs].sort().map(x => JSON.parse(x)));
    }, [courseList]);

    return (
        <div className="admin-content">
            <div className="section">
                <div className="init-row">
                    <h1>All Courses: {courseList.length}</h1>
                    {(courseOpen) ? <BsArrowUp className="drop-down" onClick={() => toggleList(0)} />
                     : <BsArrowDown className="drop-down" onClick={() => toggleList(0)} /> }
                </div>
                <CoursePieChart id={IDList[0]} list={courseList}/>
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
