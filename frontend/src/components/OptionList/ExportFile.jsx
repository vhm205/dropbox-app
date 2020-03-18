import React from 'react';

import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { call } from '../../calls/call';
import { toast } from '../../Helper';
import Swal from 'sweetalert2';

const ExportFile = React.memo(({ isShow, handleClose }) => {
	const [filePath, setFilePath] = React.useState()

	const exportFile = async () => {
		try {
			const exportFile = await call.post('/export-file', {
				filepath: filePath
			})

			if(exportFile.status === 200){
				// Create link down
				const createLinkDown = document.createElement('a')
				createLinkDown.href = exportFile['data']['downloadUrl']
				createLinkDown.target = '_blank'
				createLinkDown.click()
				createLinkDown.remove()

				toast(Swal, 'success', 'Export File Done!')
				handleClose()
			} else{
				toast(Swal, 'error', 'Export File Failed! X(')
			}
		} catch (error) {
			toast(Swal, 'warning', 'Server status 500')
		}
	}

	return (
		<Modal show={isShow} onHide={handleClose} centered={true}>
			<Modal.Header closeButton>
				<Modal.Title>Export File</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="export-file">Export File: </InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						aria-label="Default"
						aria-describedby="export-file"
						onChange={e => setFilePath(e.target.value)}
					/>
				</InputGroup>
				
				<small style={{color: '#52A251'}}>
					Example: File path: /note.paper
				</small>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="success" onClick={exportFile}> Export File </Button>
				<Button variant="secondary" onClick={handleClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default ExportFile
