import React, { useState, useEffect } from 'react';
import { getTodos } from '../data/todoData';
import Todo from '../components/Todo';
import TodoInput from '../components/TodoInput';

function Initialize() {
  const [todo, setTodo] = useState([]);
  const [editItem, setEditItem] = useState({});

  const getTheTodos = async () => {
    const retrievedTodo = await getTodos();
    setTodo(retrievedTodo);
  };
  useEffect(() => { getTheTodos(); }, []);

  return (
    <div className="app">
      <h1 className="title">YOU-DO!</h1>
      <TodoInput setTodo={setTodo} obj={editItem} setEditItem={setEditItem} />
      <div className="todo-container">
        {
        todo.map((todos) => <Todo key={todos.firebaseKey} todo={todos} setTodo={setTodo} setEditItem={setEditItem} />)
      }
      </div>
    </div>
  );
}

export default Initialize;
