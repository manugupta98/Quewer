import DisplayCard from './components/DisplayCard/DisplayCard';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App container-fluid">
      <Navbar username="John"/>
      <DisplayCard />
    </div>
  );
}

export default App;
