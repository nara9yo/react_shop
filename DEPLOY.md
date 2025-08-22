# GitHub Pages 배포 가이드

이 문서는 본 프로젝트(React + Vite + TypeScript)를 GitHub Pages에 배포하는 절차를 정리합니다.

## 0. 사전 준비
- 기본 브랜치: `main`
- 저장소 이름: 예) `react_shop`
- Node.js 18+ / npm
- GitHub Pages 사용 권한

## 1. Vite `base` 설정 확인
Vite는 서브 경로 배포 시 `base`가 필요합니다. 저장소명이 `react_shop`이라면 아래처럼 설정합니다.

```ts
// vite.config.ts
export default defineConfig(({ mode }) => {
  // ...생략
  return {
    // ...
    base: '/react_shop/', // 저장소명과 동일
  }
})
```

- 저장소명이 다르면 `'/<repo-name>/'`로 변경하세요.
- 커스텀 도메인(CNAME) 사용 시 `base: '/'`로 두고 `public/CNAME` 파일을 추가합니다.

## 2. 환경 변수(Secrets) 설정
Firebase 환경 변수는 GitHub Secrets로 주입됩니다. 저장소 → Settings → Secrets and variables → Actions → New repository secret에서 아래 키를 생성하세요.

필수 키 목록:
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

Workflow에서 자동으로 다음과 같이 매핑됩니다.
```yaml
# .github/workflows/deploy.yml
env:
  VITE_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
  VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
  VITE_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
  VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.FIREBASE_STORAGE_BUCKET }}
  VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}
  VITE_FIREBASE_APP_ID: ${{ secrets.FIREBASE_APP_ID }}
```

## 3. GitHub Pages 설정
- 저장소 → Settings → Pages
- Build and deployment: Source를 “GitHub Actions”로 선택

## 4. 배포 워크플로우 확인
이미 아래 파일이 포함되어 있습니다.
- `.github/workflows/deploy.yml`

핵심 단계:
- `npm ci` → `npm run build`
- `actions/configure-pages@v4`
- `actions/upload-pages-artifact@v3` (dist 업로드)
- `actions/deploy-pages@v4`

## 5. SPA 라우팅 대책
- `public/404.html`과 `index.html` 내부의 SPA 라우팅 스니펫으로 새로고침 404 문제를 방지합니다.
- GitHub Pages에서 서브 경로 접속/새로고침 시 404가 나면 `404.html` 존재 여부를 확인하세요.

## 6. 배포 실행
- `main` 브랜치에 push → Actions 워크플로우 자동 실행
- 완료 후 Pages 주소: `https://<your-id>.github.io/<repo-name>/`

## 7. 로컬 확인
```bash
npm run build
npm run preview
```
- 미리보기 주소 확인 후 에셋/라우팅이 정상인지 점검하세요.

## 8. 커스텀 도메인(선택)
- `public/CNAME` 파일에 도메인 기입(예: `shop.example.com`)
- 저장소 Settings → Pages에서 Custom domain 등록
- `vite.config.ts`의 `base`를 `'/'`로 설정

## 9. 트러블슈팅
- 빈 화면/에셋 404: `vite.config.ts`의 `base`가 저장소명과 일치하는지 확인
- 빌드 시 테스트 전역(`describe/it/expect`) 오류: `tsconfig.json`의 `exclude`에 테스트 파일이 포함돼 있는지 확인
- 새 파비콘/로고가 반영 안 됨: 캐시 문제일 수 있으니 강력 새로고침(Ctrl+F5) 또는 쿼리스트링 버전링 시도
- 새로고침 404: `public/404.html`과 `index.html`의 SPA 라우팅 스크립트 확인

## 10. 참고
- GitHub Actions 파일: `.github/workflows/deploy.yml`
- Vite 설정 파일: `vite.config.ts`
- SPA 라우팅 스니펫: `index.html`
- 정적 파일: `public/`
