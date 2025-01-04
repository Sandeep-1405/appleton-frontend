import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../Context/AuthContext';
import { CartContext } from '../Context/CartContext';

const Navbarr = () => {

    const navigate = useNavigate();
    const {cart} = useContext(CartContext);
    const {setJwt} = useContext(AuthContext);

    const onClickLogout = () =>{
        localStorage.clear();
        setJwt(null)
        navigate('/login');
    }

    return (
        <Navbar bg="light" expand="lg" collapseOnSelect>
            <Container>
                {/* Logo on the Left */}
                <Navbar.Brand as={Link} to="/">
                    SVS
                </Navbar.Brand>
                
                {/* Hamburger Menu Toggle */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                {/* Collapsible Links */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* Centered Links */}
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/" className='mx-3'>
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/add-product" className='mx-3'>
                            Add Product
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cart" className='mx-3' >
                            Cart <span className='text-primary' >{cart.length}</span>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/orders" className='mx-3'>
                            Orders
                        </Nav.Link>
                    </Nav>
                    
                    {/* Logout Button at the End */}
                    <Nav className="ms-auto">
                        <button className="btn btn-danger" onClick={onClickLogout}>Logout</button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navbarr;
