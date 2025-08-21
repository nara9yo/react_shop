// API 서비스 함수들
import axios from 'axios';
import { Product } from '../types';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
});

// 요청 인터셉터 (로깅, 인증 토큰 추가 등)
api.interceptors.request.use(
  (config) => {
    console.log('API 요청:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API 요청 오류:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리, 로깅 등)
api.interceptors.response.use(
  (response) => {
    console.log('API 응답:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API 응답 오류:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// 상품 API 함수들
export const productAPI = {
  // 모든 상품 가져오기
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get<Product[]>('/products');
      return response.data;
    } catch (error) {
      console.error('상품 목록 가져오기 실패:', error);
      throw new Error('상품 목록을 가져오는데 실패했습니다.');
    }
  },

  // 특정 상품 가져오기
  getProductById: async (id: number): Promise<Product> => {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('상품 상세 정보 가져오기 실패:', error);
      throw new Error('상품 정보를 가져오는데 실패했습니다.');
    }
  },

  // 카테고리별 상품 가져오기
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await api.get<Product[]>(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('카테고리별 상품 가져오기 실패:', error);
      throw new Error('카테고리별 상품을 가져오는데 실패했습니다.');
    }
  },

  // 모든 카테고리 가져오기
  getAllCategories: async (): Promise<string[]> => {
    try {
      const response = await api.get<string[]>('/products/categories');
      return response.data;
    } catch (error) {
      console.error('카테고리 목록 가져오기 실패:', error);
      throw new Error('카테고리 목록을 가져오는데 실패했습니다.');
    }
  },
};

export default api;
