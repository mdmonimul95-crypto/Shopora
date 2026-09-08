export type CartItem = {
  id: string;
  name: string;
  image: string | null;
  price: number;
  quantity: number;
  inStock: boolean;
};

export const addToCart = (item: CartItem) => {
  const savedCart = localStorage.getItem("shopora-cart");

  const cart: CartItem[] = savedCart
    ? JSON.parse(savedCart)
    : [];

  const existingItem = cart.find(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  localStorage.setItem(
    "shopora-cart",
    JSON.stringify(cart)
  );
};

export const getCart = (): CartItem[] => {
  const savedCart = localStorage.getItem("shopora-cart");

  if (!savedCart) return [];

  return JSON.parse(savedCart);
};