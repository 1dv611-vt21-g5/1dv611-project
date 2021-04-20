const Page = ({children}) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/img/logo.png" className="App-logo" alt="logo" />
        <h1 className="App-title">Yggio service demo</h1>
      </header>
      {children}
      <footer className="App-footer">
        <p>A project in course 1dv611 at Linneaus university. </p>
      </footer>
    </div>
  )
}

export default Page