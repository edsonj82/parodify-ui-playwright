import { test, expect } from '@playwright/test';

test('it should play a song', async ({ page }) => {

  const song = {
    id: 1,
    title: "Smells Likke Test Script",
    artist: "Nullvana",
    description: "Nullvana",
    image: "https://raw.githubusercontent.com/qaxperience/mock/main/covers/nevertesting.jpg",
    type: "album",
    src: "https://raw.githubusercontent.com/qaxperience/mock/main/songs/nirvana.mp3"
  };

  await page.route('**/songs', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([song])
  }));

  await page.goto('/');

  // Expect a title "to contain" a substring.
  const loggedUser = page.locator('.logged-user');
  await expect(loggedUser).toHaveText('Fernando Papito');

  const songCard = page.locator('.song').filter({ hasText: song.title })

  const play = songCard.locator('.play')
  const pause = songCard.locator('.pause')

  await play.click()
  await expect(pause).toBeVisible({ timeout: 5000 })
  await expect(play).toBeVisible({ timeout: 7000 })


  // await page.click(`//div[contains(@class,"song")]//h6[text()="${song.title}"]/..//button`)
  // await page.waitForTimeout(5000);
});

test('it should pause a song', async ({ page }) => {
  const song = {
    id: 1,
    title: "Smells Likke Test Script",
    artist: "Nullvana",
    description: "Nullvana",
    image: "https://raw.githubusercontent.com/qaxperience/mock/main/covers/nevertesting.jpg",
    type: "album",
    src: "https://raw.githubusercontent.com/qaxperience/mock/main/songs/nirvana.mp3"
  };

  await page.route('**/songs', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([song])
  }));

  await page.goto('/');

  const songCard = page.locator('.song').filter({ hasText: song.title })
  const play = songCard.locator('.play')
  const pause = songCard.locator('.pause')
  
  await play.click()
  await expect(pause).toBeVisible({ timeout: 5000 })
  await pause.click()
  await expect(play).toBeVisible({ timeout: 5000 })

  await page.waitForTimeout(5000);
  await expect(pause).not.toBeVisible()
  await expect(play).toBeVisible()
  
});


