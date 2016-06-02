import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import * as actionCreators from '../src/action_creators';
import reducer from '../src/reducer';

describe('reducer', () => {

	it('handles SET_STATE', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: Map({
				todos: List.of(
					Map({id: 1, text: 'React', status: 'active'}),
					Map({id: 2, text: 'Redux', status: 'active'}),
					Map({id: 3, text: 'Immutable', status: 'completed'})
				)
			})
		};

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'completed'}
			]
		}));				
	});

	it('handles SET_STATE with plain JS payload',() => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: {
				todos: [
					{id: 1, text: 'React', status: 'active'},
					{id: 2, text: 'Redux', status: 'active'},
					{id: 3, text: 'Immutable', status: 'completed'}
				]
			}
		};

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'completed'}
			]
		}));				

	});

	it('handles SET_STATE without initial state',() => {
		const action = {
			type: 'SET_STATE',
			state: {
				todos: [
					{id: 1, text: 'React', status: 'active'},
					{id: 2, text: 'Redux', status: 'active'},
					{id: 3, text: 'Immutable', status: 'completed'}
				]
			}
		};

		const nextState = reducer(undefined, action);

		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'completed'}
			]
		}));

	});

	it('handles TOGGLE_COMPLETE by changig the status from active to complete',() => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'completed'}
			]			
		});

		const action = actionCreators.toggleComplete(1);

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'completed'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'completed'}
			]
		}));			

	});	

	it('handles TOGGLE_COMPLETE by changig the status from completed to active',() => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'completed'}
			]			
		});

		const action = actionCreators.toggleComplete(3);

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'active'}
			]
		}));			

	});	

	it('handles CHANGE_FILTER by changing the filter',() => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'}
			],
			filter: 'active'
		});

		const action = actionCreators.changeFilter('active');

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'}
			],
			filter: 'active'
		}));			

	});	

	it('handles EDIT_ITEM by setting editing to true',() => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active', editing: false}
			]
		});

		const action = actionCreators.editItem(1);

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active', editing: true}
			]
		}));			

	});	

	it('handles CANCEL_EDITING by setting editing to true',() => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active', editing: true}
			]
		});

		const action = actionCreators.cancelEditing(1);

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active', editing: false}
			]
		}));			

	});	

	it('handles DONE_EDITING by setting editing to true',() => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active', editing: true}
			]
		});

		const action = actionCreators.doneEditing(1, 'Redux');

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'Redux', status: 'active', editing: false}
			]
		}));			

	});	


	it('handles CLEAR_COMPLETED by removing all the completed items',() => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'completed'}
			]
		});

		const action = actionCreators.clearCompleted();


		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'}
			]
		}));			

	});	

	it('handles ADD_ITEM by adding the item',() => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'}
			]
		});

		const action = actionCreators.addItem('Redux');


		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'}
			]
		}));			

	});	

	it('handles DELETE_ITEM by deleting the item',() => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'}
			]
		});

		const action = actionCreators.deleteItem(2);

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'}
			]
		}));			

	});	


});