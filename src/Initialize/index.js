import React, { useState, useEffect } from 'react';
import { getTodos } from '../data/todoData';
import Todo from '../components/Todo';
import TodoInput from '../components/TodoInput';

function Initialize() {
  const [todo, setTodo] = useState([]);

  const getTheTodos = async () => {
    const retrievedTodo = await getTodos();
    setTodo(retrievedTodo);
  };
  useEffect(() => { getTheTodos(); }, []);

  return (
    <div className="App">
      <TodoInput />
      {
        todo.map((todos) => <Todo key={todos.name} todo={todos} />)
      }
    </div>
  );
}

export default Initialize;
