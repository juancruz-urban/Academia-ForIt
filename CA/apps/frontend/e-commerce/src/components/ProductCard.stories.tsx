import type { Meta, StoryObj } from '@storybook/react';

type ProductCardProps = {
  name: string;
  price: number;
  onAdd: () => void;
};

const ProductCard = ({ name, price, onAdd }: ProductCardProps) => (
  <div style={{ border: '1px solid #e5e7eb', padding: 16, borderRadius: 8, maxWidth: 220 }}>
    <h3 style={{ fontSize: '1.1rem' }}>{name}</h3>
    <p style={{ color: '#4b5563' }}>${price}</p>
    <button onClick={onAdd} style={{ marginTop: 8 }}>Agregar al carrito</button>
  </div>
);

const meta: Meta<typeof ProductCard> = {
  component: ProductCard,
  title: 'Ecommerce/ProductCard',
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    name: 'Producto ejemplo',
    price: 199.99,
    onAdd: () => alert('Agregado!'),
  },
};
