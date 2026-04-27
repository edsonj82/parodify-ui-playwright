import { test, expect } from '@playwright/test';

const mockSong = () => ({
  id: 1,
  title: "Smells Like Test Script",
  artist: "Nullvana",
  description: "Nullvana",
  image: "https://raw.githubusercontent.com/qaxperience/mock/main/covers/nevertesting.jpg",
  type: "album",
  src: "https://raw.githubusercontent.com/qaxperience/mock/main/songs/nirvana.mp3"
});

async function mockSongs(page, songs) {
  await page.route('**/songs', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(songs)
    })
  );
}

test('it should play a song', async ({ page }) => {

  const song = mockSong();

  await mockSongs(page, [song]);
  await page.goto('/');

  const songCard = page.locator('.song').filter({ hasText: song.title })

  await songCard.locator('.play').click();
  // await page.waitForTimeout(5000);
  await expect(songCard.locator('.pause')).toBeVisible();

});

test('it should pause a song', async ({ page }) => {
  const song = mockSong();

  await mockSongs(page, [song]);
  await page.goto('/');

  const songCard = page.locator('.song').filter({ hasText: song.title })

  const play = songCard.locator('.play')
  const pause = songCard.locator('.pause')

  await play.click()
  // await page.waitForTimeout(5000);
  await expect(pause).toBeVisible()

  await pause.click()

  await expect(play).toBeVisible()
  await expect(pause).not.toBeVisible()
});

test('it should switch between songs', async ({ page }) => {
  const songs = [
    {
      id: 1,
      title: "Nice Bugs Finish Devs",
      artist: "Bugreen Day",
      description: "Bugreen Day",
      image: "https://raw.githubusercontent.com/qaxperience/mock/main/covers/bugreenday.jpg",
      type: "album",
      src: "https://raw.githubusercontent.com/qaxperience/mock/main/songs/punk.mp3"
    },
    {
      id: 2,
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      description: "Nirvana",
      image: "https://raw.githubusercontent.com/qaxperience/mock/main/covers/nevertesting.jpg",
      type: "album",
      src: "https://raw.githubusercontent.com/qaxperience/mock/main/songs/nirvana.mp3"
    }
  ];
  await mockSongs(page, songs);
  await page.goto('/');

  const first = page.locator('.song', { hasText: songs[0].title });
  const second = page.locator('.song', { hasText: songs[1].title });

  //toca primeira
  await first.locator('.play').click();
  await expect(first.locator('.pause')).toBeVisible();

  //toca para segunda
  await second.locator('.play').click();
  await expect(second.locator('.pause')).toBeVisible();

  // garante que a primeira voltou ao estado initial
  await expect(first.locator('.play')).toBeVisible();
  await expect(first.locator('.pause')).not.toBeVisible();
});

test('it should show the current song', async ({ page }) => {
  const song = mockSong();

  await mockSongs(page, [song])
  await page.goto('/');

  const songCard = page.locator('.song').filter({ hasText: song.title });
  songCard.locator('.play').click();

  await expect(songCard.locator('p')).toHaveText(`${song.artist}`);
  await expect(songCard.locator('h6')).toHaveText(`${song.title}`);

  // const artist = page.locator(`//div[contains(@class,"songlist")]//div[contains(@class,"song")]//p[text()="${song.artist}"]`);
  // const title = page.locator(`//div[contains(@class,"songlist")]//div[contains(@class,"song")]//h6[text()="${song.title}"]`);

  // await expect(title).toHaveText(`${song.title}`);
  // await expect(artist).toHaveText(`${song.artist}`);

  // await expect(currentSong).toHaveText(`${song.title} - ${song.artist}`);
  // await expect(currentSong).toHaveText(`${song.artist}`);
});
