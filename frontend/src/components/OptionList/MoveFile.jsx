import React from 'react';

import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FileListContext } from '../FileListContext';
import { call } from '../../calls/call';
import { toast } from '../../Helper';
import Swal from 'sweetalert2';

const MoveFile = React.memo(({ isShow, handleClose }) => {
	const [fromPath, setFromPath] = React.useState()
	const [toPath, setToPath] = React.useState()
	const [, , getFileList] = React.useContext(FileListContext)

	const moveFile = async () => {
		try {
			const moveFile = await call.post('/move-file', {
				from_path: fromPath,
				to_path: toPath
			})
			if(moveFile.status === 200){
				getFileList()
				toast(Swal, 'success', 'Move File Done!')
				handleClose()
			} else{
				toast(Swal, 'error', 'Move File Failed! X(')
			}
		} catch (error) {
			toast(Swal, 'warning', 'Server status 500')
		}
	}

	return (
		<Modal show={isShow} onHide={handleClose} centered={true}>
			<Modal.Header closeButton>
				<Modal.Title>Move File</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="from-path-move">From path: </InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						aria-label="Default"
						aria-describedby="from-path-move"
						onChange={e => setFromPath(e.target.value)}
					/>
				</InputGroup>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="to-path-move">To path: </InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						aria-label="Default"
						aria-describedby="to-path-move"
						onChange={e => setToPath(e.target.value)}
					/>
				</InputGroup>

				<small style={{color: '#52A251'}}>
					Example: from path: /test.txt <br />
					&emsp;&emsp;&emsp;&emsp;&nbsp; to path: /Tools/test.txt
				</small>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="primary" onClick={moveFile}>Move File</Button>
				<Button variant="secondary" onClick={handleClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default MoveFile
