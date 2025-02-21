import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const GPACalculator = () => {
  const [creditHours, setCreditHours] = useState('');
  const [qualityPoints, setQualityPoints] = useState('');
  const [gpa, setGPA] = useState(null);
  const [message, setMessage] = useState('');

  const handleCalculateGPA = (e) => {
    e.preventDefault();

    if (creditHours && qualityPoints) {
      // Calculating GPA on a 4.0 scale
      const calculatedGPA = parseFloat(qualityPoints) / parseFloat(creditHours);
      setGPA(calculatedGPA);

      if (calculatedGPA >= 3.0) {
        setMessage('Your GPA is satisfactory!');
      } else {
        setMessage('You need to improve your GPA.');
      }
    } else {
      setMessage('Please enter valid values for Credit Hours and Quality Points.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className="p-4 shadow-lg rounded-lg bg-light">
          <h3 className="text-center mb-4">GPA Calculator</h3>
          <Form onSubmit={handleCalculateGPA}>
            <Form.Group controlId="creditHours">
              <Form.Label>Credit Hours</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Credit Hours"
                value={creditHours}
                onChange={(e) => setCreditHours(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="qualityPoints" className="mt-3">
              <Form.Label>Quality Points</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Quality Points"
                value={qualityPoints}
                onChange={(e) => setQualityPoints(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Calculate GPA
            </Button>
          </Form>

          {gpa !== null && (
            <div className="mt-4 text-center">
              <h4>Your GPA: {gpa.toFixed(2)}</h4>
              <Alert variant={gpa >= 3.0 ? 'success' : 'danger'}>{message}</Alert>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GPACalculator;
