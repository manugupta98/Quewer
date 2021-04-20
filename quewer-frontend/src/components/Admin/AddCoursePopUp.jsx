import './add-course-popup.css';
import { RiCloseCircleFill } from "react-icons/ri";

export default function AddCoursePopUp() {
    const closePopUp = () => {
        document.getElementById('addcoursepopup').style.visibility = 'hidden';
    }
    return (
        <div id='addcoursepopup'>
            <RiCloseCircleFill id='popup-close' onClick={closePopUp}/>
            <div className='popup-main'>
                <div className="course-info">
                    <h2>Course ID</h2>
                    <input className="input" type="text" />
                    <h2>Course Name</h2>
                    <input className="input" type="text" />
                </div>
                <div className="buttons">
                    <button className="btn" >Add</button>
                    <button className="btn" onClick={closePopUp}>Cancel</button>
                </div>
            </div>
        </div>
    );
}