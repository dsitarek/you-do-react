import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

export default function Todo({ todo }) {
  return (
    <div>
      <Alert color="light">
        <button type="button" className="btn btn-success">Complete</button>
        {todo.name}
        <button type="button" className="btn btn-danger">Delete</button>
      </Alert>
    </div>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape(
    {
      complete: PropTypes.bool,
      date: PropTypes.string,
      name: PropTypes.string,
      uid: PropTypes.string,
    },
  ).isRequired,
};
