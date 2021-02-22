import React from 'react';
import CardList from '../card-list';
import CourseEnrollCard from '../course-enroll-card';
import Page from './page';

const array = [
    {
        course: 'BITS F464',
        desc: 'Machine Learning'
    },
    {
        course: 'CS F303',
        desc: 'Computer Networks'
    },
    {
        course: 'CS F363',
        desc: 'Compiler Construction'
    },
    {
        course: 'CS F364',
        desc: 'Design and Analysis of Algorithms'
    },
    {
        course: 'CS F407',
        desc: 'Artificial Intelligence'
    },
    {
        course: 'IS F341',
        desc: 'Software Engineering'
    },
]

function EnrollPage(props) {
    return (
        <Page>
            <CardList component={CourseEnrollCard} list={array} />
        </Page>
    );
}

export default EnrollPage;