import { useState } from 'react';
import './index.css';

//REUSABLE ITEM
function Button({ children, onClick }) {
	return (
		<button
			className='btn red'
			onClick={onClick}
		>
			{children}
		</button>
	);
}
/////////////////////

export default function App() {
	return (
		<div className='app'>
			<TodoApp />
		</div>
	);
}

function TodoApp() {
	const [tasks, setTasks] = useState([]);

	function handleAddTask(newTask) {
		setTasks((task) => [...task, newTask]);
	}

	function handleRemoveTask(id) {
		setTasks(tasks.filter((task) => id !== task.id));
	}

	function handleClear() {
		const approve = window.confirm(
			'Are you shure you want to delete all tasks?'
		);
		if (approve) setTasks([]);
	}

	function handleCheckBox(id) {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, checked: !task.checked } : task
			)
		);
	}

	return (
		<div className='todo-app'>
			<TodoForm onAddTask={handleAddTask} />
			<TodoList
				tasks={tasks}
				onRemoveTask={handleRemoveTask}
				onClick={handleClear}
				handleCheckBox={handleCheckBox}
			/>
		</div>
	);
}

function TodoForm({ onAddTask }) {
	const [title, setTitle] = useState('');

	const id = crypto.randomUUID();

	function handleSubmit(e) {
		e.preventDefault();

		const newTask = {
			task: title,
			id,
			checked: false,
		};
		setTitle('');
		if (title.length !== 0) onAddTask(newTask);
	}

	return (
		<form
			className='form'
			onSubmit={handleSubmit}
		>
			<div className='form-row'>
				<label htmlFor='task'>Task</label>
				<input
					id='task'
					type='text'
					placeholder='Add task'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className='btn-container'>
				<button className='btn'>Add</button>
			</div>
		</form>
	);
}

function TodoList({ tasks, onRemoveTask, onClick, handleCheckBox }) {
	const [sortBy, setSortBy] = useState('input');

	let sortedTasks;

	if (sortBy === 'input') sortedTasks = tasks;
	if (sortBy === 'name')
		sortedTasks = [...tasks].sort((a, b) => a.task.localeCompare(b.task));

	if (sortBy === 'completed')
		sortedTasks = [...tasks].sort(
			(a, b) => Number(a.checked) - Number(b.checked)
		);

	console.log(tasks);
	return (
		<div className='todo-list'>
			<ul className='list'>
				{sortedTasks.map((task) => (
					<TodoItem
						task={task}
						key={task.id}
						onRemoveTask={onRemoveTask}
						handleCheckBox={handleCheckBox}
					/>
				))}
			</ul>
			<div className='buttons'>
				<div>
					<Button onClick={onClick}>Clear</Button>
				</div>

				{tasks.length > 1 && (
					<select
						className='btn'
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
					>
						<option value='input'>Sort by input</option>
						<option value='name'>Sort by name</option>
						<option value='completed'>Sort by completed</option>
					</select>
				)}
			</div>
		</div>
	);
}

function TodoItem({ task, onRemoveTask, handleCheckBox }) {
	const [isChecked, setIsChecked] = useState(false);

	return (
		<div className='item'>
			<li>
				<input
					onClick={() => handleCheckBox(task.id)}
					onChange={() => setIsChecked(!isChecked)}
					type='checkbox'
					checked={isChecked}
					id={task.id}
				/>
				<label
					htmlFor={task.id}
					className={isChecked ? 'checked' : ''}
				>
					{task.task}
				</label>
				<button
					className='btn__close'
					onClick={() => onRemoveTask(task.id)}
				>
					❌
				</button>
			</li>
		</div>
	);
}
