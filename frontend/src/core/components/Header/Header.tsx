import styles from "./header.module.css"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="home">
      <img
          alt=""
          src="../../src/core/assets/images/logo.png"
          width="40"
          height="30"
          className="d-inline-block align-top"
        />
        Aluguel de Automóveis</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
        <Nav>
          <Nav.Link href="login" >Iniciar Sessão</Nav.Link>
          <Nav.Link eventKey={2} href="register">
            Criar Conta
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Header;
