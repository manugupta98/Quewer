import React from 'react';
import CardList from '../card-list';
import QuestionCard from '../question-card';
import store from '../../Redux/store';
import DisplayCard from '../DisplayCard/DisplayCard';

const array = [
    {
        question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati minima perspiciatis, sequi beatae eum dolores?',
        desc: 'I am new to GCP and been asked to work on dataproc to create spark application to bring data from source database to Bigquery on GCP. I created a dataproc cluster with the following options:',
        postedBy: 'blackbishop',
        on: '22 Feb, 3:31pm',
        tags: ['apache-spark', 'google-cloud-platform', 'google-cloud-dataproc']
    },
    {
        question: "No padding or margin: what's keeping my table from getting 100% width? & why do scrollbars not scroll with wheel when hovering over scrollable el.?",
        desc: "I am new to GCP and been asked to work on dataproc to create spark application to bring data from source database to Bigquery on GCP. I created a dataproI've tried everything. Parent has 100% width. The only thing I could get working was to put a wrapper around the whole table, and make the wrapper overflow-y: auto; max-height: #px; but that's not really what I'm after (no static header). I guess tomorrow after some sleep I could try a sticky header but I was hoping one of you gurus could enlighten me.I take that back, I did manage to dig up a solution here on SO but I had to either use table-layout: fixed or go with broken cell alignment. No bueno.... and no matter what the darn scrollbar won't scroll (without clicking and holding)!I'll include the whole thing below. I'm guessing it has something to do with flexbox but I might be horribly wrong. There might be some artifacts from me screwing with it as well.c cluster with the following options:",
        postedBy: 'bsap',
        on: '22 Feb, 3:31pm',
        tags: ['apache-spark', 'google-cloud-platform', 'google-cloud-dataproc']
    },
    {
        question: "path partition in python",
        desc: "For path partition in python, how to use self.path.partition() to distinguish different paths in the best way possible?For example, /match?pid1=&pid2=&A=[]&B=[]/match/[cid]/C/[pid]?points=/match/[cid]/end /match/[cid]/D/[pid]I've tried to use path, _, query_string = self.path.partition('?') and '/', follow by query = parse_qs(query_string, keep_blank_values=True)but hardly distinguish the paths and extract the information, like pid and cid, that I need for mysql. I'm trying to use the partition result to proceed with next 'if' statement. I'm wondering how can I break them down perfectly and extract the info so that I can use 'if' to proceed different command? Will update if I figure out something.",
        postedBy: 'bsap',
        on: '22 Feb, 3:31pm',
        tags: ['apache-spark', 'google-cloud-platform', 'google-cloud-dataproc']
    }
]

function MainPage({match}) {
    console.log(store.getState());
    return (
        <div>
            <DisplayCard name={match.params.courseID} />
            <CardList component={QuestionCard} list={store.getState().course.currentCourse.questions} />
        </div>
    );
}

export default MainPage;