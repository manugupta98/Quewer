import './course-pie-chart.css';
import { PieChart } from 'react-minimal-pie-chart';
import { useState, useEffect } from 'react';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import UserPopUp from './UserPopUp';
import axios from 'axios';
import React from 'react';
import Chart from 'react-apexcharts';

let cachedCourses = new Map();

export default function CoursePieChart({ list, id, DAYS, opts }) {
    const [course, setCourse] = useState({ students: [], teachers: [], queCount: 0, solCount: 0, queData: [], solData: [] });
    const [options, setOptions] = useState({});
    const [names, setNames] = useState([]);
    const [studentPopUp, setStudentPopUp] = useState(false);
    const [teacherPopUp, setTeacherPopUp] = useState(false);

    useEffect(() => {
        if (opts.yaxis !== undefined) {
            const tempOpt = { ...opts };
            tempOpt.yaxis.title.text = 'No of Ques / Ans';
            tempOpt.title.text = 'Question Answers Stats'
            setOptions(opts);
        }
    }, [opts]);

    const fetchGraphData = () => {
        const date = new Date();
        const end = `end=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        date.setDate(date.getDate() - DAYS + 1);
        const start = `start=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}&`;
        list.forEach(x => {
            axios.get(process.env.REACT_APP_SERVER_URL + '/api/courses/' + x.id + '/dashboards?' + start + end).then(res => {
                const data = res.data.data.attributes;
                const tempQue = new Array(DAYS).fill(0), tempSol = new Array(DAYS).fill(0);
                let i = 0;
                data.questionsGraph.forEach(x => {
                    const d = new Date(x.date.year, x.date.month - 1, x.day, 0, 0, 0, 0);
                    while (date.getTime() < d.getTime()) {
                        date.setDate(date.getDate() + 1);
                        i++;
                    }
                    tempQue[i++] = x.count;
                }); i = 0;
                data.answersGraph.forEach(x => {
                    const d = new Date(x.date.year, x.date.month - 1, x.day, 0, 0, 0, 0);
                    while (date.getTime() < d.getTime()) {
                        date.setDate(date.getDate() + 1);
                        i++;
                    }
                    tempSol[i++] = x.count;
                });
                
                const newCourse = {
                    students: x.registeredUsers,
                    teachers: x.teachers,
                    queCount: data.questionsCount,
                    solCount: data.answersCount,
                    queData: tempQue,
                    solData: tempSol
                };
                cachedCourses.set(x.id, newCourse);
            }).catch(err => console.log(err));
        });
        if (names.length > 0) setCourse(cachedCourses.get(names[0].value));
    };

    useEffect(() => {
        if (list.length > 0) {
            fetchGraphData();
            const tempNames = [];
            list.forEach(x => tempNames.push({ label: `${x.title} ${x.description}`, value: x.id }));
            tempNames.sort((a, b) => a.label.localeCompare(b.label));
            setNames(tempNames);
        }
    }, [list]);


    return (
        <div id={id} className="courses-list">
            <Dropdown options={names}
                value={(names.length === 0) ? "Select a course" : names[0]}
                onChange={data => { if (cachedCourses.has(data.value)) setCourse(cachedCourses.get(data.value)) }} />
            <div className="content">
                <div className='chart'>
                    <div className='details'>
                        <div><h1>{course.queCount}</h1><h3>questions</h3></div>
                        <div><h1>{course.solCount}</h1><h3>solutions</h3></div>
                    </div>
                    {(course.queCount === 0 && course.solCount === 0) ? "" :
                        <PieChart
                            style={{ fontSize: "5px" }}
                            data={[
                                { title: "Questions", value: course.queCount, color: "skyblue" },
                                { title: "Solutions", value: course.solCount, color: "red" }
                            ]}
                            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
                            lineWidth={80} radius={42} />}
                </div>
                <Chart className="graph" options={options} series={[{ name: 'Questions', data: course.queData }, { name: 'Answers', data: course.solData }]} height={280} width={450} />
                <div className="participants">
                    <div onClick={() => setTeacherPopUp(true)}><h1>{(course.teachers === undefined) ? 0 : course.teachers.length}</h1><h3>&nbsp;TEACHERS</h3></div>
                    <div onClick={() => setStudentPopUp(true)}><h1>{course.students.length}</h1><h3>&nbsp;STUDENTS</h3></div>
                </div>
            </div>
            {(studentPopUp) ? <UserPopUp list={course.students} setFn={setStudentPopUp} /> : ""}
            {(teacherPopUp) ? <UserPopUp list={course.teachers} setFn={setTeacherPopUp} /> : ""}
        </div>
    );
}