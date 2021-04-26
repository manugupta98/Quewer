import React from 'react';
import CardList from '../card-list';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import Announcement from '../Announcement';
import { showSelectedCourseOnSidebar } from '../../Redux/actions';

function AnnouncementDisplay({match}) {
    useEffect(() => showSelectedCourseOnSidebar(), []);
    const list = useSelector(state => state.course.currentCourse.announcements);
    return (
        <div>
            <CardList component={Announcement} list={list} />
        </div>
    );
}

export default AnnouncementDisplay;