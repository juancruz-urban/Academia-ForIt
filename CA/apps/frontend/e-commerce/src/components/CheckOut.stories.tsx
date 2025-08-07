import type { Meta, StoryObj, Decorator } from '@storybook/react';
import { CheckOutComponent } from './CheckOutComponent';
import { CartContext } from '../context/CartContext';
import type { ReactNode } from 'react';

const MockCartProvider = ({ children }: { children: ReactNode }) => (
  <CartContext.Provider value={{
    items: [
      { id: 1, name: 'Remera', price: 25.5, quantity: 2 },
      { id: 2, name: 'Pantalón', price: 40, quantity: 1 }
    ],
    addItem: () => {},
    deleteItem: () => {},
    updateItemQuantity: () => {}
  }}>
    {children}
  </CartContext.Provider>
);

const withCartProvider: Decorator = (Story) => (
  <MockCartProvider>
    {Story()}
  </MockCartProvider>
);

const meta: Meta<typeof CheckOutComponent> = {
  component: CheckOutComponent,
  title: 'Checkout/CheckOutComponent',
  decorators: [withCartProvider],
};

export default meta;
type Story = StoryObj<typeof CheckOutComponent>;

export const Default: Story = {};
