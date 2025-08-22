import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* 404 아이콘 */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-300">404</div>
          <div className="text-2xl font-semibold text-gray-600 mt-4">
            페이지를 찾을 수 없습니다
          </div>
        </div>
        
        {/* 설명 */}
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          URL을 다시 확인하거나 메인 페이지로 돌아가보세요.
        </p>
        
        {/* 액션 버튼들 */}
        <div className="space-x-4">
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            메인 페이지로
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            이전 페이지로
          </button>
        </div>
        
        {/* 추가 정보 */}
        <div className="mt-12 text-sm text-gray-400">
          <p>도움이 필요하시다면 고객센터에 문의해주세요</p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
