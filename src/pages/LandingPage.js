import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BackToTop from '../components/BackToTop';

const features = [
  { icon: '💪', title: 'Quality Gear', desc: 'Top brands and durable equipment.' },
  { icon: '🚚', title: 'Fast Delivery', desc: 'Get your order quickly, anywhere in SA.' },
  { icon: '🔄', title: 'Easy Returns', desc: 'Hassle-free returns within 30 days.' },
];

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0f7fa 0%, #fff 100%)' }}>
      <Container style={{ paddingTop: 60, textAlign: 'center', paddingBottom: 80 }}>
        <h1 style={{ fontWeight: 700, fontSize: '2.8rem' }}>Welcome to the Fitness Gear Web Store!</h1>
        <div style={{ fontSize: '1.2rem', margin: '16px 0 32px' }}>
          Your journey to a healthier you starts here. Discover top-quality fitness equipment and accessories to power your workouts and healthy lifestyle.
        </div>
        <Button as={Link} to="/store" variant="success" size="lg" style={{ marginBottom: 40 }}>
          Shop Now
        </Button>
        <Row className="justify-content-center" style={{ marginBottom: 40 }}>
          {features.map(f => (
            <Col key={f.title} xs={12} md={4} style={{ marginBottom: 20 }}>
              <Card style={{ border: 'none', background: 'rgba(255,255,255,0.95)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <Card.Body>
                  <div style={{ fontSize: 40 }}>{f.icon}</div>
                  <Card.Title style={{ marginTop: 10 }}>{f.title}</Card.Title>
                  <Card.Text>{f.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Card style={{ maxWidth: 500, margin: '0 auto', background: '#fffbe7', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>“I love the quality and service! My fitness journey has never been easier.”</p>
              <footer className="blockquote-footer">Happy Customer</footer>
            </blockquote>
          </Card.Body>
        </Card>
      </Container>
      <div style={{ height: 70 }} />
      <BackToTop />
    </div>
  );
};

export default LandingPage; 