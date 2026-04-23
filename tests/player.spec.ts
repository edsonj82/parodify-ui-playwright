import { test, expect } from '@playwright/test';

test('it should play a song', async ({ page }) => {

  const song = {
    title: 'Bughium'
  };

  await page.goto('/');

  // Expect a title "to contain" a substring.
  const loggedUser = page.locator('.logged-user');
  await expect(loggedUser).toHaveText('Fernando Papito');

  const songCard = page.locator('.song').filter({ hasText: song.title })

  const play = songCard.locator('.play')
  const pause = songCard.locator('.pause')

  await play.click()
  await expect(pause).toBeVisible({ timeout: 5000 })


  // await page.click(`//div[contains(@class,"song")]//h6[text()="${song.title}"]/..//button`)
  // await page.waitForTimeout(5000);
});