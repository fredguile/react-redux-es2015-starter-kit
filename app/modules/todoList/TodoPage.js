import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {addTodoItem, removeTodoItem} from './todoActions';

class TodoPage extends React.Component {
  render() {
    const {todos} = this.props;

    return (
      <section>
        <h1 className="text-center">TodoPage</h1>
        <article>
          <p>Here is a list of work items:</p>
          <ul className="list-group">
            {todos.map((value, key) => {
              return (
                <li className="list-group-item" key={key}>
                  <a onClick={this.deleteTodo.bind(this, key)} className="badge">remove</a>
                  {value}
                </li>
              );
            })}
          </ul>
          <div className="input-group input-group-lg">
            <span className="input-group-addon" id="sizing-addon1">Remember to:</span>
            <input type="text" ref="inputTodo" className="form-control" placeholder="complete this task before I go" aria-describedby="sizing-addon1" />
            <span className="input-group-btn">
              <button onClick={this.addTodo.bind(this)} className="btn btn-default" type="button">Add</button>
            </span>
          </div>
          <hr />
          <Link className="btn btn-primary btn-lg" to="/">Back</Link>
        </article>
      </section>
    );
  }

  addTodo() {
    const {dispatch} = this.props;
    const {inputTodo: {value}} = this.refs;

    if(value) {
      dispatch(addTodoItem(value));
    }
  }

  deleteTodo(key) {
    const {dispatch} = this.props;

    dispatch(removeTodoItem(key));
  }
}

export default connect(state => ({todos: state.todos}))(TodoPage);
