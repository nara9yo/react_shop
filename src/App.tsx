import { useEffect } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { useAppDispatch } from './store/hooks'
import { setUser } from './store/slices/authSlice'
import { onAuthStateChange } from './services/auth'

// 컴포넌트 임포트
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'

// 레이아웃 컴포넌트
function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Firebase 인증 상태 변경 감지
    const unsubscribe = onAuthStateChange((user) => {
      dispatch(setUser(user))
    })

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe()
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      {/* 404 페이지 - 모든 경로에 매치되지 않을 때 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
