# 🛍️ React 쇼핑몰 애플리케이션

React와 TypeScript를 사용하여 구축된 현대적인 온라인 쇼핑몰 애플리케이션입니다.

## ✨ 주요 기능

- **상품 관리**: FakeStore API를 통한 상품 목록 및 상세 정보 표시
- **사용자 인증**: Firebase Authentication을 통한 이메일/비밀번호 로그인 및 회원가입
- **장바구니**: 상품 추가/제거, 수량 조절, 총액 계산
- **검색 및 필터링**: 상품명, 카테고리별 검색 및 필터링
- **반응형 디자인**: 모바일과 데스크톱에서 최적화된 사용자 경험

## 🛠️ 기술 스택

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Authentication**: Firebase
- **HTTP Client**: Axios
- **Routing**: React Router DOM

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Loading/        # 로딩 컴포넌트
│   ├── ErrorMessage/   # 에러 메시지 컴포넌트
│   └── ProductCard/    # 상품 카드 컴포넌트
├── pages/              # 페이지 컴포넌트
│   ├── HomePage/       # 홈페이지 (상품 목록)
│   ├── ProductDetailPage/ # 상품 상세 페이지
│   ├── CartPage/       # 장바구니 페이지
│   ├── LoginPage/      # 로그인 페이지
│   └── RegisterPage/   # 회원가입 페이지
├── layout/             # 레이아웃 컴포넌트
│   ├── Navbar/         # 네비게이션 바
│   └── Footer/         # 푸터
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
   - http://localhost:5173 으로 접속

### 빌드

```bash
npm run build
```

### 미리보기

```bash
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

## 📱 주요 페이지

### 🏠 홈페이지 (`/`)
- 상품 목록 그리드 뷰
- 카테고리별 필터링
- 검색 기능
- 상품 카드 (이미지, 이름, 가격, 장바구니 추가 버튼)

### 📦 상품 상세 페이지 (`/product/:id`)
- 상품 상세 정보
- 이미지 표시
- 수량 선택
- 장바구니 추가 기능

### 🛒 장바구니 페이지 (`/cart`)
- 장바구니 상품 목록
- 수량 조절 (증가/감소)
- 상품 제거
- 총액 계산
- 주문 요약

### 🔐 로그인 페이지 (`/login`)
- 이메일/비밀번호 로그인
- 에러 처리
- 회원가입 페이지 링크

### ✍️ 회원가입 페이지 (`/register`)
- 이메일, 비밀번호, 이름 입력
- 비밀번호 확인
- 유효성 검사
- 로그인 페이지 링크

## 🔄 상태 관리

### Redux Toolkit 구조

- **authSlice**: 사용자 인증 상태 (로그인/로그아웃, 사용자 정보)
- **productSlice**: 상품 데이터 관리 (목록, 필터링, 검색)
- **cartSlice**: 장바구니 상태 (상품 추가/제거, 수량 조절)

### 주요 액션

- `fetchProducts()`: 모든 상품 가져오기
- `addToCart(product)`: 장바구니에 상품 추가
- `loginUser(credentials)`: 사용자 로그인
- `registerUser(userData)`: 사용자 회원가입

## 🎨 스타일링

- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **컴포넌트별 스타일**: 재사용 가능한 스타일 클래스
- **다크모드 지원**: 향후 구현 예정

## 🧪 테스트

```bash
# 린트 검사
npm run lint

# 타입 체크
npm run type-check
```

## 📦 배포

### Vercel 배포

1. Vercel CLI 설치
   ```bash
   npm i -g vercel
   ```

2. 배포
   ```bash
   vercel
   ```

### Netlify 배포

1. `dist` 폴더를 Netlify에 드래그 앤 드롭
2. 또는 Git 연동을 통한 자동 배포

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 지원

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.

## 🙏 감사의 말

- [FakeStore API](https://fakestoreapi.com/) - 테스트용 상품 데이터 제공
- [Firebase](https://firebase.google.com/) - 인증 서비스 제공
- [Tailwind CSS](https://tailwindcss.com/) - 스타일링 프레임워크

---

**개발자**: React & TypeScript 개발팀  
**최종 업데이트**: 2024년  
**버전**: 1.0.0
