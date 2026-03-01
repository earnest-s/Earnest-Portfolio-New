import '../styles/contact.css';

export const Footer = () => {
  return (
    <footer className="footer-minimal">
      <div className="container">
        <div className="footer-logo">ES</div>
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Earnest S. Designed & Built in Dark Mode.
        </p>
      </div>
    </footer>
  );
};
