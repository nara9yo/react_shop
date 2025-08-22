import { toast, ToastOptions } from 'react-hot-toast'

const baseOptions: ToastOptions = {
  duration: 2500,
  position: 'top-center',
}

export const useToast = () => {
  const success = (message: string, options?: ToastOptions) =>
    toast.success(message, { ...baseOptions, ...options })

  const error = (message: string, options?: ToastOptions) =>
    toast.error(message, { ...baseOptions, ...options })

  const info = (message: string, options?: ToastOptions) =>
    toast(message, { ...baseOptions, ...options })

  return { success, error, info }
}

export default useToast


