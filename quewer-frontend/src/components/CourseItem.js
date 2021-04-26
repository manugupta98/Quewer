import '../style/CourseItem.css';
import store from '../Redux/store';
import { selectCourse } from '../Redux/actions';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function CourseItem(props) {

    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        if(store.getState().course.currentCourse.name === null) {
            if(path.startsWith('/course/')) {
                const courseName = path.split('/')[2];
                if(props.name === courseName) {
                    handleClick();
                    console.log(store.getState().course.currentCourse.name);
                }
            }
        }
    })

    function handleClick() {
        if(props.name !== 'Enroll Courses' && props.name !== 'Home') {
            store.dispatch(selectCourse(props.id, props.name));
        }
    }
    return (
        <h4 className="menu-item" id={props.id} onClick={handleClick}>{props.icon}{props.name}</h4>
    );
}