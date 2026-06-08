import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { addToCart } from '../redux/cartSlice';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';

const StorePage = () => {
  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch();
  const [added, setAdded] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, cartItemId: `${product.id}-${Date.now()}` }));
    setAdded(product.name);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setAdded(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0f7fa 0%, #fff 100%)' }}>
      <Container style={{ paddingTop: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontWeight: 700 }}>Shop Fitness Gear</h1>
          <p style={{ fontSize: '1.1rem', color: '#333' }}>Browse our curated selection of quality fitness equipment and accessories.</p>
        </div>
        <Row>
          {products.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </Col>
          ))}
        </Row>
        <div style={{ height: 90 }} />
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Added to Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {added && <span><b>{added}</b> has been added to your cart!</span>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
              Continue Shopping
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default StorePage; 