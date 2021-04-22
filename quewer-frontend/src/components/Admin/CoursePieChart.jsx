import './course-pie-chart.css';
import { PieChart } from 'react-minimal-pie-chart';
import { useState, useEffect } from 'react';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import UserPopUp from './UserPopUp';

export default function CoursePieChart({ list, id }) {
    const [course, setCourse] = useState({ id: "", name: "", stud: [], tech: [], que: 0, sol: 0 });
    const [courseNames, setCourseNames] = useState([]);
    const [studentPopUp, setStudentPopUp] = useState(false);
    const [teacherPopUp, setTeacherPopUp] = useState(false);

    useEffect(() => {
        const names = []
        for (let i = 0; i < list.length; i++) {
            names.push({ label: `${list[i].id} ${list[i].name}`, value: i });
        };
        names.sort((a, b) => a.label.localeCompare(b.label));
        setCourse(list[names[0].value]);
        setCourseNames(names);
    }, []);

    return (
        <div id={id} className="courses-list">
            <Dropdown options={courseNames}
                value={(courseNames.length === 0) ? "Select a course" : courseNames[0]}
                onChange={(data) => setCourse(list[data.value])} />
            <div className="content">
                <div className='stats'>
                    <div className='details'>
                        <div><h1>{course.que}</h1><h3>questions</h3></div>
                        <div><h1>{course.sol}</h1><h3>solutions</h3></div>
                    </div>
                    <PieChart
                        style={{ fontSize: "5px" }}
                        data={[
                            { title: "Questions", value: course.que, color: "skyblue" },
                            { title: "Solutions", value: course.sol, color: "red" }
                        ]}
                        label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`} />
                </div>
                <div className='participants'>
                    <div onClick={() => setTeacherPopUp(true)}><h1>{course.tech.length}</h1><h3>TEACHERS</h3></div>
                    <div onClick={() => setStudentPopUp(true)}><h1>{course.stud.length}</h1><h3>STUDENTS</h3></div>
                </div>
            </div>

            {(studentPopUp) ? <UserPopUp list={course.stud} setFn={setStudentPopUp} /> : ""}
            {(teacherPopUp) ? <UserPopUp list={course.tech} setFn={setTeacherPopUp} /> : ""}
        </div>
    );
}