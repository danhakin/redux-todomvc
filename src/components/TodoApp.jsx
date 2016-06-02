import React from 'react';
import TodoList from './TodoList';
import TodoTools from './TodoTools';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

class TodoApp extends React.Component {

	getNbActiveItems() {
		return 0;
	}

	render() {
		return (
			<div>
				<section className="todoapp">
					<TodoList {...this.props} />
					<TodoTools changeFilter={this.props.changeFilter}
						       filter={this.props.filter}
						       nbActiveItems={this.getNbActiveItems} />
				</section>
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