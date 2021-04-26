import './add-course.css';
import { useEffect, createRef } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addAdminCourse } from '../../Redux/actions';
import Serializer from '../../Redux/serializer/serializer';

export default function AddCourse() {
    const teachers = useSelector(state => state.admin.teachers);
    const multiSelect = createRef();
    const dispatch = useDispatch();

    const reset = () => {
        document.getElementsByClassName('course-details')[0].reset();
        multiSelect.current.resetSelectedValues();
    };

    const addCourse = () => {
        const idArray = multiSelect.current.getSelectedItems().map(i => i.id);
        const title = document.getElementById('admin-add-title').value;
        const name = document.getElementById('admin-add-name').value;
        if (idArray.length === 0 || title === "" || name === "") alert("Please fill all the required details!");
        else {
            const objToSend = Serializer.serialize('course', { title: title, description: name, teachers: idArray });
            axios.post(process.env.REACT_APP_SERVER_URL + '/api/courses', objToSend).then(res => {
                console.log("Added!");
                Serializer.deserializeAsync('course', res.data).then(data => {
                    reset();
                    console.log(data);
                    dispatch(addAdminCourse(data));
                    alert("Course Added Successfully!");
                })
            }).catch(err => console.log(err));
        }
    };

    return <div className="add-course">
        <form className="course-details">
            <div className="info">
                <div>
                    <h1>Course ID</h1>
                    <input id='admin-add-title' type="text" />
                </div>
                <div>
                    <h1>Course Name</h1>
                    <input id='admin-add-name' type="text" />
                </div>
            </div>
            <div className="teachers">
                <h1>Add Teachers:</h1>
                <Multiselect options={teachers.map(t => { return { name: t.name, id: t.id } })}
                    ref={multiSelect}
                    displayValue="name" />
            </div>
        </form>
        <div className='add-buttons'>
            <button className="firstEle" onClick={addCourse}><h2>Add</h2></button>
            <button onClick={reset}><h2>Cancel</h2></button>
        </div>
    </div>
}