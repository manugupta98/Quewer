import './course-pie-chart.css';
import { PieChart } from 'react-minimal-pie-chart';
import { useState, useEffect } from 'react';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import UserPopUp from './UserPopUp';
import axios from 'axios';
import React from 'react';
import Chart from 'react-apexcharts';

const Serializer = require('../../Redux/serializer/serializer');
let cachedCourses = new Map();
let cachedSeries = new Map();
const DAYS = 7, SKIP = 1;

export default function CoursePieChart({ list, id }) {
    const [course, setCourse] = useState({ students: [], teachers: [], questions: 0, solutions: 0 });
    const [series, setSeries] = useState([{name: 'Questions', data: []}]);
    const [options, setOptions] = useState({xaxis: {categories: []}});
    const [names, setNames] = useState([]);
    const [studentPopUp, setStudentPopUp] = useState(false);
    const [teacherPopUp, setTeacherPopUp] = useState(false);
    const graphStyle = {zoom: {enabled: false}}

    useEffect(() => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const opts = {xaxis: {categories: []}}, sers = [{name: 'Questions', data: []}];
        let date = new Date();
        date.setDate(date.getDate() - DAYS + SKIP);
        for (let i = 0; i < DAYS; i += SKIP) {
            for (var j = 0; j < SKIP-1; j++) {
                opts.xaxis.categories.push("");
                sers[0].data.push(i+j);
            }
            sers[0].data.push(i+SKIP-1);
            opts.xaxis.categories.push(`${date.getDate()} ${months[date.getMonth()]}`);
            date.setDate(date.getDate() + SKIP);
        }
        console.log(opts.xaxis.categories);
        setOptions(opts);
        setSeries(sers);
    }, []);


    useEffect(() => {
        const tempNames = [];
        for (let i = 0; i < list.length; i++) {
            const x = list[i];
            tempNames.push({ label: `${x.title} ${x.description}`, value: i });
        }
        tempNames.sort((a, b) => a.label.localeCompare(b.label));
        setNames(tempNames);
        if (tempNames.length > 0) createCurrCourse(tempNames[0].value);
    }, [list]);


    const createCurrCourse = index => {
        const courseId = list[index].id;
        if (cachedCourses.has(courseId)) {
            setCourse(cachedCourses.get(courseId));
            setSeries(cachedSeries.get(courseId));
        } else axios.get(process.env.REACT_APP_SERVER_URL + '/api/courses/' + courseId + '/questions').then(res => {
            Serializer.deserializeAsync("question", res.data).then(data => {
                let sol = 0;
                data.forEach(x => sol += x.answers.length)
                const newCourse = { students: list[index].registeredUsers, teachers: [], questions: data.length, solutions: sol };
                cachedCourses.set(courseId, newCourse);
                setCourse(newCourse);
            })
        }).catch(err => {
            console.log(err);
        });
    }


    return (
        <div id={id} className="courses-list">
            <Dropdown options={names}
                value={(names.length === 0) ? "Select a course" : names[0]}
                onChange={(data) => createCurrCourse(data.value)} />
            <div className="content">
                <div className='chart'>
                    <div className='details'>
                        <div><h1>{course.questions}</h1><h3>questions</h3></div>
                        <div><h1>{course.solutions}</h1><h3>solutions</h3></div>
                    </div>
                    {(course.questions === 0 && course.solutions === 0) ? "" :
                        <PieChart
                            style={{ fontSize: "5px" }}
                            data={[
                                { title: "Questions", value: course.questions, color: "skyblue" },
                                { title: "Solutions", value: course.solutions, color: "red" }
                            ]}
                            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`} />}
                </div>
                <Chart options={options} series={series} type="line" height={250} width={450}/>
                <div className="participants">
                    <div onClick={() => setTeacherPopUp(true)}><h1>{course.teachers.length}</h1><h3>TEACHERS</h3></div>
                    <div onClick={() => setStudentPopUp(true)}><h1>{course.students.length}</h1><h3>STUDENTS</h3></div>
                </div>
            </div>
            {(studentPopUp) ? <UserPopUp list={course.students} setFn={setStudentPopUp} /> : ""}
            {(teacherPopUp) ? <UserPopUp list={course.teachers} setFn={setTeacherPopUp} /> : ""}
        </div>
    );
}