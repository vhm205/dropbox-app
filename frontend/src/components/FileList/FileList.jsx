import React, { memo, useContext } from 'react';
import { FileListContext } from '../FileListContext';
import { isObjEmpty } from '../../Helper';
import File from './File';

const FileList = memo(() => {	
	const [fileList] = useContext(FileListContext)

	return (
		<>
			{!isObjEmpty(fileList) ? (
				fileList.entries.map((el, i) => (
					<File key={i} fileinfo={el} />
				))
			) : null}
		</>
	)
})

export default FileList
