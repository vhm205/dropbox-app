import React, { useState, useContext, memo } from 'react';
import Swal from 'sweetalert2';

import { Nav, Button } from 'react-bootstrap';
import { call } from '../../calls/call';
import { FileListContext } from '../FileListContext';
import { formatBytes, isObjEmpty } from '../../Helper';
import CreateFolder from './CreateFolder';
import DeleteFile from './DeleteFile';
import CopyFile from './CopyFile';
import MoveFile from './MoveFile';
import DownloadFile from './DownloadFile';
import DownloadFolder from './DownloadFolder';
import ExportFile from './ExportFile';
import GetThumb from './GetThumb';
import UploadFile from './UploadFile';

const ToolBar = memo(() => {
	const [space, setSpace] = useState({})
	const [, setFileList] = useContext(FileListContext)
	const [isShowCreateFolder, setIsShowCreateFolder] = useState(false)
	const [isShowDeleteFile, setIsShowDeleteFile] = useState(false)
	const [isShowCopyFile, setIsShowCopyFile] = useState(false)
	const [isShowMoveFile, setIsShowMoveFile] = useState(false)
	const [isShowUpload, setIsShowUpload] = useState(false)
	const [isShowDownFile, setIsShowDownFile] = useState(false)
	const [isShowDownFolder, setIsShowDownFolder] = useState(false)
	const [isShowExportFile, setIsShowExportFile] = useState(false)
	const [isShowGetThumb, setIsShowGetThumb] = useState(false)

	const handleCloseCreateFolder = () => setIsShowCreateFolder(false)
	const handleCloseDeleteFile = () => setIsShowDeleteFile(false)
	const handleCloseCopyFile = () => setIsShowCopyFile(false)
	const handleCloseMoveFile = () => setIsShowMoveFile(false)
	const handleCloseUpload = () => setIsShowUpload(false)
	const handleCloseDownFile = () => setIsShowDownFile(false)
	const handleCloseDownFolder = () => setIsShowDownFolder(false)
	const handleCloseExportFile = () => setIsShowExportFile(false)
	const handleCloseGetThumb = () => setIsShowGetThumb(false)

	const getToken = async () => {
		const token = await call.get('/get-token')
		Swal.fire({
			title: 'Your Access Token',
			input: 'text',
			inputValue: token['data'],
			showCancelButton: false,
		})
	}

	const removeToken = () => {
		if(localStorage.getItem('access-token')){
			localStorage.removeItem('access-token')
		}
		window.location.reload()
	}

	const checkSpaceUsage = async () => {
		if(isObjEmpty(space)){
			const spaceRemain = await call.get('/space-usage')
			
			const { data: { used, allocation: { allocated } } } = spaceRemain

			const formatUsed = formatBytes(used)
			const formatSpace = formatBytes(allocated)
			setSpace({ formatUsed, formatSpace })
			
			Swal.fire({
				icon: 'info',
				title: `Bạn đã sử dụng hết ${formatUsed}`,
				text: `Dung lượng dropbox của bạn: ${formatSpace}`
			})
		} else{
			Swal.fire({
				icon: 'info',
				title: `Bạn đã sử dụng hết ${space['formatUsed']}`,
				text: `Dung lượng dropbox của bạn: ${space['formatSpace']}`
			})
		}
	}

	const searchFile = () => {
		Swal.fire({
			title: 'Search by file name or folder name',
			input: 'text',
			inputAttributes: {
			  autocapitalize: 'off'
			},
			showCancelButton: true,
			confirmButtonText: 'Look up',
			showLoaderOnConfirm: true,
			preConfirm: result => {
				return call.post('/search-file', {
					path: '',
					limit: 100,
					query: result
				}).then(res => {
					const data = res.data.map(el => el['metadata'])
					const fileList = {
						entries: data
					}
					setFileList(fileList)
					return;
				}).catch(err => {
					Swal.showValidationMessage(`Request failed: ${err}`)
				})
			},
			allowOutsideClick: () => !Swal.isLoading()
		})
	}

	return (
		<>
			<div className="toolbar-left">
				<div className="basic-tool">
					<Nav.Link href="" onClick={() => setIsShowCreateFolder(true)}>
						<i className="fas fa-folder-plus"></i>
						Create Folder
					</Nav.Link>
					<Nav.Link href="" onClick={() => setIsShowCopyFile(true)}>
						<i className="fas fa-copy"></i>
						Copy File
					</Nav.Link>
					<Nav.Link href="" onClick={() => setIsShowMoveFile(true)}>
						<i className="fas fa-expand-arrows-alt"></i>
						Move File
					</Nav.Link>
					<Nav.Link href="" onClick={() => setIsShowDeleteFile(true)}>
						<i className="fas fa-trash"></i>
						Delete File
					</Nav.Link>
				</div>
				<hr />
				<div className="advanced-tool">
					<Nav.Link href="" onClick={() => setIsShowUpload(true)}>
					<i className="fas fa-upload"></i>
						Upload File
					</Nav.Link>
					<Nav.Link href="" onClick={() => setIsShowDownFile(true)}>
					<i className="fas fa-download"></i>
						Download File
					</Nav.Link>
					<Nav.Link href="" onClick={() => setIsShowDownFolder(true)}>
						<i className="fas fa-file-archive"></i>
						Download Folder
					</Nav.Link>
					<Nav.Link href="" onClick={() => setIsShowExportFile(true)}>
						<i className="fas fa-file-export"></i>
						Export File
					</Nav.Link>
					<Nav.Link href="" onClick={() => setIsShowGetThumb(true)}>
						<i className="fas fa-images"></i>
						Get Thumbnail
					</Nav.Link>
					<Nav.Link href="" onClick={searchFile}>
						<i className="fas fa-search"></i>
						Search File
					</Nav.Link>
					<Nav.Link href="" onClick={getToken}>
						<i className="fas fa-tools"></i>
						Get Token
					</Nav.Link>
					<Nav.Link href="" onClick={checkSpaceUsage}>
						<i className="fas fa-user-check"></i>
						Check Space Usage
					</Nav.Link>
					<Button variant="danger" className="mt-3 ml-3" onClick={removeToken}>Remove Token</Button>
				</div>

				<CreateFolder isShow={isShowCreateFolder} handleClose={handleCloseCreateFolder} />
				<DeleteFile isShow={isShowDeleteFile} handleClose={handleCloseDeleteFile} />
				<CopyFile isShow={isShowCopyFile} handleClose={handleCloseCopyFile} />
				<MoveFile isShow={isShowMoveFile} handleClose={handleCloseMoveFile} />

				<UploadFile isShow={isShowUpload} handleClose={handleCloseUpload} />
				<DownloadFile isShow={isShowDownFile} handleClose={handleCloseDownFile} />
				<DownloadFolder isShow={isShowDownFolder} handleClose={handleCloseDownFolder} />
				<ExportFile isShow={isShowExportFile} handleClose={handleCloseExportFile} />
				<GetThumb isShow={isShowGetThumb} handleClose={handleCloseGetThumb} />
			</div>
		</>
	)
})

export default ToolBar
