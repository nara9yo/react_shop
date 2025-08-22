# 🛍️ React 쇼핑몰 애플리케이션

> React + TypeScript + Vite 기반의 모던 쇼핑몰 데모. Firebase 인증과 Redux Toolkit 상태 관리, Tailwind UI, Vitest 테스트를 포함합니다.

---

## 📑 목차

1. [프로젝트 소개](#-프로젝트-소개)
2. [데모/스크린샷](#-데모스크린샷)
3. [주요 기능](#-주요-기능)
4. [기술 스택](#-기술-스택)
5. [프로젝트 구조](#-프로젝트-구조)
6. [시작하기](#-시작하기)
7. [환경 변수](#-환경-변수)
8. [스크립트](#-스크립트)
9. [테스트와 품질](#-테스트와-품질)
10. [배포](#-배포)
11. [아키텍처/상태 관리](#-아키텍처상태-관리)
12. [변경 이력(요약)](#-변경-이력요약)

---

## 📘 프로젝트 소개

FakeStore API 상품 데이터를 활용한 전자상거래 데모입니다. 로그인 없이 장바구니 담기를 지원하며, Firebase 이메일/비밀번호 인증을 통해 로그인/회원가입이 가능합니다. UX는 토스트/모달, 미니카트, Lazy Image 등으로 보완했습니다.

## 🖼️ 데모/스크린샷

준비중

## ✨ 주요 기능

- 상품 목록/상세: FakeStore API 연동, 카테고리/검색
- 장바구니: 담기/삭제/수량조절/총액, 미니카트 프리뷰, 주문 요약
- 인증: Firebase 이메일/비밀번호 로그인/회원가입, 상태 유지
- 알림/모달: 토스트 알림(`react-hot-toast`), 확인/정보 모달 컴포넌트
- 최적화: IntersectionObserver 기반 Lazy Image, 레이아웃 안정화
- 스타일: Tailwind 반응형, 인디고/슬레이트 톤의 모던 팔레트

## 🛠️ 기술 스택

- Frontend: React 19, TypeScript
- Build: Vite
- State: Redux Toolkit
- Style: Tailwind CSS
- Auth: Firebase
- HTTP: Axios
- Router: React Router DOM
- Test: Vitest, Testing Library, jsdom
- DX: Cursor AI (바이브 코딩, AI 페어 프로그래밍)

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── ConfirmDialog/   # 확인 모달
│   ├── ErrorMessage/
│   ├── InfoDialog/
│   ├── LazyImage/
│   ├── Loading/
│   ├── Logo/
│   └── ProductCard/
├── hooks/
│   └── useToast.ts      # 토스트 프리셋 훅
├── layout/
│   ├── Footer/
│   └── Navbar/
├── pages/
│   ├── CartPage/
│   ├── HomePage/
│   ├── LoginPage/
│   ├── NotFoundPage/
│   ├── ProductDetailPage/
│   └── RegisterPage/
├── services/
│   ├── api.ts
│   ├── auth.ts
│   └── firebase.ts
├── store/
│   ├── hooks.ts
│   ├── index.ts
│   └── slices/
│       ├── authSlice.ts
│       ├── cartSlice.ts
│       └── productSlice.ts
├── types/
│   └── index.ts
└── utils/
    └── currency.ts      # Intl 기반 통화 포맷 유틸(기본 USD)
```

## 🚀 시작하기

### 요구사항

- Node.js 18 이상
- npm

### 설치

```bash
git clone <repository-url>
cd react_shop
npm install
```

### 개발 서버

```bash
npm run dev
```

브라우저: `http://localhost:5173`

## 🔐 환경 변수

`.env`에 Firebase 설정을 주입합니다.

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🧰 스크립트

```bash
npm run dev           # 개발 서버
npm run build         # 타입체크 + 프로덕션 빌드
npm run preview       # 로컬 미리보기
npm run lint          # ESLint 검사
npm run test          # Vitest 실행
npm run test:watch    # Vitest watch 모드
npm run test:coverage # 커버리지 리포트
```

## 🧪 테스트와 품질

- Vitest + Testing Library + jsdom 구성
- CI 타입 빌드에서 테스트 파일 제외(`tsconfig.json`의 `exclude`)로 안정적인 빌드

## 🚢 배포

- 정적 호스팅 배포(예: GitHub Pages) 지원
- Vite `base` 설정으로 서브경로 호스팅 대응(`vite.config.ts`의 `base: '/react_shop/'`)
- GitHub Actions 워크플로우로 CI/CD 자동화 구성

## 🧭 아키텍처/상태 관리

- Redux Toolkit 슬라이스: `authSlice`, `productSlice`, `cartSlice`
- 공통 유틸: `utils/currency.ts`로 통화 표기 일원화(기본 USD)
- 토스트: `hooks/useToast.ts` 프리셋으로 알림 경험 일관화

## 📝 변경 이력(요약)

- LazyImage 도입 및 스켈레톤/IntersectionObserver
- 토스트 알림 전역화(`useToast`), 미니카트 프리뷰 추가
- 장바구니 모달(확인/정보): 비우기/삭제 확인, 주문 안내
- 통화 포맷 유틸 도입(USD), 버튼 레이블/팔레트 현대화
- Vitest 테스트 추가, CI 타입 빌드에서 테스트 제외 설정

---

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!**