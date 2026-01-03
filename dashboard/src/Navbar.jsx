import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

export default function DashboardNavbar({ teacher, onLogout }) {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand className="fw-bold text-primary">
          🎓 Teacher Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/dashboard">Home</Link>
            <Link className="nav-link" to="/create">Create Form</Link>
            <Link className="nav-link" to="/results">Results</Link>
            <Link className="nav-link" to="/teachers">Teachers</Link>
          </Nav>
          <Nav>
            <span className="me-3 fw-bold">{teacher?.name}</span>
            <Button variant="outline-danger" onClick={onLogout}>
              🔒 Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
