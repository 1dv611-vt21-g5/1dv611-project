import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'

const Page = ({ children }) => {
  let navbar = <Navbar />

  // if (children.type.name === 'Devices') {
  //   navbar = <Navbar />
  // }

  return (
    <div className="App">
      <Head>
        <title>Ysocial - Connect Yggio and Zapier</title>
      </Head>
      <header className="App-header">
        <a title="home" href="/"><img src="/img/logo.png" className="App-logo" alt="logo" /></a>
        {navbar}
      </header>
      {children}
      <footer className="App-footer">
        <p>A project in course 1dv611 at Linneaus university. </p>
      </footer>
    </div>
  )
}

export default Page