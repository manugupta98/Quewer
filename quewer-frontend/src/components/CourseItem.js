import '../style/CourseItem.css';
import jQuery from 'jquery';
import store from '../Redux/store';
import { selectCourse } from '../Redux/actions';


export default function CourseItem(props) {
    jQuery(document).ready(function(){
        jQuery('h4').click(function(event){
            //remove all pre-existing active classes
            jQuery('.Selected').removeClass('Selected');
            
            //add the active class to the link we clicked
            jQuery(this).addClass('Selected');
        });
    });
    
    function handleClick() {
        if(props.name !== 'Enroll Courses') {
            store.dispatch(selectCourse(props.name));
            console.log(store.getState())
        }
    }
    return (
        <h4 className="menu-item" onClick={handleClick}>{props.icon}{props.name}</h4>
    );
}