import { html } from 'lit';
import { component, useState } from 'haunted';
import { addTodo, toggleTodo, deleteTodo, filterTodos } from './todo-viewmodel';

function TodoView() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [newTodoText, setNewTodoText] = useState('');

    const handleNewTodoKeydown = (e) => {
        if (e.key === 'Enter' && newTodoText.trim()) {
            setTodos((currentTodos) => addTodo(currentTodos, newTodoText));
            setNewTodoText('');
        }
    };

    const handleToggleTodo = (id) => {
        setTodos((currentTodos) => toggleTodo(currentTodos, id));
    };

    const handleDeleteTodo = (id) => {
        setTodos((currentTodos) => deleteTodo(currentTodos, id));
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const filteredTodos = filterTodos(todos, filter);

    return html`
    <section class="todoapp">
      <header class="header">
        <h1>TodoMVVM</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          .value=${newTodoText}
          @input=${(e) => setNewTodoText(e.target.value)}
          @keydown=${handleNewTodoKeydown}
        />
      </header>

      <section class="main">
        <ul class="todo-list">
          ${filteredTodos.map(todo => html`
            <li class=${todo.completed ? 'completed' : ''}>
              <div class="view">
                <input
                  class="toggle"
                  type="checkbox"
                  .checked=${todo.completed}
                  @change=${() => handleToggleTodo(todo.id)}
                />
                <label>${todo.title}</label>
                <button class="destroy" @click=${() => handleDeleteTodo(todo.id)}></button>
              </div>
            </li>
          `)}
        </ul>
      </section>

      <footer class="footer">
        <span class="todo-count">
          <strong>${todos.filter(todo => !todo.completed).length}</strong> item(s) left
        </span>
        <ul class="filters">
          <li>
            <a href="#" class=${filter === 'all' ? 'selected' : ''} @click=${() => handleFilterChange('all')}>All</a>
          </li>
          <li>
            <a href="#" class=${filter === 'active' ? 'selected' : ''} @click=${() => handleFilterChange('active')}>Active</a>
          </li>
          <li>
            <a href="#" class=${filter === 'completed' ? 'selected' : ''} @click=${() => handleFilterChange('completed')}>Completed</a>
          </li>
        </ul>
      </footer>
    </section>
  `;
}

customElements.define('todo-view', component(TodoView));
