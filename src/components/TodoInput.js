import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createTodo } from '../data/todoData';

export default function TodoInput({ obj }) {
  const [formInput, setFormInput] = useState({
    name: obj?.name || '',
  });

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo(formInput);
  };

  return (
    <div className="formContainer">
      <form>
        <label htmlFor="name">Name
          <input type="text" id="name" name="name" defaultValue={formInput.name} onChange={handleChange} required />
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

TodoInput.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
  }),
};

TodoInput.defaultProps = { obj: {} };
