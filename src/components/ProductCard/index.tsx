// 상품 카드 컴포넌트
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { addToCart } from '../../store/slices/cartSlice'
import { Product } from '../../types'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch()

  // 장바구니에 상품 추가
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Link 이벤트 방지
    e.stopPropagation()
    dispatch(addToCart(product))
  }

  // 가격 포맷팅
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  // 제목 길이 제한
  const truncateTitle = (title: string, maxLength: number = 50) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link to={`/product/${product.id}`} className="block">
        {/* 상품 이미지 */}
        <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
          />
        </div>

        {/* 상품 정보 */}
        <div className="p-4">
          {/* 카테고리 */}
          <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
            {product.category}
          </span>

          {/* 상품명 */}
          <h3 className="mt-1 text-lg font-semibold text-gray-900 line-clamp-2">
            {truncateTitle(product.title)}
          </h3>

          {/* 평점 */}
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating.rate)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>

          {/* 가격 및 버튼 */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              장바구니 담기
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
