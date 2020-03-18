import React, { useState, useEffect, createContext } from 'react';
import { call } from '../calls/call';

export const FileListContext = createContext()

export const FileListProvider = props => {
	const [fileList, setFileList] = useState({})

	const getFileList = async () => {
		const files = await call.get('/file-list-folder')
		setFileList(files.data)
	}
	
	useEffect(() => {
		getFileList()
	}, [])

	return (
		<FileListContext.Provider value={[fileList, setFileList, getFileList]}>
			{props.children}
		</FileListContext.Provider>
	)
}
