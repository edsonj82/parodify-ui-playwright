import { test, expect } from '@playwright/test';

test('it should play a song', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  const loggedUser = page.locator('.logged-user');
  await expect(loggedUser).toHaveText('Fernando Papito');
});
