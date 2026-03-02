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
