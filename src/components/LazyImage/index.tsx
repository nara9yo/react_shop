// 지연 로딩 이미지 컴포넌트
import { useEffect, useRef, useState } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  sizes?: string
}

const LazyImage = ({ src, alt, className = '', sizes }: LazyImageProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const element = imgRef.current
    if (!element) return

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true)
              observer.unobserve(entry.target)
            }
          })
        },
        { rootMargin: '200px 0px' }
      )
      observer.observe(element)
      return () => observer.disconnect()
    } else {
      // 폴백: Observer 미지원 브라우저에서는 바로 로드
      setIsVisible(true)
    }
  }, [])

  return (
    <>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse" />
      )}
      {/* 실제 이미지 */}
      <img
        ref={imgRef}
        src={isVisible ? src : undefined}
        alt={alt}
        className={`${className} ${isLoaded ? '' : 'opacity-0'}`}
        loading="lazy"
        decoding="async"
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  )
}

export default LazyImage
