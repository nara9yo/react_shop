// Firebase 인증 서비스
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase';
import type { User } from '../types';

// 회원가입
export const signUp = async (email: string, password: string, displayName?: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 프로필 업데이트 (displayName 설정)
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    return {
      uid: user.uid,
      email: user.email!,
      displayName: displayName || user.displayName || undefined,
    };
  } catch (error: any) {
    console.error('회원가입 실패:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// 로그인
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || undefined,
    };
  } catch (error: any) {
    if (import.meta.env.DEV) {
      console.warn('로그인 실패:', error);
    }
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// 로그아웃
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw new Error('로그아웃에 실패했습니다.');
  }
};

// 인증 상태 변경 감지
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (firebaseUser: any) => {
    if (firebaseUser) {
      const user: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || undefined,
      };
      callback(user);
    } else {
      callback(null);
    }
  });
};

// Firebase 인증 오류 메시지 변환
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-disabled':
      return '비활성화된 계정입니다.';
    case 'auth/user-not-found':
      return '등록되지 않은 이메일입니다.';
    case 'auth/wrong-password':
      return '잘못된 비밀번호입니다.';
    case 'auth/invalid-credential':
    case 'auth/invalid-login-credentials':
      return '이메일 또는 비밀번호가 올바르지 않습니다.';
    case 'auth/email-already-in-use':
      return '이미 사용 중인 이메일입니다.';
    case 'auth/weak-password':
      return '비밀번호는 6자리 이상이어야 합니다.';
    case 'auth/invalid-email':
      return '유효하지 않은 이메일 형식입니다.';
    case 'auth/missing-password':
      return '비밀번호를 입력해주세요.';
    case 'auth/network-request-failed':
      return '네트워크 연결을 확인해주세요.';
    case 'auth/too-many-requests':
      return '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.';
    default:
      return '인증 오류가 발생했습니다.';
  }
};
