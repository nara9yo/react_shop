import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import api, { productAPI } from './api'

describe('productAPI', () => {
  beforeEach(() => {
    vi.spyOn(api, 'get')
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('getAllProducts는 /products를 호출한다', async () => {
    ;(api.get as any).mockResolvedValue({ data: [] })
    const data = await productAPI.getAllProducts()
    expect(api.get).toHaveBeenCalledWith('/products')
    expect(data).toEqual([])
  })
})


