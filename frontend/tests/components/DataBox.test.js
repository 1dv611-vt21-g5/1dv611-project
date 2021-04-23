import React from 'react'
import { render } from '@testing-library/react'
import DataBox from '../../components/DataBox'

it('Render snapshot correctly', () => {
  const data = { person: 'johannes', age: 28 }
  const { container } = render(<DataBox data={data} />)
  expect(container).toMatchSnapshot()
})