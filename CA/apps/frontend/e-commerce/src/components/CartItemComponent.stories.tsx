import type { Meta, StoryObj } from '@storybook/react';
import CartItemComponent from './CartItemComponent';
import { CartContext } from '../context/CartContext';
import type { ReactNode } from 'react';
import type { CartItem } from '../types';
import type { Decorator } from '@storybook/react';

// 🎯 Mocks simples
const mockDeleteItem = (item: CartItem) => alert(`Eliminar: ${item.name}`);
const mockUpdateQuantity = (id: number, quantity: number) =>
  alert(`Actualizar ID ${id} a cantidad ${quantity}`);

// 🧪 Mock Provider personalizado
const MockCartProvider = ({ children }: { children: ReactNode }) => (
  <CartContext.Provider
    value={{
      items: [],
      addItem: () => {},
      deleteItem: mockDeleteItem,
      updateItemQuantity: mockUpdateQuantity,
    }}
  >
    {children}
  </CartContext.Provider>
);


const withMockCartProvider: Decorator = (Story) => (
  <MockCartProvider>
    {Story()}
  </MockCartProvider>
);

const meta: Meta<typeof CartItemComponent> = {
  component: CartItemComponent,
  title: 'Ecommerce/CartItemComponent',
  decorators: [withMockCartProvider],
  args: {
    item: {
      id: 1,
      name: 'Zapatilla running',
      price: 120,
      quantity: 2,
    },
  },
};

export default meta;
type Story = StoryObj<typeof CartItemComponent>;


export const Default: Story = {};
