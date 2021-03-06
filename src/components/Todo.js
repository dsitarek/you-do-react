import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { deleteTodo, completeTodo } from '../data/todoData';

export default function Todo({ todo, setTodo, setEditItem }) {
  const handleClick = (action) => {
    if (action === 'delete') {
      deleteTodo(todo.firebaseKey).then(setTodo);
    }
    if (action === 'complete') {
      completeTodo(todo.firebaseKey).then(setTodo);
    }
  };
  return (
    <>
      {todo.complete !== true
        ? (
          <Alert color="light">
            <div className="todo-body">
              <button type="button" className="btn btn-success" onClick={() => handleClick('complete')}>Complete</button>
              <div className="todo-name">{todo.name}</div>
              <button type="button" className="btn btn-info" onClick={() => setEditItem(todo)}>Edit</button>
              <button type="button" className="btn btn-danger" onClick={() => handleClick('delete')}>Delete</button>
            </div>
          </Alert>
        ) : ''}
    </>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape(
    {
      complete: PropTypes.bool,
      date: PropTypes.string,
      name: PropTypes.string,
      uid: PropTypes.string,
      firebaseKey: PropTypes.string,
    },
  ).isRequired,
  setTodo: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
