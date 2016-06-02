import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

class TodoTools extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		return(
			<footer className="footer">
				<span className="todo-count">
					<strong>{this.props.nbActiveItems()}</strong> items left
				</span>
				<ul className="filters">
					<li>
						<a href="#"
						   onClick={() => this.props.changeFilter('all')}
						   className="all">
						   All
						</a>
					</li>
					<li>
						<a href="#"
						   onClick={() => this.props.changeFilter('active')}
						   className="active">
						   Active
						</a>
					</li>
					<li>
						<a href="#"
						   onClick={() => this.props.changeFilter('completed')}
						   className="completed">
						   Completed
						</a>
					</li>
				</ul>
				<button className="clear-completed"
					    onClick="">
					Clear completed
				</button>
			</footer>
		);
	}
}

export default TodoTools