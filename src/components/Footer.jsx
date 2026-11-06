export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span>Ashish Kumar · Bengaluru, Karnataka, India</span>
        <span>© {currentYear} · All rights reserved</span>
        <span className="foot__credit">
          Design inspired by{" "}
          <a
            href="https://yevtam.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            yevtam.com
          </a>{" "}
          and{" "}
          <a
            href="https://ajvadlaseen.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            ajvadlaseen.com
          </a>
        </span>
      </div>
    </footer>
  );
}
