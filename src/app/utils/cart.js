export const handleAddToCart = (item, addToCart) => {
  if (item) {
    addToCart(item, 1);
  }
};

export const handleIncreaseQty = (itemId, cart, updateQty) => {
  const item = cart.find((item) => item.id === itemId);
  if (item) {
    updateQty(itemId, item.qty + 1);
  }
};

export const handleDecreaseQty = (itemId, cart, updateQty, removeFromCart) => {
  const item = cart.find((item) => item.id === itemId);
  if (item && item.qty > 1) {
    updateQty(itemId, item.qty - 1);
  } else if (item && item.qty === 1) {
    removeFromCart(itemId);
  }
};

export const getCartItemQty = (itemId, cart) => {
  const item = cart?.find((item) => item.id === itemId);
  return item ? item.qty : 0;
};
