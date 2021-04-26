import { FETCH_TEACHERS, FETCH_STUDENTS } from '../constants';

const appState = {
    teachers: [],
    students: []
};

const fetchUserObject = (data) => {
    const list = [];
    data.forEach(x => {
        list.push({
            id: x.id,
            name: x.attributes.displayName,
            email: x.attributes.emails[0].value,
            photo: x.attributes.photos[0].value
        });
    });
    return list;
}

export default function adminReducer(state = appState, action) {
    let list = [];
    switch (action.type) {
        case FETCH_TEACHERS: {
            
            return {
                ...state,
                teachers: fetchUserObject(action.payload)
            }
        }
        case FETCH_STUDENTS: {
            return {
                ...state,
                students: fetchUserObject(action.payload)
            }
        }
        default:
            return state;
    }
}