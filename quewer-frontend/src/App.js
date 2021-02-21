import './App.css';
import QuestionCard from './components/question-card/question-card';
import CourseEnrollCard from './components/course-enroll-card/course-enroll-card';
import CardList from './components/card-list/card-list';

const tagsArray = ['stackoverflow', 'Crystal', 'C#', 'Visual studio']

const array = [
  {
    course: 'ksaksa',
    desc: 'sdfheofwka'
  },
  {
    course: 'ksaksa',
    desc: 'sdfheofwka'
  },
  {
    course: 'ksaksa',
    desc: 'sdfheofwka'
  },
  {
    course: 'ksaksa',
    desc: 'sdfheofwka'
  },
  {
    course: 'ksaksa',
    desc: 'sdfheofwka'
  },
]

const array1 = [
  {
    course: 'test',
    desc: 'skadaskdhadnas'
  },
  {
    course: 'test',
    desc: 'skadaskdhadnas'
  },
  {
    course: 'test',
    desc: 'skadaskdhadnas'
  },
  {
    course: 'test',
    desc: 'skadaskdhadnas'
  },
  {
    course: 'test',
    desc: 'skadaskdhadnas'
  },
]

function App() {
  return (
    <div className="App">
      <QuestionCard postedBy='Anonymous' on='19/02/2021 12:12pm' tags={tagsArray} question='Crystal Report Does not Render' desc="I installed the Visual Studio 2019 in Other Driver Not In C, and crystal report installed in C. Now, project attached the crystal reports dll's but did not render. Is their any issue due to different path installation?" />
      <CourseEnrollCard course='CS F111 Computer Programming' />
      <CardList component={CourseEnrollCard} list={array} />
      <CardList component={CourseEnrollCard} list={array1} />
    </div>
  );
}

export default App;
