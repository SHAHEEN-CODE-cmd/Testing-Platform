import React, { useEffect, useState } from "react";
import { getForms, getTeachers, getFormSubmissions } from "../services/api.js";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DashboardNavbar from "../components/DashboardNavbar.jsx";

export default function TeacherDashboard({ teacher, onLogout }) {
  const [forms, setForms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getForms().then(res => setForms(res.data));
    getTeachers().then(res => setTeachers(res.data));
    if (forms.length > 0) {
      getFormSubmissions(forms[0].id).then(res => setSubmissions(res.data));
    }
  }, [forms.length]);

  return (
    <>
      <DashboardNavbar teacher={teacher} onLogout={onLogout} />
      <Container fluid>
        {/* Stats */}
        <Row className="mb-4">
          <Col md={4}><Card className="shadow text-center p-3"><h4>Total Forms</h4><h2>{forms.length}</h2></Card></Col>
          <Col md={4}><Card className="shadow text-center p-3"><h4>Total Teachers</h4><h2>{teachers.length}</h2></Card></Col>
          <Col md={4}><Card className="shadow text-center p-3"><h4>Total Submissions</h4><h2>{submissions.length}</h2></Card></Col>
        </Row>

        {/* Forms */}
        <h2 className="mb-3">📘 Forms</h2>
        <Row>
          {forms.map(f => (
            <Col md={6} lg={4} key={f.id} className="mb-4">
              <Card className="shadow-lg border-0 rounded-3 hover-card">
                <Card.Body>
                  <Card.Title className="fw-bold text-primary">{f.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">By {f.Teacher?.name}</Card.Subtitle>
                  <Card.Text>{f.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="info" size="sm">Open for Students</Button>
                    <Button variant="secondary" size="sm">View Results</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Teachers */}
        <h2 className="mt-5 mb-3">👨‍🏫 Teachers</h2>
        <Row>
          {teachers.map(t => (
            <Col md={6} lg={4} key={t.id} className="mb-3">
              <Card className="shadow border-0 rounded-3">
                <Card.Body>
                  <Card.Title className="fw-bold">{t.name}</Card.Title>
                  <Card.Subtitle className="text-muted">{t.email}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Submissions */}
        <h2 className="mt-5 mb-3">📝 Recent Submissions</h2>
        <Row>
          {submissions.map(s => (
            <Col md={6} lg={4} key={s.id} className="mb-3">
              <Card className="shadow border-0 rounded-3">
                <Card.Body>
                  <Card.Title>{s.studentName}</Card.Title>
                  <Card.Text>Score: <b>{s.score}/{s.total}</b></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
