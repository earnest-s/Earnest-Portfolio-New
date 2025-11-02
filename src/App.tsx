import { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import {
  Header,
  Hero,
  About,
  Experience,
  Skills,
  Projects,
  Contact,
  Footer,
} from './components';
import './styles/index.css';

function App() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Add fade-in class to body
    document.body.classList.add('fade-in');
  }, []);

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
