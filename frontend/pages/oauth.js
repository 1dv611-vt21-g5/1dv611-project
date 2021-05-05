import Page from 'components/Page'
import WaitOauth from 'components/WaitOauth'

export default function Home (props) {
  return (
    <Page>
      <WaitOauth props={props} />
    </Page>
  )
}
