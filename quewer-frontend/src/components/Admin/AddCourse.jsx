import './add-course.css';
import { useEffect, createRef } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addAdminCourse } from '../../Redux/actions';

export default function AddCourse() {
    const teachers = useSelector(state => state.admin.teachers);
    const multiSelect = createRef();
    const dispatch = useDispatch();

    useEffect(() => {
        const names = []
        names.push({ name: "R. GURURAJ", id: 1 });
        names.push({ name: "T. RAY", id: 2 });
        names.push({ name: "Bhanu Murthy", id: 3 });
        names.push({ name: "Narasimha Bolloju", id: 4 });
        names.push({ name: "Chittaranjan Hota", id: 5 });
        names.push({ name: "Nikumani Choudhary", id: 6 });
        names.push({ name: "Aruna Malapati", id: 7 });
        names.sort((a, b) => a.name.localeCompare(b.name));
        // setTeachers(names);
    }, []);

    const reset = () => {
        document.getElementsByClassName('course-details')[0].reset();
        multiSelect.current.resetSelectedValues();
    };

    const addCourse = () => {
        const idArray = multiSelect.current.getSelectedItems().map(i => {return {id: i.id}});
        const title = document.getElementById('admin-add-title').value;
        const name = document.getElementById('admin-add-name').value;
        console.log(`${title}, ${name}, ${idArray.map(x => x.id)}`);
        axios.post(process.env.REACT_APP_SERVER_URL + '/api/courses').then(res => {
            console.log(res);
            // const course = res.data
            // dispatch(addAdminCourse(res));
        }).catch(err => console.log(err));
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
                <Multiselect options={teachers.map(t => {return {name: t.name, id: t.id}})}
                    ref = {multiSelect}
                    displayValue="name" />
            </div>
        </form>
        <div className='add-buttons'>
            <button className="firstEle" onClick={addCourse}><h2>Add</h2></button>
            <button onClick={reset}><h2>Cancel</h2></button>
        </div>
    </div>
}