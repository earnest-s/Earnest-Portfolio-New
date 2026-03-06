import '../styles/contact.css';

export const Footer = () => {
  return (
    <footer className="footer-minimal">
      <div className="container footer-shell">
        <p>© {new Date().getFullYear()} Earnest S</p>
      </div>
    </footer>
  );
};
