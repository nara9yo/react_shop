// Redux 타입이 지정된 훅들
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// 타입이 지정된 useDispatch 훅
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 타입이 지정된 useSelector 훅
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
