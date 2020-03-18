import React from 'react';

import { Modal, Button, InputGroup, FormControl, Image } from 'react-bootstrap';
import { call } from '../../calls/call';
import { toast } from '../../Helper';
import Swal from 'sweetalert2';

const GetThumb = React.memo(({ isShow, handleClose }) => {
	const [filePath, setFilePath] = React.useState()
	const [imgsrc, setImage] = React.useState()

	const getThumb = async () => {
		try {
			const getThumb = await call.post('/get-thumbnail', {
				filepath: filePath
			})
			const { data: { urlDownload }, status } = getThumb

			if(status === 200){
				setImage(urlDownload)
			} else{
				toast(Swal, 'error', 'Get Thumb Failed! X(')
			}
		} catch (error) {
			toast(Swal, 'warning', 'Server status 500')
		}
	}

	return (
		<Modal show={isShow} onHide={handleClose} centered={true}>
			<Modal.Header closeButton>
				<Modal.Title>Get Thumbnail</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="file-path-thumbnail">File path: </InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						aria-label="Default"
						aria-describedby="file-path-thumbnail"
						onChange={e => setFilePath(e.target.value)}
					/>
				</InputGroup>
				<Image src={imgsrc} className="d-block" style={{objectFit: 'cover'}} thumbnail />
				
				<small style={{color: '#52A251'}}>
					Example: File path: /avatar.png
				</small>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="dark" onClick={getThumb}> Get Thumbnail </Button>
				<Button variant="danger" onClick={() => setImage('')}> Refresh </Button>
			</Modal.Footer>
		</Modal>
	)
})

export default GetThumb
