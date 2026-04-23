import { test, expect } from '@playwright/test';

test('it should play a song', async ({ page }) => {

  const song = {
    title: 'Bughium'
  };

  await page.goto('/');

  // Expect a title "to contain" a substring.
  const loggedUser = page.locator('.logged-user');
  await expect(loggedUser).toHaveText('Fernando Papito');

  await page.click(`//div[contains(@class,"song")]//h6[text()="${song.title}"]/..//button`)

  await page.waitForTimeout(5000);
});