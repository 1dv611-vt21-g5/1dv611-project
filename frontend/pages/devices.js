// import Head from 'next/head'
import Page from 'components/Page'
import DeviceList from 'components/DeviceList'
import PleaseLogin from 'components/PleaseLogin'

export default function Home () {
  return (
    <Page>
      <PleaseLogin>
      <DeviceList />
      </PleaseLogin>
    </Page>
  )
}
