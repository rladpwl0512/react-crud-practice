import './App.css';

function Header(props) {
  return <header className="App-header">
    <h1><a href="/">{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const lists = props.topics.map((prop) => <li key={prop.id}><a href={'/read/' + prop.id}>{prop.title}</a></li>)
  return <nav>
    <ol>
      {lists}
    </ol>
  </nav>
}

function Article(props) {
  console.log(props);
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  const topics = [
    {id: 1, title: 'html', body: 'html is ... '},
    {id: 2, title: 'css', body: 'css is ... '},
    {id: 3, title: 'javascript', body: 'javascript is ... '},
  ]
  return (
    <div className="App">
      <Header title="REACT"></Header>
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, Web"></Article>
    </div>
  );
}

export default App;