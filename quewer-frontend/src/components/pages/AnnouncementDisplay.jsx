import React from 'react';
import CardList from '../card-list';
import {useSelector} from 'react-redux';
import Announcement from '../Announcement';

function AnnouncementDisplay({match}) {
    const list = useSelector(state => state.course.currentCourse.announcements);
    return (
        <div>
            <CardList component={Announcement} list={list} />
        </div>
    );
}

export default AnnouncementDisplay;