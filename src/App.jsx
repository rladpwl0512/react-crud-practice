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

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return <article>
    <h2>Update</h2>
    <form onSubmit={(event) => {
      event.preventDefault();
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title" value={title} onChange={(event) => {
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name="body" placeholder="body" value={body} onChange={(event) => {
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Update"/></p>
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
  } else if (mode === 'UPDATE') {
    let title = null;
    let body = null; 
    for(let topic of topics) {
      if(topic.id === id) {
        title = topic.title;
        body = topic.body;
      }
    }
    content = <Update title={title} body={body} onUpdate = {(_title, _body) => {
      const newTopics = [...topics];
      const updateTopic = {id: id, title: _title, body: _body};
      for(let i=0; i<newTopics.length; i++) {
        if(newTopics[i].id === id) {
          newTopics[i] = updateTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
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
      <ul>
        <li><a href="/create" onClick={(event) => {
          event.preventDefault();
          setMode('CREATE');
        }}>CREATE</a></li>
        <li><a href={'/update' + id} onClick={(event) => {
          event.preventDefault();
          setMode('UPDATE');
        }}>UPDATE</a></li>
        <li>
          <input type="button" value="Delete" onClick={() => {
            const newTopics = [];
            for(let i=0; i<topics.length; i++) {
              if(topics[i].id !== id) {
                newTopics.push(topics[i]);
              }
            }
            setTopics(newTopics);
            setMode('WELCOME');
          }}/>
        </li>
      </ul>
    </div>
  );
}

export default App;