import React from 'react';

import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FileListContext } from '../FileListContext';
import { call } from '../../calls/call';
import { toast } from '../../Helper';
import Swal from 'sweetalert2';

const CreateFolder = React.memo(({ isShow, handleClose }) => {
	const [path, setPath] = React.useState()
	const [, , getFileList] = React.useContext(FileListContext)
	
	const createFolder = async () => {
		try {
			const createNewFolder = await call.post('/create-folder', {
				folderpath: path
			})
			if(createNewFolder.status === 200){
				getFileList()
				toast(Swal, 'success', 'Create Folder Done!')
				handleClose()
			} else{
				toast(Swal, 'error', 'Create Folder Failed! X(')
			}
		} catch (error) {
			toast(Swal, 'warning', 'Server status 500')
		}
	}

	return (
		<Modal show={isShow} onHide={handleClose} centered={true}>
			<Modal.Header closeButton>
				<Modal.Title>Create New Folder</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="path">Path: </InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						aria-label="Default"
						aria-describedby="path"
						onChange={e => setPath(e.target.value)}
					/>
				</InputGroup>
				<small style={{color: '#52A251'}}>Example: /folder-name</small>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="primary" onClick={createFolder}>Create Folder</Button>
				<Button variant="secondary" onClick={handleClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default CreateFolder
