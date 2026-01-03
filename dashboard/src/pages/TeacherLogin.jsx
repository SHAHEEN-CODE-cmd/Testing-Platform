import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";

export default function TeacherLogin({ onLogin }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ name: "Teacher", email }); // demo login
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4 border-0 rounded-3">
        <h2 className="text-center mb-4">🔑 Teacher Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">🚀 Login</Button>
        </Form>
      </Card>
    </Container>
  );
}
