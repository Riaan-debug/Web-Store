import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, setShipment, addToCart } from '../redux/cartSlice';
import { Container, Table, Button, Alert, Form } from 'react-bootstrap';
import BackToTop from '../components/BackToTop';

const shipmentOptions = [
  { label: 'Standard (3-5 days) - R50', value: 50 },
  { label: 'Express (1-2 days) - R120', value: 120 },
  { label: 'Pickup (Free)', value: 0 },
];

const shippingStages = [
  'Order Placed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

const CartPage = () => {
  const cart = useSelector(state => state.cart.items);
  const shipment = useSelector(state => state.cart.shipment);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [checkedOut, setCheckedOut] = React.useState(false);
  const [shippingStage, setShippingStage] = React.useState(0);
  const [shipmentError, setShipmentError] = React.useState(false);
  const [paymentOption, setPaymentOption] = React.useState('');
  const [paymentError, setPaymentError] = React.useState(false);
  const [creditDetails, setCreditDetails] = React.useState({ card: '', expiry: '', cvv: '' });
  const [eftDetails, setEftDetails] = React.useState({ holder: '', bank: '', reference: '' });
  const [detailsError, setDetailsError] = React.useState('');

  // Group cart items by product id for quantity control
  const groupedCart = Object.values(cart.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 1, cartItemIds: [item.cartItemId] };
    } else {
      acc[item.id].quantity += 1;
      acc[item.id].cartItemIds.push(item.cartItemId);
    }
    return acc;
  }, {}));

  const total = groupedCart.reduce((sum, item) => sum + item.price * item.quantity, 0) + (shipment ? Number(shipment) : 0);

  const handleRemove = (productId) => {
    cart.filter(item => item.id === productId).forEach(item => dispatch(removeFromCart(item.cartItemId)));
  };

  const handleDecrease = (productId) => {
    const itemToRemove = cart.find(item => item.id === productId);
    if (itemToRemove) dispatch(removeFromCart(itemToRemove.cartItemId));
  };

  const handleIncrease = (product) => {
    dispatch(addToCart({ ...product, cartItemId: `${product.id}-${Date.now()}` }));
  };

  const handleShipmentChange = (e) => {
    dispatch(setShipment(e.target.value));
  };

  const handleCheckout = () => {
    if (!shipment) {
      setShipmentError(true);
      return;
    }
    if (!paymentOption) {
      setPaymentError(true);
      return;
    }
    if (paymentOption === 'credit') {
      if (!creditDetails.card || !creditDetails.expiry || !creditDetails.cvv) {
        setDetailsError('Please fill in all credit card details.');
        return;
      }
    }
    if (paymentOption === 'eft') {
      if (!eftDetails.holder || !eftDetails.bank || !eftDetails.reference) {
        setDetailsError('Please fill in all EFT details.');
        return;
      }
    }
    setDetailsError('');
    setPaymentError(false);
    setShipmentError(false);
    setCheckedOut(true);
    dispatch(clearCart());
    setShippingStage(1);
  };

  React.useEffect(() => {
    if (checkedOut && shippingStage === 0) {
      const timer = setTimeout(() => {
        setShippingStage(1);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [checkedOut, shippingStage]);

  const isLoggedIn = !!user;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0f7fa 0%, #fff 100%)' }}>
      <Container style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontWeight: 700 }}>Your Cart</h1>
          <p style={{ fontSize: '1.1rem', color: '#333' }}>Review your selected fitness gear and complete your order below.</p>
        </div>
        {!isLoggedIn && <Alert variant="warning">Please log in to add, remove, or update items in your cart.</Alert>}
        {shipmentError && (
          <Alert variant="danger" onClose={() => setShipmentError(false)} dismissible>
            Please select a shipment option before checking out. See our <a href="/help">shipping details</a> for more info.
          </Alert>
        )}
        {paymentError && (
          <Alert variant="danger" onClose={() => setPaymentError(false)} dismissible>
            Please select a payment option before checking out.
          </Alert>
        )}
        {detailsError && (
          <Alert variant="danger" onClose={() => setDetailsError('')} dismissible>
            {detailsError}
          </Alert>
        )}
        {checkedOut && shippingStage <= 1 && (
          <div style={{ marginBottom: 24 }}>
            <Alert variant={shippingStage === 1 ? 'success' : 'info'}>
              {shippingStage === 0
                ? 'Shipping progress: Order placed!'
                : 'Shipping progress: Processing...'}
            </Alert>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
              {shippingStages.map((stage, idx) => (
                <div key={stage} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: idx <= 1 && idx <= shippingStage ? '#198754' : '#dee2e6',
                      color: idx <= 1 && idx <= shippingStage ? 'white' : '#6c757d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      fontWeight: 'bold',
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>{stage}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {groupedCart.length === 0 && !checkedOut ? (
          <Alert variant="info">Your cart is empty.</Alert>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Price (R)</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {groupedCart.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>
                      <Button size="sm" variant="secondary" onClick={() => handleDecrease(item.id)} disabled={item.quantity === 1 || !isLoggedIn}>-</Button>
                      <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                      <Button size="sm" variant="secondary" onClick={() => handleIncrease(item)} disabled={!isLoggedIn}>+</Button>
                    </td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)} disabled={!isLoggedIn}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Form.Group className="mb-3" style={{ maxWidth: 300 }}>
              <Form.Label>Shipment Option</Form.Label>
              <Form.Select value={shipment || ''} onChange={handleShipmentChange} disabled={!isLoggedIn}>
                <option value="">Select shipment</option>
                {shipmentOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" style={{ maxWidth: 300 }}>
              <Form.Label>Payment Option</Form.Label>
              <div>
                {[{label: 'Credit Card', value: 'credit'}, {label: 'EFT', value: 'eft'}, {label: 'Pay on Delivery', value: 'cod'}].map(opt => (
                  <label
                    key={opt.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 10,
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: paymentOption === opt.value ? '2px solid #198754' : '1px solid #ccc',
                      background: paymentOption === opt.value ? '#e6f9f0' : '#fff',
                      fontWeight: paymentOption === opt.value ? 600 : 400,
                      cursor: isLoggedIn ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentOption"
                      value={opt.value}
                      checked={paymentOption === opt.value}
                      onChange={e => setPaymentOption(e.target.value)}
                      disabled={!isLoggedIn}
                      style={{ accentColor: '#198754', width: 18, height: 18 }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              {paymentOption === 'credit' && (
                <div style={{ marginTop: 10, background: '#f8f9fa', padding: 12, borderRadius: 8, border: '1px solid #ccc' }}>
                  <Form.Group className="mb-2">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={creditDetails.card}
                      onChange={e => setCreditDetails({ ...creditDetails, card: e.target.value })}
                      maxLength={19}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="MM/YY"
                      value={creditDetails.expiry}
                      onChange={e => setCreditDetails({ ...creditDetails, expiry: e.target.value })}
                      maxLength={5}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="123"
                      value={creditDetails.cvv}
                      onChange={e => setCreditDetails({ ...creditDetails, cvv: e.target.value })}
                      maxLength={4}
                    />
                  </Form.Group>
                </div>
              )}
              {paymentOption === 'eft' && (
                <div style={{ marginTop: 10, background: '#f8f9fa', padding: 12, borderRadius: 8, border: '1px solid #ccc' }}>
                  <Form.Group className="mb-2">
                    <Form.Label>Account Holder</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Account Holder Name"
                      value={eftDetails.holder}
                      onChange={e => setEftDetails({ ...eftDetails, holder: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Bank</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Bank Name"
                      value={eftDetails.bank}
                      onChange={e => setEftDetails({ ...eftDetails, bank: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Reference</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Reference"
                      value={eftDetails.reference}
                      onChange={e => setEftDetails({ ...eftDetails, reference: e.target.value })}
                    />
                  </Form.Group>
                </div>
              )}
            </Form.Group>
            <h4>Total: R {total}</h4>
            <Button variant="success" onClick={handleCheckout} disabled={groupedCart.length === 0 || !isLoggedIn}>
              Checkout
            </Button>
          </>
        )}
        <div style={{ height: 70 }} />
      </Container>
      <BackToTop />
    </div>
  );
};

export default CartPage; 