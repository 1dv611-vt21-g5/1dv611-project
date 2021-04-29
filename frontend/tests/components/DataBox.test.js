import React from 'react'
import { render } from '@testing-library/react'
import DataBox from '../../components/DataBox'

it('Render snapshot correctly', () => {
  const data = { person: 'johannes', age: 28 }
  const { container } = render(<DataBox data={data} />)
  expect(container).toMatchSnapshot()
})

it('Renders a different snapshot correctly', () => {
  const data = { person: 'Adam', age: 31 }
  const { container } = render(<DataBox data={data} />)

  expect(container).toMatchSnapshot()
})
