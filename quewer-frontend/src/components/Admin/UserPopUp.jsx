import './user-popup.css';
import { RiCloseCircleFill } from "react-icons/ri";
import UserList from './UserList';

export default function UserPopUp(props) {
    const closePopUp = () => {
        props.setFn(false);
    }
    return (
        <div id='userpopup'>
            <RiCloseCircleFill id='popup-close' onClick={closePopUp}/>
            <UserList list={props.list} />
        </div>
    );
}