// import { expect, test } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import '@testing-library/jest-dom';

import * as DemoStories from './demo.stories';

const { BaseHanoverEfoLibraryDisplayToggle } = composeStories(DemoStories);

test('renders HanoverEfoLibraryDisplayToggle', async () => {
  render(<BaseHanoverEfoLibraryDisplayToggle />);
  expect(await screen.findByText('Boolean caption')).toBeVisible();
  expect(await screen.findByText('Boolean label')).toBeVisible();
  expect(await screen.findByText('Test helper text')).toBeVisible();
  const toggleElement = screen.queryByRole('switch') || screen.getByRole('checkbox');
  expect(toggleElement).toBeChecked();
  fireEvent.click(toggleElement);
  expect(toggleElement).not.toBeChecked();
});
