import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

const Input = ({ ...props }) => {
	return (
		<InputGroup className="mb-3">
			<InputGroup.Prepend>
				<InputGroup.Text id={`basic-addon${props.id}`}>
					{props.field}
				</InputGroup.Text>
			</InputGroup.Prepend>
			<FormControl
				placeholder={props.type}
				aria-label={props.type}
				aria-describedby={`basic-addon${props.id}`}
				defaultValue={props.value}
			/>
		</InputGroup>
	)
}

export default Input
