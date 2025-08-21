import { useEffect } from 'react'

interface InfoDialogProps {
  isOpen: boolean
  title: string
  messages: string[]
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

const InfoDialog = ({
  isOpen,
  title,
  messages,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}: InfoDialogProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    if (isOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-xl">
        <div className="px-6 pt-6 pb-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <ul className="mt-3 space-y-1 list-disc list-inside text-sm text-gray-600">
            {messages.map((m, idx) => (
              <li key={idx}>{m}</li>
            ))}
          </ul>
        </div>
        <div className="px-6 pb-6 pt-2 flex justify-end space-x-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
            {cancelText}
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default InfoDialog
