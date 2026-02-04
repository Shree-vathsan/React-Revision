import {useState, useEfect} from 'react';
import cors from 'cors'

function App() {
  const [todos, setTodos] = useState([]);
  app.use(cors())
  useEffect(() =>{
    fetch('http://locathost:3000/todos')
      .then(res => res.json())
      .then(data => setTodos(data))


  }, []);
  return (
      <div>
        <h1>Todos</h1>
        <ul>
          {todos.map(t=> (
            <li key = {t.id}>
              {t.title} {t.completed ? '✅' : ''}
            </li>
          ))}
        </ul>
      </div>
  )
}
export default App;