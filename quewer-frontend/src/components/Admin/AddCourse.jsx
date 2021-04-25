import './add-course.css';
import { useEffect, useState, createRef } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

export default function AddCourse({ list }) {
    const [teachers, setTeachers] = useState([]);
    const multiSelect = createRef();
    useEffect(() => {
        const names = []
        names.push({ name: "Ram", id: 1 });
        names.push({ name: "Shyam", id: 2 });
        names.push({ name: "Udelu", id: 3 });
        names.push({ name: "Gururaj", id: 4 });
        names.push({ name: "Panda", id: 5 });
        names.push({ name: "Aruna", id: 6 });
        names.push({ name: "Bhanu", id: 7 });
        names.push({ name: "TRay", id: 8 });
        names.push({ name: "Anirudh Agrawal", id: 9 });
        names.sort((a, b) => a.name.localeCompare(b.name));
        setTeachers(names);
    }, []);

    const reset = () => {
        document.getElementsByClassName('course-details')[0].reset();
        multiSelect.current.resetSelectedValues();
    };

    const addCourse = () => {
        console.log(multiSelect.current.getSelectedItems());
    };

    return <div className="add-course">
        <form className="course-details">
            <div className="info">
                <div>
                    <h1>Course ID</h1>
                    <input type="text" />
                </div>
                <div>
                    <h1>Course Name</h1>
                    <input type="text" />
                </div>
            </div>
            <div className="teachers">
                <h1>Add Teachers:</h1>
                <Multiselect options={teachers}
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