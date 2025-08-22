import reducer, { addToCart } from './cartSlice'
import type { Product } from '../../types'

describe('cartSlice', () => {
  const product: Product = {
    id: 1,
    title: 'Test Product',
    price: 10,
    description: 'desc',
    category: 'cat',
    image: 'img',
    rating: { rate: 0, count: 0 },
  }

  it('상품 추가 시 수량과 총액이 증가한다', () => {
    const state1 = reducer(undefined, addToCart(product))
    expect(state1.items).toHaveLength(1)
    expect(state1.items[0].quantity).toBe(1)
    expect(state1.total).toBe(10)

    const state2 = reducer(state1, addToCart(product))
    expect(state2.items[0].quantity).toBe(2)
    expect(state2.total).toBe(20)
  })
})


