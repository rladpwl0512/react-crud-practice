import './App.css';
import { useState } from 'react';

function Header(props) {
  return <header className="App-header" onClick={(event) => {
    event.preventDefault();
    props.onChangeMode();
  }}>
    <h1><a href="/">{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const lists = props.topics.map((prop) => <li key={prop.id}><a href={'/read/' + prop.id} onClick={(event) => {
    event.preventDefault();
    props.onChangeMode(prop.id);
  }}>{prop.title}</a></li>)
  return <nav>
    <ol>
      {lists}
    </ol>
  </nav>
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const topics = [
    {id: 1, title: 'html', body: 'html is ... '},
    {id: 2, title: 'css', body: 'css is ... '},
    {id: 3, title: 'javascript', body: 'javascript is ... '},
  ]

  let content = null;
  let title = null;
  let body = null; 

  if(mode === 'WELCOME') {
    title = 'Welcome';
    body = 'Hello, web';
  } else if(mode === 'READ') {
    for(let topic of topics) {
      if(topic.id === id) {
        title = topic.title;
        body = topic.body;
      }
    }
  }
  content = <Article title={title} body={body}></Article>


  return (
    <div className="App">
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;