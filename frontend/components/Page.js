const Page = ({children}) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/img/logo.png" className="App-logo" alt="logo" />
        <h1 className="App-title">Yggio service demo</h1>
      </header>
      {children}
    </div>
  )
}

export default Page