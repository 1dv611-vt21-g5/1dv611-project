import Head from 'next/head'
import Page from 'components/Page'
import DeviceList from 'components/DeviceList'

export default function Home() {
  return (
    <Page>
      <DeviceList />
    </Page>
  )
}
