import { render, screen } from '@testing-library/react'
import Loading from './index'

describe('Loading', () => {
  it('스피너가 렌더링된다', () => {
    render(<Loading />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})

