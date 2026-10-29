import { render, screen, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import '@testing-library/jest-dom';

import * as DemoStories from './demo.stories';

const { Default, Disabled } = composeStories(DemoStories);

test('renders button and updates the property on click', async () => {
  render(<Default />);
  const button = await screen.findByRole('button', { name: /Evaluate Policy/i });
  expect(button).toBeEnabled();
  expect(screen.getByText('Property value: false')).toBeVisible();
  fireEvent.click(button);
  expect(screen.getByText('Property value: true')).toBeVisible();
});

test('disabled button cannot be clicked', async () => {
  render(<Disabled />);
  const button = await screen.findByRole('button', { name: /Evaluate Policy/i });
  expect(button).toBeDisabled();
  fireEvent.click(button);
  expect(screen.getByText('Property value: false')).toBeVisible();
});
