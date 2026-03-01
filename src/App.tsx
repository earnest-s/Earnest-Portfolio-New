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
import { MagneticCursor } from './components/MagneticCursor';
import './styles/index.css';

function App() {
  useEffect(() => {
    document.body.classList.add('fade-in');
  }, []);

  return (
    <>
      <MagneticCursor />
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
