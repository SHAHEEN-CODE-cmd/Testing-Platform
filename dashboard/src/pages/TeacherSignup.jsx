import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { createTeacher } from "../services/api.js";

export default function TeacherSignup({ onSignup }) {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createTeacher(formData);
    onSignup(res.data);
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4 border-0 rounded-3">
        <h2 className="text-center mb-4">👩‍🏫 Teacher Signup</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter your name" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">🚀 Signup</Button>
        </Form>
      </Card>
    </Container>
  );
}
