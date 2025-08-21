// 상품 관련 타입 정의
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// 장바구니 아이템 타입 정의
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// 사용자 타입 정의
export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

// 인증 상태 타입 정의
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// 상품 상태 타입 정의
export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
}

// 장바구니 상태 타입 정의
export interface CartState {
  items: CartItem[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// 로딩 상태 타입
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
