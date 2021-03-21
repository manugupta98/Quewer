import '../style/CourseItem.css';
import jQuery from 'jquery';
import store from '../Redux/store';
import { selectCourse } from '../Redux/actions';

export default function CourseItem(props) {
    jQuery(document).ready(function(){
        jQuery('li').click(function(event){
            //remove all pre-existing active classes
            jQuery('.Selected').removeClass('Selected');
    
            //add the active class to the link we clicked
            jQuery(this).addClass('Selected');

            // store.dispatch(selectCourse(props.name));

            event.preventDefault();
        });
    });

    return (
        <li><h4>{props.name}</h4></li>
    );
}