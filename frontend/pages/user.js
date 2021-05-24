import Page from 'components/Page'
import User from 'components/User'
import PleaseLogin from 'components/PleaseLogin'

export default function Home () {
  return (
    <Page>
      <PleaseLogin>
      <User />
      </PleaseLogin>
    </Page>
  )
}
