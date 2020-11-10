import React from "react"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"

export default function Admin_Menu_Component() {
  return (
    <div>
    <Navbar>
    <Navbar.Brand variant="primary" >ADMIN-Menu</Navbar.Brand>
      <Nav variant="tabs" >
        <Nav.Item>
          <Nav.Link  >
            <Link
              to="/confirm-borrow"
              activeClassName="is-active"
              className="navbar-item"
            >
              <span className="nav-item">Confirm</span>
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">
            <Link
              to="/add-edit-product"
              activeClassName="is-active"
              className="navbar-item"
            >
              <span className="nav-item">Add/Edit Product</span>
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled">
            <Link
              to="/add-user"
              activeClassName="is-active"
              className="navbar-item"
            >
              <span className="nav-item">Manage User</span>
            </Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      </Navbar>
    </div>
  );
}
