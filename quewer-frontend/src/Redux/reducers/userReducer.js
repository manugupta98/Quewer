import { SIDEBAR_TOGGLE, USER_INFO } from '../constants';
import axios from 'axios';

const appState = {
    sideBar: true,
    user: { name: null, profileImg: null },
};

export default function userReducer(state = appState, action) {
    switch(action.type) {
        // to be filled after getting API
        case SIDEBAR_TOGGLE: {
            return {
                ...state,
                sideBar: action.payload
            }
        }
        case USER_INFO: {
            let name, img;
            async function getUserDetails(){
                let data = 8;
                await axios.get(process.env.REACT_APP_SERVER_URL + "/api/users").then((res) => {
                    data = res.data;
                }).catch((err) => {
                    console.error(err);
                    data = err;
                })
                return data;
            }
            getUserDetails().then((body) => {
                console.log(body);
                name = body.data.attributes.displayName;
                img = body.data.attributes.photos[0].value;
            });
            return {
                ...state,
                user: {
                    name: name,
                    profileImg: img
                }
            }
        }
        default:
            return state;
    }
}