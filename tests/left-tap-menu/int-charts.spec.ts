import { test, expect } from '@playwright/test';

test('4. 검색 모드 변경', async ({ page }) => {
  await page.goto('/iho/main.do');
  await page.getByRole('button', { name: 'Detail Search' }).click();

  const searchPopup = page
    .locator('div')
    .filter({ hasText: 'INT Charts0 ENCs0 S-100' })
    .nth(2);

  await expect(
    searchPopup.getByRole('link', { name: 'Coordinate' }),
  ).toBeVisible();
  await searchPopup.getByRole('link', { name: 'Coordinate' }).click();
  await expect(searchPopup.getByRole('link', { name: 'Filter' })).toBeVisible();
  await searchPopup.getByRole('link', { name: 'Filter' }).click();
  await expect(
    searchPopup.getByRole('link', { name: 'Coordinate' }),
  ).toBeVisible();
});

type ChartScales =
  | 'Overview'
  | 'General'
  | 'Coastal'
  | 'Approach'
  | 'Harbour'
  | 'Berthing'
  | 'All';

type ChartScalesColors = {
  before: string;
  after: string;
};

const chartScales: ChartScales[] = [
  'Overview',
  'General',
  'Coastal',
  'Approach',
  'Harbour',
  'Berthing',
];

const buttonColors: Record<ChartScales, ChartScalesColors> = {
  Overview: {
    before: 'rgb(223, 223, 223)',
    after: 'rgb(173, 241, 165)',
  },
  General: {
    before: 'rgb(223, 223, 223)',
    after: 'rgb(138, 228, 129)',
  },
  Coastal: {
    before: 'rgb(223, 223, 223)',
    after: 'rgb(103, 212, 93)',
  },
  Approach: {
    before: 'rgb(223, 223, 223)',
    after: 'rgb(71, 194, 57)',
  },
  Harbour: {
    before: 'rgb(223, 223, 223)',
    after: 'rgb(39, 168, 26)',
  },
  Berthing: {
    before: 'rgb(223, 223, 223)',
    after: 'rgb(19, 138, 5)',
  },
  All: {
    before: 'rgb(135,135,135)',
    after: 'rgb(7, 179, 255)',
  },
};

test('5-1. Filter: 축척(Chart Scale) 옵션 선택 기능 - 단일', async ({
  page,
}) => {
  await page.goto('/iho/main.do');
  await page.getByRole('button', { name: 'Detail Search' }).click();

  const searchPopup = page
    .locator('div')
    .filter({ hasText: 'INT Charts0 ENCs0 S-100' })
    .nth(2);

  const map = page.locator('#Map');

  // 2. 반복문을 통한 동일 로직 수행
  for (const scaleName of chartScales) {
    // test.step을 사용하면 리포트에서 "Overview 단계", "General 단계"로 구분되어 보여서 디버깅이 편합니다.
    await test.step(`축척 옵션 선택 확인: ${scaleName}`, async () => {
      const testButton = searchPopup.getByRole('button', { name: scaleName });

      // [클릭 전] 색상 검증
      const beforeColor = await testButton.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor,
      );
      expect(beforeColor).toBe(buttonColors[scaleName].before);

      // 버튼 클릭
      await testButton.click();

      // [클릭 후] 색상 검증
      const afterColor = await testButton.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor,
      );
      expect(afterColor).toBe(buttonColors[scaleName].after);

      // 스냅샷 검증 (파일명에 scaleName 활용)
      await expect(map).toHaveScreenshot(
        `int chart_chart scale_${scaleName.toLowerCase()}.png`,
        { threshold: 0.2 },
      );

      // 다음 테스트를 위해 버튼을 다시 클릭하여 해제
      await testButton.click();

      // [해제 후] 색상 검증
      const lastColor = await testButton.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor,
      );
      expect(lastColor).toBe(buttonColors[scaleName].before);
    });
  }
});

/*
test('5-2. Filter: 축척(Chart Scale) 옵션 선택 기능 - 다중', async ({ page }) => {
  await page.goto('/iho/main.do');
  await page.getByRole('button', { name: 'Detail Search' }).click();

  const searchPopup = page
    .locator('div')
    .filter({ hasText: 'INT Charts0 ENCs0 S-100' })
    .nth(2);

  const map = page.locator('#Map');

  // 2. 반복문을 통한 동일 로직 수행
  for (const scaleName of chartScales) {
    // test.step을 사용하면 리포트에서 "Overview 단계", "General 단계"로 구분되어 보여서 디버깅이 편합니다.
    await test.step(`축척 옵션 선택 확인: ${scaleName}`, async () => {
      const testButton = searchPopup.getByRole('button', { name: scaleName });

      // [클릭 전] 색상 검증
      const beforeColor = await testButton.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor,
      );
      expect(beforeColor).toBe(buttonColors[scaleName].before);

      // 버튼 클릭
      await testButton.click();

      // [클릭 후] 색상 검증
      const afterColor = await testButton.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor,
      );
      expect(afterColor).toBe(buttonColors[scaleName].after);

      // 스냅샷 검증 (파일명에 scaleName 활용)
      await expect(map).toHaveScreenshot(
        `int chart_chart scale_${scaleName.toLowerCase()}.png`,
        { threshold: 0.2 },
      );

      // 다음 테스트를 위해 버튼을 다시 클릭하여 해제
      await testButton.click();

      // [해제 후] 색상 검증
      const lastColor = await testButton.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor,
      );
      expect(lastColor).toBe(buttonColors[scaleName].before);
    });
  }
});
 */

test('5-3. Filter: 축척(Chart Scale) 옵션 선택 기능 - All', async ({
  page,
}) => {
  await page.goto('/iho/main.do');
  await page.getByRole('button', { name: 'Detail Search' }).click();

  const searchPopup = page
    .locator('div')
    .filter({ hasText: 'INT Charts0 ENCs0 S-100' })
    .nth(2);

  const map = page.locator('#Map');
  const allButton = searchPopup
    .locator('.detailSearchScaleArea > .clearfix > .fl.bt-sm-all')
    .first();

  // 1. [클릭 전] 모든 버튼(All 포함)의 초기 색상 검증
  await test.step('클릭 전 초기 색상 검증', async () => {
    // 모든 축척 버튼 검증
    for (const scale of chartScales) {
      const btn = searchPopup.getByRole('button', { name: scale });
      const color = await btn.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor,
      );
      expect(color).toBe(buttonColors[scale].before);
    }
  });

  // 2. All 버튼 클릭
  await allButton.click();

  // 3. [클릭 후] 모든 버튼(All 포함)의 활성화 색상 검증
  await test.step('All 클릭 후 모든 버튼 활성화 검증', async () => {
    // 모든 축척 버튼들이 각자의 after 색상으로 변했는지 확인
    for (const scale of chartScales) {
      const btn = searchPopup.getByRole('button', { name: scale });
      const color = await btn.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor,
      );
      expect(color).toBe(buttonColors[scale].after);
    }
  });

  // 4. 스냅샷 검증
  await expect(map).toHaveScreenshot(`int chart_chart scale_all.png`, {
    threshold: 0.2,
  });
});
