import React from 'react';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ProductCard = ({ product, onAddToCart }) => {
  const user = useSelector(state => state.user.user);
  const isLoggedIn = !!user;

  return (
    <Card style={{ width: '18rem', margin: '1rem', minHeight: 420, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ width: '100%', height: 180, background: '#fff', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', objectPosition: 'center', background: '#fff' }}
        />
      </div>
      <Card.Body style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text><b>R {product.price}</b></Card.Text>
        <OverlayTrigger
          placement="top"
          overlay={
            !isLoggedIn ? (
              <Tooltip id={`tooltip-${product.id}`}>Please log in or register to add to cart</Tooltip>
            ) : <></>
          }
        >
          <span className="d-inline-block">
            <Button
              variant="success"
              onClick={() => onAddToCart(product)}
              disabled={!isLoggedIn}
              style={!isLoggedIn ? { pointerEvents: 'none' } : {}}
            >
              Add to Cart
            </Button>
          </span>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
};

export default ProductCard; 