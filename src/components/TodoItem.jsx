import React from 'react';
import TextInput from './TextInput';

class TodoItem extends React.Component {

	render() {
		return(
			<li className="todo">
				<div className="view">
					<input type="checkbox" className="toggle" />
					<label htmlFor="todo">
						{this.props.text}
					</label>
					<button className="destroy"></button>
				</div>
				<TextInput />
			</li>			
		);
	}

}

export default TodoItem