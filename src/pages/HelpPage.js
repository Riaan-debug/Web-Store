import React from 'react';
import { Container, Card } from 'react-bootstrap';

const HelpPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0f7fa 0%, #fff 100%)' }}>
      <Container style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontWeight: 700 }}>Help & Support</h1>
          <p style={{ fontSize: '1.1rem', color: '#333' }}>We're here to help you with shipping, returns, and any questions you may have.</p>
        </div>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Shipping Information</Card.Title>
            <div style={{ marginBottom: 0 }}>
              <ul>
                <li><b>Standard Shipping</b>: 3-5 business days (R50)</li>
                <li><b>Express Shipping</b>: 1-2 business days (R120)</li>
                <li><b>Pickup</b>: Free, collect from our store</li>
              </ul>
            </div>
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Returns & Exchanges</Card.Title>
            <Card.Text>
              If you are not satisfied with your purchase, you can return or exchange any item within 30 days of receipt. Please ensure the product is unused and in its original packaging.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Contact Support</Card.Title>
            <Card.Text>
              For any questions or assistance, please email us at <a href="mailto:support@fitnessstore.co.za">support@fitnessstore.co.za</a> or call 0800-123-456.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
      <div style={{ height: 70 }} />
    </div>
  );
};

export default HelpPage; 