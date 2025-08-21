// 상품 상태 관리 슬라이스
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductState, Product } from '../../types';
import { productAPI } from '../../services/api';

// 초기 상태
const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  selectedCategory: 'all',
};

// 비동기 액션: 모든 상품 가져오기
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await productAPI.getAllProducts();
      return products;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 비동기 액션: 특정 상품 가져오기
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number, { rejectWithValue }) => {
    try {
      const product = await productAPI.getProductById(id);
      return product;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 비동기 액션: 카테고리별 상품 가져오기
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      const products = await productAPI.getProductsByCategory(category);
      return products;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 상품 슬라이스 생성
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // 검색어 설정
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      filterProducts(state);
    },
    // 카테고리 설정
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      filterProducts(state);
    },
    // 상품 필터링 (검색어와 카테고리에 따라)
    filterProducts: (state) => {
      filterProducts(state);
    },
    // 에러 초기화
    clearError: (state) => {
      state.error = null;
    },
    // 상품 상태 초기화
    resetProducts: (state) => {
      state.products = [];
      state.filteredProducts = [];
      state.searchTerm = '';
      state.selectedCategory = 'all';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // 모든 상품 가져오기
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        filterProducts(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // 특정 상품 가져오기
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        // 기존 상품 목록에서 해당 상품이 없으면 추가
        const existingProduct = state.products.find(p => p.id === action.payload.id);
        if (!existingProduct) {
          state.products.push(action.payload);
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // 카테고리별 상품 가져오기
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// 상품 필터링 헬퍼 함수
const filterProducts = (state: ProductState) => {
  let filtered = state.products;

  // 카테고리 필터링
  if (state.selectedCategory !== 'all') {
    filtered = filtered.filter(product => 
      product.category.toLowerCase() === state.selectedCategory.toLowerCase()
    );
  }

  // 검색어 필터링
  if (state.searchTerm.trim()) {
    const searchLower = state.searchTerm.toLowerCase();
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  }

  state.filteredProducts = filtered;
};

// 액션 내보내기
export const { setSearchTerm, setSelectedCategory, clearError, resetProducts } = productSlice.actions;

// 리듀서 내보내기
export default productSlice.reducer;
