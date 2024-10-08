import React, { useState } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Home from './Home';
import About from './About';
import Category from './Category';
import Item from './Item';
import FoodList from './FoodList';
import Cart from './Cart';
import CartDetails from './CartDetails';
import { useCart } from './CartContext';
import SignUp from './SignUp';
import Login from './Login';
import AddRestaurant from './AddRestaurant';
import Feedback from './Feedback';
import Payment from './Payment';
import Admin from './Admin';
import { useAuth } from './AuthContext';
import './NavbarCom.css';
import Dashboard from './Dashboard';

const NavbarCom = () => {
    const { getCartItemCount } = useCart();
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const [userName, setUserName] = useState(user?.name || null);
    const [userRole, setUserRole] = useState(user?.role || null);

    const handleLogout = () => {
        if (logOut) {
            logOut();
            setUserName(null);
            setUserRole(null);
            navigate('/login'); // Redirect to login page
        } else {
            console.error("Logout function is not defined.");
        }
    };

    const handleLoginSuccess = (name, role) => {
        setUserName(name);
        setUserRole(role);
    };

    return (
        <div>
            <Navbar className="custom-navbar" expand="lg">
                <Container>
                    <Link to="/" className="navbar-brand">KLN Food Court</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {userRole === 'ADMIN' ? (
                                <Nav.Link as={Link} to="/admin">Admin Panel</Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                                    <Nav.Link as={Link} to="/category">Category</Nav.Link>
                                    <Nav.Link as={Link} to="/item">Item</Nav.Link>
                                    <Nav.Link as={Link} to="/foodlist">Food List</Nav.Link>
                                    <Nav.Link as={Link} to="/addrestaurant">Add Restaurant</Nav.Link>
                                    <Nav.Link as={Link} to="/feedback">Feedback</Nav.Link>
                                    <Nav.Link as={Link} to="/payment">Payment</Nav.Link>
                                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                                    <Nav.Link as={Link} to="/admin">Admin</Nav.Link>  

                                </>
                            )}
                        </Nav>
                        <Nav className="ms-auto">
                            <Nav.Link>
                                <SearchIcon />
                            </Nav.Link>
                            <Nav.Link as={Link} to="/cartdetails">
                                <ShoppingCartIcon />
                                {getCartItemCount() > 0 && <span className="cart-count">{getCartItemCount()}</span>}
                            </Nav.Link>
                            {!userName ? (
                                <>
                                    <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                </>
                            ) : (
                                <Dropdown align="end">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="profile-icon">
                                        {userName.charAt(0).toUpperCase()}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                {userRole === 'ADMIN' ? (
                    <Route path="/admin" element={<Admin />} />
                ) : (
                    <>
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/item" element={<Item />} />
                        <Route path="/foodlist" element={<FoodList />} />
                        <Route path="/addrestaurant" element={<AddRestaurant />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/cartdetails" element={<CartDetails />} />
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/admin" element={<Admin />} />
                    </>
                )}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            </Routes>
        </div>
    );
};

export default NavbarCom;
