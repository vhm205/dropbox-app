import React, { memo } from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import Input from './Input';

const Profile = memo(({ userinfo, show, handleClose }) => {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Your Profile</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Input id={"1" }
					   type="Username" 
					   field={'Display name: '} 
					   value={userinfo.name['display_name']} 
				/>
				<Input id="2" 
					   type="Email" 
					   field={'Email: '} 
					   value={userinfo.email} 
				/>
				<Input id="3" 
					   type="Country" 
					   field={'Country: '} 
					   value={userinfo.country} 
				/>
				<Image src={userinfo.profile_photo_url} thumbnail />
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" block onClick={handleClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default Profile
