// 홈페이지 컴포넌트
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchProducts, setSearchTerm, setSelectedCategory } from '../../store/slices/productSlice'
import ProductCard from '../../components/ProductCard'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const { filteredProducts, isLoading, error, searchTerm, selectedCategory } = useAppSelector(
    (state) => state.products
  )

  // 로컬 상태
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)

  // 컴포넌트 마운트 시 상품 데이터 가져오기
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // 검색 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setSearchTerm(localSearchTerm))
  }

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category))
  }

  // 다시 시도 핸들러
  const handleRetry = () => {
    dispatch(fetchProducts())
  }

  // 카테고리 목록 (하드코딩 - 실제로는 API에서 가져올 수 있음)
  const categories = [
    { value: 'all', label: '전체' },
    { value: "men's clothing", label: '남성 의류' },
    { value: "women's clothing", label: '여성 의류' },
    { value: 'jewelery', label: '보석류' },
    { value: 'electronics', label: '전자제품' },
  ]

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />
  }

  return (
    <div className="space-y-8 bg-blue-50 p-8">
      {/* 페이지 헤더 */}
      <div className="text-center bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">🛍️ ReactShop</h1>
        <p className="text-lg text-gray-700">최고의 상품을 합리적인 가격에 만나보세요</p>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 검색 폼 */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="flex">
              <input
                type="text"
                placeholder="상품을 검색해보세요..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-r-md font-medium transition-colors"
              >
                검색
              </button>
            </div>
          </form>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 로딩 상태 */}
      {isLoading && <Loading message="상품을 불러오는 중..." />}

      {/* 상품 목록 */}
      {!isLoading && (
        <div>
          {/* 상품 개수 표시 */}
          <div className="mb-6">
            <p className="text-gray-600">
              총 <span className="font-semibold text-blue-600">{filteredProducts.length}</span>개의 상품
              {searchTerm && (
                <span>
                  {' '}
                  - "<span className="font-semibold">{searchTerm}</span>" 검색 결과
                </span>
              )}
            </p>
          </div>

          {/* 상품 그리드 */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8a2 2 0 00-2-2H9a2 2 0 00-2 2v8"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">상품이 없습니다</h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== 'all'
                  ? '검색 조건을 변경해보세요.'
                  : '상품을 불러올 수 없습니다.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default HomePage
