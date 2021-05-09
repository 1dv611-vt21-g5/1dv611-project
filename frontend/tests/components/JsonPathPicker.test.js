import React from 'react'
import { render, waitFor, screen, waitForElementToBeRemoved, act } from '@testing-library/react'
import preloadAll from 'jest-next-dynamic'

import JsonPathPicker from '../../components/JsonPathPicker'

import testDevices from '../fixtures/testDevices.json'

it('Should render snapshot correctly', async () => {
  await preloadAll()
  const { container } = render(<JsonPathPicker jsonData={testDevices[1]} />)

  expect(container).toMatchSnapshot()
})
