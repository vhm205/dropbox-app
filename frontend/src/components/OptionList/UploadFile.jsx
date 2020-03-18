import React from 'react';

import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FileListContext } from '../FileListContext';
import { call } from '../../calls/call';
import { toast } from '../../Helper';
import Swal from 'sweetalert2';

const UploadFile = React.memo(({ isShow, handleClose }) => {
	const [path, setPath] = React.useState()
	const [fileUpload, setFileUpload] = React.useState()
	const [, , getFileList] = React.useContext(FileListContext)

	const uploadFile = async () => {
		try {
			const frmData = new FormData()
			frmData.append('file', fileUpload)
			frmData.append('path', path)
			
			const downFile = await call.post('/upload-file', frmData)

			console.log(downFile);
			

			// if(downFile.status === 200){
			// 	// Create link down
			// 	const createLinkDown = document.createElement('a')
			// 	createLinkDown.href = downFile['data']['downloadUrl']
			// 	createLinkDown.target = '_blank'
			// 	createLinkDown.click()
			// 	createLinkDown.remove()

			// 	toast(Swal, 'success', 'Download File Done!')
			// 	handleClose()
			// } else{
			// 	toast(Swal, 'error', 'Download File Failed! X(')
			// }
		} catch (error) {
			toast(Swal, 'warning', 'Server status 500')
		}
	}

	const changeFileUpload = (e) => {
		const filedata = e.target.files[0]
		const limit = 157286400 // 150 MB

		if(filedata.size >= limit){
			toast(Swal, 'error', 'Can not upload file larger than 150MB')
			return;
		}
		setFileUpload(filedata)
	}

	return (
		<Modal show={isShow} onHide={handleClose} centered={true}>
			<Modal.Header closeButton>
				<Modal.Title>Upload File</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="path-upload">Path: </InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						aria-label="Default"
						aria-describedby="path-upload"
						onChange={e => setPath(e.target.value)}
					/>
				</InputGroup>
				<InputGroup className="mb-3">
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text" id="file-upload">File Upload</span>
						</div>
						<div className="custom-file">
							<input type="file" 
									className="custom-file-input" 
									id="input-file-upload"
									name="file"
									aria-describedby="file-upload"
									onChange={changeFileUpload} />
							<label className="custom-file-label"
								   htmlFor="input-file-upload"
								   id="label-fileupload">
								Choose file
							</label>
						</div>
					</div>
				</InputGroup>
				
				<small style={{color: '#52A251'}}>
					Example: Path: /folder-name
				</small>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="warning" onClick={uploadFile}> Upload File </Button>
				<Button variant="secondary" onClick={handleClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default UploadFile
