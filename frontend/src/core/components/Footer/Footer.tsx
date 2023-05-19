import styles from "./Footer.module.css"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Footer() {
  return (

    <Navbar fixed="bottom" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand > <span className={styles.brandText}>@2023 Digital House - Grupo 03</span> </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
        <Nav className="">
        <img
          alt=""
          src="../../src/core/assets/images/facebook.png"
          width="30"
          height="30"
          className={styles.icon}
        />
        <img
          alt=""
          src="../../src/core/assets/images/linkedin.png"
          width="30"
          height="30"
          className={styles.icon}
        />
        <img
          alt=""
          src="../../src/core/assets/images/twitter.png"
          width="30"
          height="30"
          className={styles.icon}
        />
        <img
          alt=""
          src="../../src/core/assets/images/instagram.png"
          width="30"
          height="30"
          className={styles.icon}
        />
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>  
  );
};

export default Footer;
