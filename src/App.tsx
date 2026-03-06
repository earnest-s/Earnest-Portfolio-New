import {
  AnoAI,
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
  return (
    <>
      <AnoAI />
      <div className="app-shell">
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
      </div>
    </>
  );
}

export default App;
