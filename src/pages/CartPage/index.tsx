// 장바구니 페이지 컴포넌트
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  updateQuantity, 
  clearCart 
} from '../../store/slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import type { CartItem } from '../../types'
import { toast } from 'react-hot-toast'
import ConfirmDialog from '../../components/ConfirmDialog'
import InfoDialog from '../../components/InfoDialog'

const CartPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { items, total } = useAppSelector((state) => state.cart)

  // Confirm/Info dialog state
  const [isClearOpen, setIsClearOpen] = useState(false)
  const [pendingRemoveId, setPendingRemoveId] = useState<number | null>(null)
  const [isCheckoutInfoOpen, setIsCheckoutInfoOpen] = useState(false)

  // 장바구니가 비어있는 경우
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <svg
          className="w-24 h-24 text-gray-400 mx-auto mb-6"
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">장바구니가 비어있습니다</h2>
        <p className="text-gray-600 mb-8">상품을 추가해보세요!</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
        >
          쇼핑 계속하기
        </button>
      </div>
    )
  }

  // 가격 포맷팅
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  // 수량 변경 핸들러
  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
      toast.success('수량이 변경되었습니다.')
    }
  }

  // 수량 증가 핸들러
  const handleIncreaseQuantity = (itemId: number) => {
    dispatch(increaseQuantity(itemId))
    toast.success('수량이 증가되었습니다.')
  }

  // 수량 감소 핸들러
  const handleDecreaseQuantity = (itemId: number) => {
    dispatch(decreaseQuantity(itemId))
    toast.success('수량이 감소되었습니다.')
  }

  // 상품 제거(모달 오픈)
  const openRemoveItem = (itemId: number) => setPendingRemoveId(itemId)
  const confirmRemoveItem = () => {
    if (pendingRemoveId !== null) {
      dispatch(removeFromCart(pendingRemoveId))
      toast.success('상품이 장바구니에서 제거되었습니다.')
      setPendingRemoveId(null)
    }
  }

  // 장바구니 비우기(모달 오픈)
  const openClearCart = () => setIsClearOpen(true)
  const confirmClearCart = () => {
    dispatch(clearCart())
    toast.success('장바구니를 비웠습니다.')
    setIsClearOpen(false)
  }

  // 주문하기 핸들러 → 모달 안내
  const handleCheckout = () => setIsCheckoutInfoOpen(true)

  const confirmCheckoutInfo = () => {
    setIsCheckoutInfoOpen(false)
    dispatch(clearCart())
  }

  const cancelCheckoutInfo = () => setIsCheckoutInfoOpen(false)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Dialogs */}
      <ConfirmDialog
        isOpen={isClearOpen}
        title="장바구니 비우기"
        message="장바구니의 모든 상품을 제거하시겠습니까?"
        confirmText="비우기"
        cancelText="취소"
        onConfirm={confirmClearCart}
        onCancel={() => setIsClearOpen(false)}
      />
      <ConfirmDialog
        isOpen={pendingRemoveId !== null}
        title="상품 제거"
        message="해당 상품을 장바구니에서 제거하시겠습니까?"
        confirmText="제거"
        cancelText="취소"
        onConfirm={confirmRemoveItem}
        onCancel={() => setPendingRemoveId(null)}
      />
      <InfoDialog
        isOpen={isCheckoutInfoOpen}
        title="주문 안내"
        messages={["주문하기기 기능은 향후 구현 예정 입니다.", "확인을 누르시면 장바구니는 자동으로 비워집니다."]}
        confirmText="확인"
        cancelText="취소"
        onConfirm={confirmCheckoutInfo}
        onCancel={cancelCheckoutInfo}
      />

      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">장바구니</h1>
        <button
          onClick={openClearCart}
          className="text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          장바구니 비우기
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 장바구니 상품 목록 */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4"
            >
              {/* 상품 이미지 */}
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              {/* 상품 정보 */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  {formatPrice(item.price)}
                </p>
              </div>

              {/* 수량 조절 */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDecreaseQuantity(item.id)}
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>

                <input
                  type="number"
                  min="1"
                  max="99"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item, parseInt(e.target.value) || 1)}
                  className="w-16 text-center border border-gray-300 rounded-md py-1 px-2 text-sm"
                />

                <button
                  onClick={() => handleIncreaseQuantity(item.id)}
                  disabled={item.quantity >= 99}
                  className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* 소계 */}
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <p className="text-sm text-gray-500">
                  {formatPrice(item.price)} × {item.quantity}
                </p>
              </div>

              {/* 삭제 버튼 */}
              <button
                onClick={() => openRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="상품 제거"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* 주문 요약 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">주문 요약</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>상품 수량</span>
                <span>{items.reduce((total, item) => total + item.quantity, 0)}개</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>상품 종류</span>
                <span>{items.length}종</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>총 결제금액</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
            >
              주문하기
            </button>

            <div className="mt-4 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
              >
                쇼핑 계속하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
