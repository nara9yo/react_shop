// Firebase 설정 및 초기화
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase 프로젝트 설정
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 인증 서비스 초기화
export const auth = getAuth(app);

// Firebase 앱 인스턴스 내보내기
export default app;
