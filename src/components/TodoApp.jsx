import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoTools from './TodoTools';
import Footer from './Footer';

class TodoApp extends React.Component {

	constructor(props){
		super(props);

		this.getNbActiveItems = this.getNbActiveItems.bind(this);
	}

	getNbActiveItems() {
		if(this.props.todos){
			const activeItems = this.props.todos.filter(
				(item) => item.get('status') === 'active'
			);
			return activeItems.size;
		}
		return 0;
	}

	render() {
		return (
			<div>
				<section className="todoapp">
					<TodoHeader addItem={this.props.addItem} />
					<TodoList {...this.props} />
					<TodoTools changeFilter={this.props.changeFilter}
						       filter={this.props.filter}
						       nbActiveItems={this.getNbActiveItems()}
						       clearCompleted={this.props.clearCompleted} />
				</section>
				<Footer />
			</div>
		);
	}

}

function mapStateToProps(state){
	return {
		todos: state.get('todos'),
		filter: state.get('filter')
	}
}

export default TodoApp;
export const TodoAppContainer = connect(mapStateToProps, actionCreators)(TodoApp);