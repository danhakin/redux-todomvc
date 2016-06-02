import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';
import {compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {TodoAppContainer} from './components/TodoApp';

const createStoreDevTools = compose(
		window.devToolsExtension ? window. devToolsExtension() : f => f
	  )(createStore);
const store = createStore(reducer);

store.dispatch({
	type: 'SET_STATE',
	state: {
		todos: [
			{id: 1, text: 'React', status: 'active'},
			{id: 2, text: 'Redux', status: 'active'},
			{id: 3, text: 'Immutable', status: 'completed'}		
		],
		filter: 'all'
	}
});

require('../node_modules/todomvc-app-css/index.css');

ReactDOM.render(
	<Provider store={store}>
		<TodoAppContainer/>
	</Provider>,
	document.getElementById('app')
);