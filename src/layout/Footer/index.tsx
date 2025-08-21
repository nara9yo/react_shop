// 푸터 컴포넌트
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-lg font-bold mb-4">🛍️ Shop</h3>
            <p className="text-gray-300 text-sm">
              최고의 상품을 합리적인 가격에 제공하는
              <br />
              온라인 쇼핑몰입니다.
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-lg font-bold mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  홈
                </a>
              </li>
              <li>
                <a href="/cart" className="text-gray-300 hover:text-white transition-colors">
                  장바구니
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-300 hover:text-white transition-colors">
                  로그인
                </a>
              </li>
            </ul>
          </div>

          {/* 고객 지원 */}
          <div>
            <h3 className="text-lg font-bold mb-4">고객 지원</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">이메일: support@shop.com</li>
              <li className="text-gray-300">전화: 1588-0000</li>
              <li className="text-gray-300">운영시간: 평일 9:00-18:00</li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Shop. All rights reserved. Made with React & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
