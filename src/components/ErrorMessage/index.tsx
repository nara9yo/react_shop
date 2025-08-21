// 에러 메시지 컴포넌트
interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg">
      {/* 에러 아이콘 */}
      <svg
        className="w-12 h-12 text-red-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 19c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>

      {/* 에러 메시지 */}
      <h3 className="text-lg font-semibold text-red-800 mb-2">오류가 발생했습니다</h3>
      <p className="text-red-600 text-center mb-4">{message}</p>

      {/* 다시 시도 버튼 */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          다시 시도
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
