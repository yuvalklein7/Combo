import './App.css';
import NavBar from './components/JS/NavBar.js';
import HomePage from './pages/JS/HomePage';
import { Routes, BrowserRouter as Router, Route, HashRouter } from "react-router-dom";
import NewSearch from './pages/JS/NewSearch';
import Favorites from './pages/JS/Favorites';
import About from './pages/JS/About';
import Search from './pages/JS/Search'

function App() {

  return (
      <div className="App">
        <HashRouter>
          <NavBar />
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<NewSearch />} />
            <Route path="/Favorites" element={<Favorites />} />
            <Route path="/About" element={<About />} />
            <Route path="/Search=:value" element={<Search />} />
          </Routes>
        </HashRouter>
      </div>
  );
}

export default App;
