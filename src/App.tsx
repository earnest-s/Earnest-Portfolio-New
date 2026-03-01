import { useEffect } from 'react';

import {
  Header,
  Hero,
  About,
  Experience,
  Skills,
  Certificates,
  Projects,
  Contact,
  Footer,
} from './components';
import './styles/index.css';

function App() {
  useEffect(() => {
    // Add fade-in class to body
    document.body.classList.add('fade-in');
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Certificates />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
