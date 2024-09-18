import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Category from './Category';
import Item from './Item';
import FoodList from './FoodList';
import Cart from './Cart'; 
import CartDetails from './CartDetails'; 
import { useCart } from './CartContext'; 


import './NavbarCom.css';

const NavbarCom = () => {
  const { getCartItemCount } = useCart(); // Use getCartItemCount from CartContext

  return (
    <div>
      <Navbar className="custom-navbar" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home" className="home-link">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="about-link">About</Nav.Link>
              <Nav.Link as={Link} to="/category" className="category-link">Category</Nav.Link>
              <Nav.Link as={Link} to="/item" className="item-link">Item</Nav.Link>
              <Nav.Link as={Link} to="/foodlist" className="foodlist-link">FoodList</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link>
                <SearchIcon />
              </Nav.Link>
              <Nav.Link as={Link} to="/cartdetails">
                <ShoppingCartIcon />
                {getCartItemCount() > 0 && <span className="cart-count">{getCartItemCount()}</span>}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/category" element={<Category />} />
          <Route path="/item" element={<Item />} />
          <Route path="/foodlist" element={<FoodList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cartdetails" element={<CartDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default NavbarCom;



