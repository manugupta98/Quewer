import React from 'react';
import CardList from '../card-list';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import Announcement from '../Announcement';
import { showSelectedCourseOnSidebar } from '../../Redux/actions';

function AnnouncementDisplay({match}) {
    useEffect(() => showSelectedCourseOnSidebar(), []);
    const list = useSelector(state => state.course.currentCourse.announcements);
    const course = useSelector(state => state.course.currentCourse.name);
    return (
        <div>
            {(list.length > 0) ? <h1 style={{margin: '10px 5%'}}>Announcements for {course}</h1> : null}
            {(list.length === 0) ? <h3 style={{textAlign: 'center', }}>No announcements yet!</h3> : null }
            <CardList component={Announcement} list={list} />
        </div>
    );
}

export default AnnouncementDisplay;