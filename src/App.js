import { useState } from 'react';
import './index.css';

const darbai = [
	{ name: 'Buy Grocieries', id: 111 },
	{ name: 'Wash Car', id: 222 },
	{ name: 'Learn React', id: 333 },
];

export default function App() {
	return (
		<div className='app'>
			<TodoApp />
		</div>
	);
}

function TodoApp() {
	const [tasks, setTasks] = useState(darbai);

	return (
		<div className='todo-app'>
			<TodoForm />
			<TodoList tasks={tasks} />
		</div>
	);
}

function TodoForm() {
	return (
		<form className='form'>
			<div className='form-row'>
				<label>Task</label>
				<input type='text' />
			</div>
			<div className='btn'>
				<button>Add</button>
			</div>
		</form>
	);
}

function TodoList({ tasks }) {
	return (
		<div className='todo-list'>
			<ul className='list'>
				{tasks.map((task) => (
					<TodoItem
						task={task}
						key={task.id}
					/>
				))}
			</ul>
			<Button>Clear</Button>
		</div>
	);
}

function TodoItem({ task }) {
	return (
		<div className='item'>
			<li>
				<input type='checkbox' /> {task.name}
			</li>
		</div>
	);
}

function Button({ children }) {
	return (
		<div className='btn'>
			<button className='clear'>{children}</button>
		</div>
	);
}
