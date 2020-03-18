import React from 'react';

import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FileListContext } from '../FileListContext';
import { call } from '../../calls/call';
import { toast } from '../../Helper';
import Swal from 'sweetalert2';

const DeleteFile = React.memo(({ isShow, handleClose }) => {
	const [filePath, setFilePath] = React.useState()
	const [, , getFileList] = React.useContext(FileListContext)

	const deleteFile = async () => {
		try {
			const deleteFile = await call.post('/delete-file', {
				filepath: filePath
			})
			if(deleteFile.status === 200){
				getFileList()
				toast(Swal, 'success', 'Delete File Done!')
				handleClose()
			} else{
				toast(Swal, 'error', 'Delete File Failed! X(')
			}
		} catch (error) {
			toast(Swal, 'warning', 'Server status 500')
		}
	}

	return (
		<Modal show={isShow} onHide={handleClose} centered={true}>
			<Modal.Header closeButton>
				<Modal.Title>Delete File</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="file-path">File path: </InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						aria-label="Default"
						aria-describedby="file-path"
						onChange={e => setFilePath(e.target.value)}
					/>
				</InputGroup>
				<small style={{color: '#52A251'}}>Example: /test.txt</small>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="danger" onClick={deleteFile}>Delete File</Button>
				<Button variant="secondary" onClick={handleClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default DeleteFile
