// 장바구니 상태 관리 슬라이스
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartState, CartItem, Product } from '../../types';

// 초기 상태
const initialState: CartState = {
  items: [],
  total: 0,
  isLoading: false,
  error: null,
};

// 장바구니 슬라이스 생성
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 상품을 장바구니에 추가
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        // 이미 있는 상품이면 수량 증가
        existingItem.quantity += 1;
      } else {
        // 새로운 상품이면 장바구니에 추가
        const newItem: CartItem = {
          ...product,
          quantity: 1,
        };
        state.items.push(newItem);
      }

      // 총액 계산
      calculateTotal(state);
    },

    // 장바구니에서 상품 제거
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      calculateTotal(state);
    },

    // 상품 수량 증가
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);
      
      if (item) {
        item.quantity += 1;
        calculateTotal(state);
      }
    },

    // 상품 수량 감소
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);
      
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        calculateTotal(state);
      }
    },

    // 상품 수량 직접 설정
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item && quantity > 0) {
        item.quantity = quantity;
        calculateTotal(state);
      }
    },

    // 장바구니 전체 비우기
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.error = null;
    },

    // 로딩 상태 설정
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // 에러 설정
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    // 에러 초기화
    clearError: (state) => {
      state.error = null;
    },

    // 로컬 스토리지에서 장바구니 복원
    loadCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      calculateTotal(state);
    },
  },
});

// 총액 계산 헬퍼 함수
const calculateTotal = (state: CartState) => {
  state.total = state.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  // 소수점 둘째 자리까지 반올림
  state.total = Math.round(state.total * 100) / 100;
};

// 액션 내보내기
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  clearCart,
  setLoading,
  setError,
  clearError,
  loadCartFromStorage,
} = cartSlice.actions;

// 리듀서 내보내기
export default cartSlice.reducer;
