// 상품 카드 컴포넌트
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addToCart } from '../../store/slices/cartSlice'
import type { Product } from '../../types'
import LazyImage from '../LazyImage'
import useToast from '../../hooks/useToast'
import { formatCurrency } from '../../utils/currency'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch()
  const { success } = useToast()
  const { items: cartItems } = useAppSelector((state) => state.cart)
  const isInCart = cartItems.some((item) => item.id === product.id)

  // 장바구니에 상품 추가
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Link 이벤트 방지
    e.stopPropagation()
    dispatch(addToCart(product))
    success(`${product.title}을(를) 장바구니에 1개 추가했습니다!`)
  }

  // 가격 포맷팅
  const formatPrice = (price: number) => formatCurrency(price, 'USD', 'en-US')

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full flex flex-col border border-slate-100">
      <Link to={`/product/${product.id}`} className="block flex flex-col h-full">
        {/* 상품 이미지 */}
        <div className="aspect-square relative bg-slate-50">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <LazyImage
              src={product.image}
              alt={product.title}
              className="w-4/5 h-4/5 object-contain"
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="p-4 flex flex-col flex-1">
          {/* 상단 메타 (카테고리 + 제목) 고정 높이로 정렬 유지 */}
          <div className="mb-3 h-[4.75rem] pb-0.5 overflow-hidden">
            <span className="block text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">
              {product.category}
            </span>
            {/* 제목: 2줄 초과 시 ... 으로 줄임 (CSS line-clamp) */}
            <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
              {product.title}
            </h3>
          </div>

          {/* 평점 */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating.rate)
                      ? 'text-amber-400'
                      : 'text-slate-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-slate-600">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>

          {/* 가격 및 버튼 */}
          <div className="mt-auto flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleAddToCart}
              className={`${isInCart ? 'bg-slate-400 hover:bg-slate-500' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap`}
            >
              {isInCart ? '장바구니에 담긴 제품' : '장바구니 담기'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
