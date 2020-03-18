import React from 'react';

import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { call } from '../../calls/call';
import { toast } from '../../Helper';
import Swal from 'sweetalert2';

const DownloadFolder = React.memo(({ isShow, handleClose }) => {
	const [folderPath, setFolderPath] = React.useState()

	const downloadFolder = async () => {
		try {
			const downFolder = await call.post('/download-folder', {
				folderpath: folderPath
			})
			const linkDown = downFolder['data']['downloadUrl']

			if(downFolder.status === 200){
				// Create link down
				const createLinkDown = document.createElement('a')
				createLinkDown.href = linkDown
				createLinkDown.target = '_blank'
				createLinkDown.click()
				createLinkDown.remove()

				toast(Swal, 'success', 'Download Folder Done!')
				handleClose()
			} else{
				toast(Swal, 'error', 'Download Folder Failed! X(')
			}
		} catch (error) {
			toast(Swal, 'warning', 'Server status 500')
		}
	}

	return (
		<Modal show={isShow} onHide={handleClose} centered={true}>
			<Modal.Header closeButton>
				<Modal.Title>Download Folder</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="download-path-folder">Folder Path: </InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						aria-label="Default"
						aria-describedby="download-path-folder"
						onChange={e => setFolderPath(e.target.value)}
					/>
				</InputGroup>
				
				<small style={{color: '#52A251'}}>
					Example: Folder path: /folder-name
				</small>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="info" onClick={downloadFolder}> Download Folder </Button>
				<Button variant="secondary" onClick={handleClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default DownloadFolder
