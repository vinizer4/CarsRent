import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from "./NavbarSearch.module.css"

function NavbarSearch() {
  return (
    <>
      {['md'].map((expand) => (
        <Navbar id={styles.nav} key={expand} expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}` }
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            >
                <div className={styles.title}>
                    <h2 className={styles.h2}>
                        Encontre aqui o seu tipo de carro ideal
                    </h2>
                </div>
              <Offcanvas.Body id={styles.form}>
                <Form className="d-flex">
                  <Form.Control
                    type=""
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button style={{width:'30vw'}} className={styles.searchButton}>Buscar</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarSearch;