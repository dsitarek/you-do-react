import axios from 'axios';
import firebaseConfig from '../api/apiKeys';

const fbUrl = firebaseConfig.databaseURL;

const getTodos = async () => {
  const todos = await axios.get(`${fbUrl}/todos.json`);
  const todoData = Object.values(todos.data);
  return todoData;
};

const createTodo = (todoObj) => new Promise((resolve, reject) => {
  axios.post(`${fbUrl}/todos.json`, todoObj).then((obj) => {
    const fbKey = { firebaseKey: obj.data.name };
    axios.patch(`${fbUrl}/todos/${obj.data.name}.json`, fbKey)
      .then(() => {
        getTodos().then(resolve);
      });
  }).catch(reject);
});

const deleteTodo = (fbKey) => new Promise((resolve, reject) => {
  axios.delete(`${fbUrl}/todos/${fbKey}.json`)
    .then(() => getTodos().then(resolve))
    .catch(reject);
});

const completeTodo = (fbKey) => new Promise((resolve, reject) => {
  axios.patch(`${fbUrl}/todos/${fbKey}.json`, { complete: true })
    .then(() => getTodos().then(resolve))
    .catch(reject);
});

const updateTodo = (fbKey, updateObj) => new Promise((resolve, reject) => {
  axios.patch(`${fbUrl}/todos/${fbKey}.json`, updateObj)
    .then(() => getTodos().then(resolve))
    .catch(reject);
});

export {
  getTodos, createTodo, deleteTodo, completeTodo, updateTodo,
};
