# 🛍️ React 쇼핑몰 애플리케이션

React와 TypeScript를 사용하여 구축된 현대적인 온라인 쇼핑몰 애플리케이션입니다.

## ✨ 주요 기능

- **상품 관리**: FakeStore API를 통한 상품 목록 및 상세 정보 표시
- **사용자 인증**: Firebase Authentication을 통한 이메일/비밀번호 로그인 및 회원가입
- **장바구니**:
  - 로그인 없이도 담기/조회 가능
  - 상품 추가/제거, 수량 조절, 총액 계산
  - 헤더에서 마우스 호버 시 미리보기(미니카트) 표시
  - 메인/상세 페이지에서 이미 담긴 상품은 버튼에 “장바구니에 담긴 제품”으로 표시
- **검색 및 필터링**: 상품명, 카테고리별 검색 및 필터링
- **알림/모달**:
  - `react-hot-toast` 기반 토스트 알림 (담기/수량 변경 등)
  - 커스텀 확인 모달(삭제/비우기), 정보 모달(주문 안내)
- **이미지 최적화**: IntersectionObserver 기반 Lazy Image + 스켈레톤
- **반응형 디자인**: 모바일과 데스크톱에서 최적화된 사용자 경험

## 🛠️ 기술 스택

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Authentication**: Firebase
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **UX 보조**: react-hot-toast, 커스텀 Dialog 컴포넌트

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Loading/        # 로딩 컴포넌트
│   ├── ErrorMessage/   # 에러 메시지 컴포넌트
│   ├── ProductCard/    # 상품 카드 컴포넌트
│   ├── LazyImage/      # 이미지 지연 로딩 컴포넌트
│   ├── ConfirmDialog/  # 확인 모달
│   └── InfoDialog/     # 정보 모달(주문 안내 등)
├── pages/              # 페이지 컴포넌트
│   ├── HomePage/       # 홈페이지 (상품 목록)
│   ├── ProductDetailPage/ # 상품 상세 페이지
│   ├── CartPage/       # 장바구니 페이지
│   ├── LoginPage/      # 로그인 페이지
│   └── RegisterPage/   # 회원가입 페이지
├── layout/             # 레이아웃 컴포넌트
│   ├── Navbar/         # 네비게이션 바 (미니카트 프리뷰 포함)
│   └── Footer/         # 푸터 (로그인 상태에 따른 빠른 링크)
├── store/              # Redux 상태 관리
│   ├── slices/         # Redux 슬라이스
│   │   ├── authSlice.ts    # 인증 상태 관리
│   │   ├── productSlice.ts # 상품 상태 관리
│   │   └── cartSlice.ts    # 장바구니 상태 관리
│   ├── hooks.ts        # Redux 훅
│   └── index.ts        # 스토어 설정
├── services/           # API 서비스
│   ├── api.ts          # FakeStore API 연동
│   ├── auth.ts         # Firebase 인증 서비스
│   └── firebase.ts     # Firebase 설정
├── types/              # TypeScript 타입 정의
│   └── index.ts        # 공통 타입 정의
└── utils/              # 유틸리티 함수
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone <repository-url>
   cd react_shop
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **Firebase 설정**
   - Firebase 콘솔에서 새 프로젝트 생성
   - Authentication 서비스 활성화
   - `env.example` 파일을 `.env`로 복사하고 Firebase 설정 정보 입력
   ```bash
   cp env.example .env
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   ```

5. **브라우저에서 확인**
   - `http://localhost:5173`

### 빌드/미리보기

```bash
npm run build
npm run preview
```

## 🔧 환경 변수 설정

`.env` 파일에 다음 Firebase 설정을 추가하세요:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📱 주요 페이지 & UX

### 🏠 홈페이지 (`/`)
- 상품 목록 그리드 뷰
- 카테고리별 필터링, 검색
- 카드에서 즉시 담기 + 토스트, 이미 담긴 상품은 버튼이 회색 “장바구니에 담긴 제품”으로 표시

### 📦 상품 상세 페이지 (`/product/:id`)
- 상세 정보, 수량 선택, 담기/장바구니로 이동
- 담기 시 토스트, 이미 담긴 경우 버튼 레이블 변경

### 🛒 장바구니 페이지 (`/cart`)
- 목록/수량 조절/삭제/총액/주문 요약
- “장바구니 비우기”, “상품 제거”는 확인 모달로 안전하게 처리
- “주문하기”는 정보 모달(향후 구현 예정, 확인 시 장바구니 자동 비움)

### 🔐 로그인/회원가입
- Firebase 이메일/비밀번호 인증

## 🔄 상태 관리

- **authSlice**: 사용자 인증 상태
- **productSlice**: 상품 데이터/필터
- **cartSlice**: 장바구니(담기/삭제/수량/총액)

주요 Thunk/Action:
- `fetchProducts()`
- `addToCart(product)`
- `loginUser(credentials)`, `registerUser(userData)`

## 🎨 스타일링

- Tailwind CSS + 반응형
- 미니카트 드롭다운(hover), 라인 클램프를 통한 카드 타이틀 정렬

## 🧪 테스트/품질(권장)

```bash
npm run lint
npm run type-check
```

## 📦 배포(예시)

- Vercel/Netlify 등 정적 호스팅 서비스 권장

## 변경 이력(요약)
- LazyImage 도입 및 스켈레톤/IntersectionObserver 적용
- react-hot-toast 알림 추가 및 전역 `Toaster` 설정
- 장바구니 모달(확인/정보) 추가: 비우기/삭제 확인, 주문 안내
- 헤더 미니카트 프리뷰 추가
- 푸터 빠른 링크: 로그인 상태에 따라 로그인/로그아웃 토글
- 메인/상세 카드 버튼: 담김 여부에 따라 레이블 변경
