import { test, expect } from '@playwright/test';

test('it should display a music player', async ({ page }) => {
  const song = {
    id: 1,
    title: "Smell Like Test Script",
    artist: "Nullvana",
    description: "Nullvana",
    image: "https://raw.githubusercontent.com/qaxperience/mock/main/covers/nevertesting.jpg",
    type: "album",
    src: "https://raw.githubusercontent.com/qaxperience/mock/main/songs/nirvana.mp3"
  }
  await page.route('**/songs', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([song])
  }));

  await page.goto('/');

  const loggedUser = page.locator('.logged-user');
  await expect(loggedUser).toHaveText('Fernando Papito');  // Expect the music player to be visible.

  const songCard = page.locator('.song')
    .filter({ hasText: song.title });

  const play = songCard.locator('.play')
  const pause = songCard.locator('.pause')

  await play.click();  // Click the play button on the song card.
  await expect(pause).toBeVisible();  // Expect the pause button to be visible after clicking play.
  await expect(play).toBeVisible();  // Expect the play button to be visible again after some time (indicating the song has finished playing). 

  // await page.click('//div[contains(@class, "song")]//h6[text()="Bughium"]/..//button');

});