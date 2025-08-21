// 네비게이션 바 컴포넌트
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { logoutUser } from '../../store/slices/authSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const { items } = useAppSelector((state) => state.cart)

  // 장바구니 총 아이템 수 계산
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      navigate('/')
    } catch (error) {
      console.error('로그아웃 실패:', error)
    }
  }

  const formatPrice = (price: number) => `$${price.toFixed(2)}`

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">🛍️</span>
            <span className="text-xl font-bold text-gray-800">ReactShop</span>
          </Link>

          {/* 네비게이션 메뉴 */}
          <div className="flex items-center space-x-6">
            {/* 홈 링크 */}
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              홈
            </Link>

            {/* 장바구니 링크 + 미리보기 */}
            <div className="relative group">
              <Link
                to="/cart"
                className="relative flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <svg
                  className="w-6 h-6 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6"
                  />
                </svg>
                장바구니
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>

              {/* 미리보기 드롭다운 */}
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-xl z-50">
                <div className="p-4 max-h-96 overflow-auto">
                  {items.length === 0 ? (
                    <div className="text-center text-gray-500 py-6">장바구니가 비어있습니다.</div>
                  ) : (
                    <div className="space-y-3">
                      {items.slice(0, 5).map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.quantity}개 · {formatPrice(item.price)}</p>
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="border-t px-4 py-3 flex items-center justify-between">
                  <span className="text-sm text-gray-600">소계</span>
                  <span className="text-base font-semibold text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="px-4 pb-4">
                  <Link
                    to="/cart"
                    className="w-full inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition-colors"
                  >
                    장바구니로 이동
                  </Link>
                </div>
              </div>
            </div>

            {/* 인증 관련 링크 */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  안녕하세요, {user?.displayName || user?.email}님!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  로그인
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
