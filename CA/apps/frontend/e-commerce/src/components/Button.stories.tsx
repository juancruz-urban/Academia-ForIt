import type { Meta, StoryObj } from '@storybook/react';

type ButtonProps = {
  label: string;
  onClick?: () => void;
};

const Button = ({ label, onClick }: ButtonProps) => (
  <button onClick={onClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
    {label}
  </button>
);

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Example/Button',
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Click me!',
  },
};
