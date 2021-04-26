import './admin.css';
import UserList from './UserList';
import CoursePieChart from './CoursePieChart';
import {useState} from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addTeachers, fetchCourses} from '../../Redux/actions';
import Chart from 'react-apexcharts';
import axios from 'axios';

const DAYS = 30;

export default function Admin() {
    const [courseOpen, setCourseOpen] = useState(true);
    const [teacherOpen, setTeacherOpen] = useState(false);
    const [studentOpen, setStudentOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [options, setOptions] = useState({});
    const [loginActivity, setActivity] = useState([]);
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

    const fetchUsersActivity = () => {
        const date = new Date();
        const end = `end=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        date.setDate(date.getDate() - DAYS + 1);
        const start = `start=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}&`;
        console.log(process.env.REACT_APP_SERVER_URL + '/api/dashboards/students?' + start + end);
        axios.get(process.env.REACT_APP_SERVER_URL + '/api/dashboards/students?' + start + end).then(res => {
            const data = res.data.data;

            const tempArr = new Array(DAYS).fill(0);
            let i = 0;
            date.setHours(0, 0, 0, 0);
            data.forEach(x => {
                const attr = x.attributes;
                const d = new Date(attr.date.year, attr.date.month - 1, attr.date.day, 0, 0, 0, 0);
                while (date.getTime() < d.getTime()) {
                    date.setDate(date.getDate() + 1);
                    i++;
                }
                tempArr[i] = attr.count;
            });
            setActivity(tempArr);
        }).catch(err => console.log(err));
    };


    useEffect(() => {
        [1, 2].forEach(id => {
            document.getElementById(IDList[id]).classList.toggle(classList[id]);
            document.getElementById(IDList[id]).classList.toggle('toggle');
        });
        dispatch(fetchCourses());
        fetchUsersActivity();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const opts = { xaxis: { labels: {rotate: 0}, tickAmount: 5, categories: [] },
         yaxis: {title: {text: 'Users'}, labels: {formatter: function(val) {return val.toFixed(0)}}},
        title: {text: 'Users ACTIVITY', align: 'left',}, stroke: { width: 5, curve: 'smooth' } };
        let date = new Date();
        date.setDate(date.getDate() - DAYS + 1);
        for (let i = 0; i < DAYS; i++) {
            opts.xaxis.categories.push(`${date.getDate()} ${months[date.getMonth()]}`);
            date.setDate(date.getDate() + 1);
        }
        setOptions(opts);
    }, []);

    useEffect(() => {
        console.log("COURSELIST", courseList);
        let studs = new Set(), techs = new Set();
        courseList.forEach(x => {
            x.registeredUsers.forEach(user => studs.add(JSON.stringify(user)));
            // x.teachers.forEach(user => techs.add(JSON.stringify(user))));
        });
        setStudents([...studs].sort().map(x => JSON.parse(x)));
        // const tempArr = [...techs].sort().map(x => JSON.parse(x));
        // setTeachers(tempArr);
        // dispatch(addTeachers(tempArr));
    }, [courseList]);

    return (
        <div className="admin-content">
            <Chart className="graph" id="users-graph" options={options} series={[{ name: 'Users Logged In', data: loginActivity }]} height={300}
             chart={{width: '100%'}} />
            <div className="section">
                <div className="init-row">
                    <h1>All Courses: {courseList.length}</h1>
                    {(courseOpen) ? <BsArrowUp className="drop-down" onClick={() => toggleList(0)} />
                     : <BsArrowDown className="drop-down" onClick={() => toggleList(0)} /> }
                </div>
                <CoursePieChart id={IDList[0]} list={courseList} DAYS={DAYS} opts={options}/>
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
