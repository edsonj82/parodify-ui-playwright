import { test, expect } from '@playwright/test';
import songs from '../fixtures/songs.json';


test('it should validate user player', async ({ page }) => {

  const MOCK_SONG = songs[0];

  await page.route('**/songs', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([MOCK_SONG])
  }));

  await page.goto('/');

  const loggedUser = page.locator('.logged-user');
  await expect(loggedUser).toHaveText('Fernando Papito'); // Expect the music player to be visible.

});

test('it should display a music player', async ({ page }) => {
  const MOCK_SONG = songs[1];

  await page.route('**/songs', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([MOCK_SONG])
  }));

  await page.goto('/');

  // const loggedUser = page.locator('.logged-user');
  // await expect(loggedUser).toHaveText('Fernando Papito');  

  const songCard = page.locator('.song')
    .filter({ hasText: MOCK_SONG.title });

  const play = songCard.locator('.play')
  const pause = songCard.locator('.pause')

  await play.click();  // Click the play button on the song card.
  await expect(pause).toBeVisible();  // Expect the pause button to be visible after clicking play.
  // await expect(play).toBeVisible();  // Expect the play button to be visible again after some time (indicating the song has finished playing). 
  await expect(play).toBeHidden();  // Expect the play button to be hidden after clicking play.
  // await page.click('//div[contains(@class, "song")]//h6[text()="Bughium"]/..//button');
});

test('it should a stop music player', async ({ page }) => {
  const MOCK_SONG = songs[2];

  await page.route('**/songs', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([MOCK_SONG])
  }));

  await page.goto('/');

  // const loggedUser = page.locator('.logged-user');
  // await expect(loggedUser).toHaveText('Fernando Papito');  

  const songCard = page.locator('.song')
    .filter({ hasText: MOCK_SONG.title });

  const play = songCard.locator('.play')
  const pause = songCard.locator('.pause')

  // await expect(play).toBeVisible();
  // await expect(pause).toBeHidden();

  await play.click();
  await pause.click();

  await expect(play).toBeVisible();
  await expect(pause).toBeHidden();
});

test('it should display the current song title', async ({ page }) => {
  const MOCK_SONG = songs[3];

  await page.route('**/songs', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([MOCK_SONG])
  }));
  await page.goto('/');

  const songCard = page.locator('.song')
    .filter({ hasText: MOCK_SONG.title });

  const play = songCard.locator('.play')
  await play.click();

  const currentSongTitle = page.getByRole('heading', { name: MOCK_SONG.title }).nth(1); // const currentSongTitle = page.locator(`//div[contains(@class,"song")]//h6[text()="${MOCK_SONG.title}"]`);
  await expect(currentSongTitle).toBeVisible()
});

test('it should display the current song artist', async ({ page }) => {
  const MOCK_SONG = songs[4];

  await page.route('**/songs', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([MOCK_SONG])
  }));
  await page.goto('/');

  const songCard = page.locator('.song')
    .filter({ hasText: MOCK_SONG.title });

  const play = songCard.locator('.play')
  await play.click();

  const currentSongArtist = page.getByText(MOCK_SONG.artist).last(); // const currentSongArtist = page.locator(`//div[contains(@class,"song")]//p[text()="${song.artist}"]`);
  await expect(currentSongArtist).toBeVisible();
});

test('it should display the current song image', async ({ page }) => {
  const MOCK_SONG = songs[5];

  await page.route('**/songs', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([MOCK_SONG])
  }));
  await page.goto('/');

  const songCard = page.locator('.song')
    .filter({ hasText: MOCK_SONG.title });

  const play = songCard.locator('.play')
  await play.click();

  const currentSongImage = page.locator(`//div[contains(@class,"song")]//img[@src="${MOCK_SONG.image}"]`);
  await expect(currentSongImage).toBeVisible();
});

test('it should display the current song description', async ({ page }) => {
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

  const songCard = page.locator('.song')
    .filter({ hasText: song.title });

  const play = songCard.locator('.play')
  await play.click();

  const currentSongDescription = page.locator(`//div[contains(@class,"song")]//p[text()="${song.description}"]`);
  await expect(currentSongDescription).toBeVisible();
});

test('it should render the correct song album cover', async ({ page }) => {
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

  const songCard = page.locator('.song')
    .filter({ hasText: song.title });

  const play = songCard.locator('.play')
  await play.click();

  const songCover = songCard.locator('img');
  await expect(songCover).toHaveAttribute('src', song.image);
});

