import '../assets/styles.css';
import { useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Page6 from './Page6';
import Page7 from './Page7';
import Page8 from './Page8';
import Page9 from './Page9';
import Page10 from './Page10';
import Page11 from './Page11';
import Page12 from './Page12';
import Page13 from './Page13';
import Page14 from './Page14';

const TestPage = () => {
  const [name, setName] = useState<string>('');
  const [acceptedPersonalData, setAcceptedPersonalData] = useState<boolean>(false);
  const [country, setCountry] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const location = useLocation();
  const navigate = useNavigate();
  const nodeRef = useRef(null);

  const handleNext = () => {
    const pathName = location.pathname;
    const match = pathName.match(/(\d+)/);
    if (match) {
      const page = Number(match[0]);
      navigate(`/test/page${page + 1}`);
    }
  };

  const handleAcceptPersonalData = () => {
    setAcceptedPersonalData(!acceptedPersonalData);
  }

  return (
    <div className="min-h-screen flex justify-center items-center w-full overflow-hidden">
      <SwitchTransition mode='out-in'>
        <CSSTransition key={location.key} classNames='fade' timeout={2000} unmountOnExit nodeRef={nodeRef}>
          <div ref={nodeRef}>
            <Routes location={location}>
              <Route path='page1' element={<Page1 name={name} setName={setName} onNext={handleNext} />} />
              <Route path='page2' element={<Page2 name={name} acceptedPersonalData={acceptedPersonalData} onAcceptPersonalData={handleAcceptPersonalData} onNext={handleNext} />} />
              <Route path='page3' element={<Page3 onNext={handleNext} />} />
              <Route path='page4' element={<Page4 onNext={handleNext} />} />
              <Route path='page5' element={<Page5 onNext={handleNext} />} />
              <Route path='page6' element={<Page6 onNext={handleNext} />} />
              <Route path='page7' element={<Page7 onNext={handleNext} />} />
              <Route path='page8' element={<Page8 onNext={handleNext} />} />
              <Route path='page9' element={<Page9 age={age} setAge={setAge} onNext={handleNext} />} />
              <Route path='page10' element={<Page10 country={country} setCountry={setCountry} onNext={handleNext} />} />
              <Route path='page11' element={<Page11 email={email} setEmail={setEmail} onNext={handleNext} />} />
              <Route path='page12' element={<Page12 onNext={handleNext} />} />
              <Route path='page13' element={<Page13 onNext={handleNext} />} />
              <Route path='page14' element={<Page14 onNext={handleNext} />} />
            </Routes>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

export default TestPage