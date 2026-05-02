import { test, expect } from '@playwright/test';

test('it should display a music player', async ({ page }) => {
  await page.goto('/');

const loggedUser =page.locator('.logged-user');

  // Expect the music player to be visible.
  await expect(loggedUser).toHaveText('Fernando Papito');
});
