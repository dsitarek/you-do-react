import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createTodo, updateTodo } from '../data/todoData';

const initialState = {
  name: '',
  complete: false,
  uid: '',
};
export default function TodoInput({ obj, setTodo, setEditItem }) {
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        name: obj.name,
        firebaseKey: obj.firebaseKey,
        complete: obj.complete,
        date: obj.date,
        uid: obj.uid,
      });
    }
  }, [obj]);

  const resetForm = () => {
    setFormInput(initialState);
    setEditItem({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTodo(obj.firebaseKey, formInput).then((todos) => {
        setTodo(todos);
        resetForm();
      });
    } else {
      createTodo({ ...formInput, date: new Date() }).then((todos) => {
        setTodo(todos);
        resetForm();
      });
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:
          <input type="text" id="name" name="name" value={formInput.name} onChange={handleChange} required />
        </label>
        <button type="submit">{obj.firebaseKey ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
}

TodoInput.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    uid: PropTypes.string,
  }),
  setTodo: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

TodoInput.defaultProps = { obj: {} };
