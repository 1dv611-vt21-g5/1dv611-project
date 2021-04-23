import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react'

import { statStr } from '../../constants'

import DeviceList from '../../components/DeviceList'
import testDevices from '../fixtures/testDevices.json'

// mostly adapted from https://testing-library.com/docs/react-testing-library/example-intro
const server = setupServer(
  // här mockar vi och interceptar alla anrop till backenden och ersätter med egen testdata
  rest.get(`${statStr.backendHost}/api/devices`, (req, res, ctx) => {
    return res(ctx.json(testDevices))
  }),
  rest.get(`${statStr.backendHost}/api/subscriptions`, (req, res, ctx) => {
    return res(ctx.json([])) // nolla
  })
)

beforeAll(() => server.listen())
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

it('loads and displays Loading spinner', async () => {
  // här renderar vi komponenten och väntar INTE på att vår fejkade request ska bli färdig, så den står och laddar
  render(<DeviceList />)
  const loadingText = screen.getByText('Loading...')
  expect(loadingText).not.toBeUndefined()
})

it('loads and displays a list of devices', async () => {
  // här renderar vi komponenten och väntar på att den ska bli färdig så listan dyker upp
  const { container } = render(<DeviceList />)
  await waitFor(() => screen.getByText('Z-Wave Strips Guard 700 Meeting Room'))

  expect(container).toMatchSnapshot()
})