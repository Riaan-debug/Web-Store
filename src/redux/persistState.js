const USER_KEY = 'fitnessStore_user';
const CART_KEY = 'fitnessStore_cart';

export const loadUser = () => {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const loadCart = () => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : { items: [], shipment: null };
  } catch {
    return { items: [], shipment: null };
  }
};

export const setupPersistence = (store) => {
  store.subscribe(() => {
    const { user, cart } = store.getState();

    if (user.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user.user));
    } else {
      localStorage.removeItem(USER_KEY);
    }

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({ items: cart.items, shipment: cart.shipment })
    );
  });
};
