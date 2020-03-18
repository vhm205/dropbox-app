import React from 'react';

import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { call } from '../../calls/call';
import { toast } from '../../Helper';
import Swal from 'sweetalert2';

const DownloadFile = React.memo(({ isShow, handleClose }) => {
	const [filePath, setFilePath] = React.useState()

	const downloadFile = async () => {
		try {
			const downFile = await call.post('/download-file', {
				filepath: filePath
			})

			if(downFile.status === 200){
				// Create link down
				const createLinkDown = document.createElement('a')
				createLinkDown.href = downFile['data']['downloadUrl']
				createLinkDown.target = '_blank'
				createLinkDown.click()
				createLinkDown.remove()

				toast(Swal, 'success', 'Download File Done!')
				handleClose()
			} else{
				toast(Swal, 'error', 'Download File Failed! X(')
			}
		} catch (error) {
			toast(Swal, 'warning', 'Server status 500')
		}
	}

	return (
		<Modal show={isShow} onHide={handleClose} centered={true}>
			<Modal.Header closeButton>
				<Modal.Title>Download File</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="download-path">File Path: </InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						aria-label="Default"
						aria-describedby="download-path"
						onChange={e => setFilePath(e.target.value)}
					/>
				</InputGroup>
				
				<small style={{color: '#52A251'}}>
					Example: File path: /test.txt 
				</small>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="info" onClick={downloadFile}> Download File </Button>
				<Button variant="secondary" onClick={handleClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default DownloadFile
