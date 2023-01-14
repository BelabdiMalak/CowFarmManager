import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import MilkProduction from './MilkProduction'
import BirthRegistration from './BirthRegistration'
import MedicalExamination from './MedicalExamination'
import CowRegistration from './CowRegistration'
import NotFound from './NotFound';
import ShowData from './ShowData';

function App() {
  return (

    <Router>
        <div className="App">
            <div className="content">

              <Routes>
                <Route exact path="/"             element={<Home/>} />
                <Route path="/milkProduction"     element={<MilkProduction />} />
                <Route path="/birthRegistration"  element={<BirthRegistration />} />
                <Route path="/medicalExamination" element={<MedicalExamination />} />
                <Route path="/cowRegistration"    element={<CowRegistration />} />
                <Route path="*"                   element={<NotFound />} />
                <Route path="/ShowData/:url"      element={<ShowData />} />
              </Routes>

              <footer> حقوق النشر &copy; بلعبدي ملاك 2023</footer>
            </div>
        </div>
    </Router>

  );
}


export default App;
