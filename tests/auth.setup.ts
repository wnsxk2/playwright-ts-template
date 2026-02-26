import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // 1. 로그인 페이지 접속
  await page.goto('/iho/login.do');

  const userId = process.env.USER_ID;
  const userPw = process.env.USER_PW;

  if (!userId || !userPw) {
    throw new Error('.env에 로그인 정보가 없음');
  }

  // 2. 아이디와 비밀번호 입력 후 로그인 버튼 클릭
  await page.getByRole('textbox', { name: 'User Name' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill(userId);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(userPw);
  await page.getByRole('button', { name: 'Login' }).click();

  // ✨ 핵심 수정 부분: 주소창에 'main.do'가 포함될 때까지 기다립니다.
  // 주소 전체를 적어도 되고, 핵심 키워드인 'main.do'만 포함되는지 확인할 수도 있습니다.
  await page.waitForURL('/iho/main.do');

  // (선택 사항) 확실히 하기 위해 주소가 정확히 일치하는지 한 번 더 검사합니다.
  await expect(page).toHaveURL(/.*main\.do/);

  // 4. 지금 이 '로그인된 상태'를 파일로 저장!
  await page.context().storageState({ path: authFile });
});
