# playwright-ts-template

E2E 자동화 테스트 템플릿 프로젝트입니다. 예시로 INToGIS의 로그인, 지도 메인 화면, 차트 검색/필터 UI 등을 테스트합니다.

---

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Playwright 브라우저 설치

```bash
npx playwright install
```

### 3. 환경 변수 설정

`.env.example`을 복사하여 `.env` 파일을 만들고, 실제 접속 정보를 입력합니다.

```bash
cp .env.example .env
```

`.env` 파일을 열어 아래 항목을 채워주세요.

```env
BASE_URL=https://실제-사이트-주소
USER_ID=로그인_아이디
USER_PW=로그인_비밀번호
```

---

## 테스트 실행

### 전체 테스트 실행 (헤드리스)

```bash
npm test
```

### UI 모드로 실행 (테스트 탐색 및 실행)

```bash
npm run test:ui
```

### 특정 파일만 실행

```bash
npx playwright test tests/left-tap-menu/int-charts.spec.ts
```

### 특정 브라우저만 실행

```bash
npx playwright test --project=chromium
```

### 마지막 테스트 결과 HTML 리포트 보기

```bash
npm run test:report
```

---

## 시각적 회귀 테스트 (스냅샷)

스냅샷 기반 테스트(`toHaveScreenshot`)는 기준 이미지가 로컬에 없으면 실패합니다.
처음 실행하거나 UI가 변경된 경우 아래 명령으로 기준 이미지를 생성/갱신합니다.

```bash
npm run test:snapshots
```

> 스냅샷은 브라우저와 OS별로 생성됩니다 (예: `...-chromium-win32.png`).
> `.gitignore`에 포함되어 있으므로 팀원마다 각자 생성해야 합니다.

---

## 로그인 인증 방식

테스트 실행 시 `setup` 프로젝트가 먼저 실행되어 로그인을 수행하고, 그 상태를 `playwright/.auth/user.json`에 저장합니다. 이후 모든 테스트는 이 파일을 불러와 로그인 없이 시작합니다.

- 인증 파일(`playwright/.auth/`)은 `.gitignore`에 포함되어 있으며, 테스트 실행마다 자동으로 갱신됩니다.
- 별도로 로그인 단계를 직접 실행할 필요는 없습니다.

---

## 디버깅

```bash
# Playwright Inspector와 함께 실행
npm run test:debug

# UI 모드 + Inspector 동시 사용
npm run test:debug-ui

# 테스트 코드 자동 생성 (브라우저 조작을 코드로 기록)
npm run test:codegen
```
