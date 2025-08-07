import type { Meta, StoryObj } from '@storybook/react';
import CartItemComponent from './CartItemComponent';
import { BrowserRouter } from 'react-router-dom';

const items = [
  {
    id: 1,
    name: 'Remera básica',
    price: 25.0,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Jean azul',
    price: 50.0,
    quantity: 1,
  },
];

const CartMock = () => (
  <BrowserRouter>
    <div className="cart-container">
      <h2>Tu carrito</h2>
      <span>{items.length} producto(s)</span>
      {items.map((item) => (
        <div key={item.id}>
          <CartItemComponent item={item} />
        </div>
      ))}
      <div>
        <a className="cart-checkout-button" href="/checkout">
          Proceder con el pago
        </a>
      </div>
    </div>
  </BrowserRouter>
);

const meta: Meta<typeof CartMock> = {
  component: CartMock,
  title: 'Ecommerce/Cart',
};

export default meta;
type Story = StoryObj<typeof CartMock>;

export const Default: Story = {};
