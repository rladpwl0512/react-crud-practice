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

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={(event) => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"/></p>
    </form>
  </article>
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id: 1, title: 'html', body: 'html is ... '},
    {id: 2, title: 'css', body: 'css is ... '},
    {id: 3, title: 'javascript', body: 'javascript is ... '},
  ]);

  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title='Welcome' body='Hello, web'></Article>
  } else if (mode === 'READ') {
    let title = null;
    let body = null; 
    for (let topic of topics) {
      if (topic.id === id) {
        title = topic.title;
        body = topic.body;
      }
    } 
    content = <Article title={title} body={body}></Article>
  } else if (mode === "CREATE") { 
    content = <Create onCreate={(_title, _body) => {
      const newTopic = {id: nextId, title: _title, body: _body};
      setTopics([...topics, newTopic])
      setNextId(nextId + 1);
      setId(nextId);
      setMode('READ');
    }}></Create>
  }


  return (
    <div className="App">
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setId(_id);
        setMode('READ');
      }}></Nav>
      {content}
      <a href="/create" onClick={(event) => {
        event.preventDefault();
        setMode('CREATE');
      }}>CREATE</a>
    </div>
  );
}

export default App;