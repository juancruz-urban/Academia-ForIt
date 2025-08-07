import type { Meta, StoryObj } from '@storybook/react';
import { Product } from './ProductList';

const mockProduct = {
  id: 1,
  name: 'Zapatilla running',
  price: 129.99,
  category: 'Calzado',
  description: 'Zapatilla deportiva muy cómoda',
};

const meta: Meta<typeof Product> = {
  component: Product,
  title: 'Ecommerce/Product',
  args: {
    product: mockProduct,
    addProduct: () => alert('Producto agregado'),
  },
};

export default meta;
type Story = StoryObj<typeof Product>;

export const Default: Story = {};
