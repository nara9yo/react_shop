// 상품 상세 페이지 컴포넌트
import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchProductById } from '../../store/slices/productSlice'
import { addToCart } from '../../store/slices/cartSlice'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import type { Product } from '../../types'
import { toast } from 'react-hot-toast'

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  // 로컬 상태
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  
  // Redux 상태
  const { products, isLoading, error } = useAppSelector((state) => state.products)
  const { items: cartItems } = useAppSelector((state) => state.cart)
  
  // 현재 상품 찾기
  const product = products.find(p => p.id === Number(id))

  // 이미 장바구니에 담겼는지 여부
  const isInCart = useMemo(() => {
    if (!product) return false
    return cartItems.some((item) => item.id === product.id)
  }, [cartItems, product])
  
  // 컴포넌트 마운트 시 상품 데이터 가져오기
  useEffect(() => {
    if (id && !product) {
      dispatch(fetchProductById(Number(id)))
    }
  }, [id, product, dispatch])
  
  // 수량 변경 핸들러
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity)
    }
  }
  
  // 장바구니에 추가 핸들러 (로그인 없이 가능)
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product))
      }
      toast.success(`${product.title}을(를) 장바구니에 ${quantity}개 추가했습니다!`)
      setQuantity(1)
    }
  }
  
  // 다시 시도 핸들러
  const handleRetry = () => {
    if (id) {
      dispatch(fetchProductById(Number(id)))
    }
  }
  
  // 로딩 상태
  if (isLoading) {
    return <Loading message="상품 정보를 불러오는 중..." />
  }
  
  // 에러 상태
  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />
  }
  
  // 상품이 없는 경우
  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">상품을 찾을 수 없습니다</h2>
        <p className="text-gray-600 mb-6">요청하신 상품이 존재하지 않거나 삭제되었습니다.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    )
  }
  
  // 가격 포맷팅
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }
  
  // 별점 렌더링
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        뒤로가기
      </button>
      
      <div className="grid lg:grid-cols-2 gap-12">
        {/* 상품 이미지 섹션 */}
        <div className="space-y-4">
          {/* 메인 이미지 */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-4"
            />
          </div>
          
          {/* 이미지 썸네일 (현재는 단일 이미지이지만 향후 확장 가능) */}
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedImage(0)}
              className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${
                selectedImage === 0 ? 'border-blue-500' : 'border-gray-300'
              }`}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-2"
              />
            </button>
          </div>
        </div>
        
        {/* 상품 정보 섹션 */}
        <div className="space-y-6">
          {/* 카테고리 */}
          <div className="flex items-center">
            <span className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
              {product.category}
            </span>
          </div>
          
          {/* 상품명 */}
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>
          
          {/* 평점 */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {renderStars(product.rating.rate)}
            </div>
            <span className="text-gray-600">
              {product.rating.rate} ({product.rating.count}개 리뷰)
            </span>
          </div>
          
          {/* 가격 */}
          <div className="text-4xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </div>
          
          {/* 상품 설명 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">상품 설명</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
          
          {/* 수량 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              수량
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="w-16 text-center text-lg font-medium text-gray-900">
                {quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 99}
                className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* 장바구니 추가/이동 버튼 */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className={`w-full ${isInCart ? 'bg-gray-400 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors`}
            >
              {isInCart ? '장바구니에 담긴 제품' : '장바구니에 담기'}
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="w-full bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
            >
              장바구니로 이동
            </button>
          </div>
          
          {/* 추가 정보 */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">상품 ID</span>
              <span className="font-medium">{product.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">카테고리</span>
              <span className="font-medium capitalize">{product.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
