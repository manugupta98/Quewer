import './App.css';
import QuestionCard from './components/question-card/question-card';
import CourseEnrollCard from './components/course-enroll-card/course-enroll-card';

const tagsArray = ['stackoverflow', 'Crystal', 'C#', 'Visual studio']

function App() {
  return (
    <div className="App">
      <QuestionCard postedBy='Anonymous' on='19/02/2021 12:12pm' tags={tagsArray} question='Crystal Report Does not Render' desc="I installed the Visual Studio 2019 in Other Driver Not In C, and crystal report installed in C. Now, project attached the crystal reports dll's but did not render. Is their any issue due to different path installation?" />
      <CourseEnrollCard course='CS F111 Computer Programming' desc='An introductory course on computer programming. Students will be taught C programming language in this couse.' />
    </div>
  );
}

export default App;
