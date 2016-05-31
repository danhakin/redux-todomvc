import React from 'react';

class TextInput extends React.Component {

	render() {
		return(
			<input className="edit"
				   autoFocus={true}
				   type="text" />
		);
	}

}

export default TextInput