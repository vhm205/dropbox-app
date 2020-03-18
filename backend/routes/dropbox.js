const fetch = require('isomorphic-fetch');
const fs = require('fs')
const router = require('express').Router()
const Dropbox = require('dropbox').Dropbox

let dbx = null;
// 'bFlk_VI6NTAAAAAAAAAADUcmyb0ibq7GXNhakyJ27G4S_P3MKIKmHy44WxyjC8Md'
// 'vK_LB7g6hmAAAAAAAAAAWy5kJtpu2xKvtdyhKWgc3cgMg1AG1RwXMOkJUw8IbZEg' 

const pathDownloads = './public/downloads'

const writeFileBinary = (file, des) => {
	let fileBinary = file['fileBinary'];

	let buf = Buffer.from(fileBinary);

	let wsStream = fs.createWriteStream(des);
	wsStream.write(buf);

	wsStream.on('finish', function () {
		console.log('Write file done!!');
	})
	wsStream.end();
}

router.get('/access-token', (req, res) => {
	try {
		const token = req.query.token
		dbx = new Dropbox({
			fetch: fetch,
			accessToken: token
		})

		return res.status(200).json(token)
	} catch (error) {
		return res.status(500).json(error)
	}	
})

router.post('/del', async (req, res) => {
	const url = req.body.url
	const filename = url.split('/').slice(-1)[0]

	if(__dirname.endsWith('routes')){
		const indexRoutes = __dirname.indexOf('routes')
		const removeRoutes = __dirname.substr(0, indexRoutes)
		fs.unlinkSync(`${removeRoutes}public/downloads/${filename}`)
	}
	
	return res.sendStatus(204)
})

router.get('/account-info', async (req, res) => {
	try {
		const currentUser = await dbx.usersGetCurrentAccount()
		return res.status(200).json(currentUser)
	} catch (error) {
		return res.status(500).send(error)
	}
})

router.get('/file-list-folder', async (req, res) => {
	try {
		const files = await dbx.filesListFolder({path: ''})
		return res.status(200).json(files)
	} catch (error) {
		return res.status(500).send(error)
	}
})

router.post('/create-folder', async (req, res) => {
	try {
		// Example: /newFolder
		const folderpath = req.body.folderpath
		const createFolder = await dbx.filesCreateFolder({ 
			path: folderpath, 
			autorename: true
		})

		return res.status(200).json(createFolder)
	} catch (error) {
		return res.status(500).send(error)
	}
})

router.post('/copy-file', async (req, res) => {
	try {
		/* Example:
			from_path: /test.txt
			to_path: /Tools/test.txt
		*/
		const from_path = req.body.from_path
		const to_path = req.body.to_path
		const copy = await dbx.filesCopy({
			from_path: from_path,
			to_path: to_path,
			autorename: true
		})

		return res.status(200).json(copy)
	} catch (error) {
		return res.status(500).send(error)
	}
})

router.post('/move-file', async (req, res) => {
	try {
		/* Example:
			from_path: /test.txt
			to_path: /Tools/test.txt
		*/
		const from_path = req.body.from_path
		const to_path = req.body.to_path
		const moveFile = await dbx.filesMove({
			from_path: from_path,
			to_path: to_path,
			autorename: true
		})

		return res.status(200).json(moveFile)
	} catch (error) {
		return res.status(500).send(error)
	}
})

router.post('/delete-file', async (req, res) => {
	try {
		// Example: /test.txt
		const filepath = req.body.filepath
		const delFile = await dbx.filesDelete({path: filepath})

		return res.status(200).json(delFile)
	} catch (error) {
		return res.status(500).send(error)
	}
})

router.post('/download-file', async (req, res) => {
	try {
		// Example: /BCCD_VHM.rar
		const filepath = req.body.filepath
		const downFile = await dbx.filesDownload({path: filepath})
		const destination = `${pathDownloads}/${downFile['name']}`

		// create file from binary
		writeFileBinary(downFile, destination)
		
		const urlDownload = `${req.protocol}://${req.get('host')}/downloads/${downFile['name']}`

		res.setHeader('Content-Type', 'application/binary')
		res.setHeader('Content-Disposition', 'attachment; filename=' + downFile['name'])

		return res.status(200).json({
			id: 			 downFile['id'],
			name: 			 downFile['name'],
			path_display: 	 downFile['path_display'],
			client_modified: downFile['client_modified'],
			size: 			 downFile['size'],
			downloadUrl:	 urlDownload
		})
	} catch (error) {
		return res.status(500).send(error)
	}
})

router.post('/download-folder', async (req, res) => {
	try {
		// Example: /Tools
		const folderpath = req.body.folderpath
		const folderDownload = await dbx.filesDownloadZip({path: folderpath})
		const fullname = `${folderDownload['metadata']['name']}.zip`
		const destination = `${pathDownloads}/${fullname}`

		// create folder zip from binary
		writeFileBinary(folderDownload, destination)

		const urlDownload = `${req.protocol}://${req.get('host')}/downloads/${fullname}`	

		res.setHeader('Content-Type', 'application/zip')
		res.setHeader('Content-Disposition', 'attachment; filename=' + fullname)
		
		return res.status(200).json({
			id: folderDownload['metadata']['id'],
			name: folderDownload['metadata']['name'],
			path_display: folderDownload['metadata']['path_display'],
			downloadUrl: urlDownload
		})
	} catch (error) {
		return res.status(500).send(error)
	}
})

router.post('/export-file', async (req, res) => {
	try {
		// Example: /_ Note. 2020.paper
		const filepath = req.body.filepath
		const fileExport = await dbx.filesExport({path: filepath})
		const fullname = fileExport['export_metadata']['name']
		const destination = `${pathDownloads}/${fullname}`

		// create file from binary
		writeFileBinary(fileExport, destination)

		const urlDownload = `${req.protocol}://${req.get('host')}/downloads/${fullname}`

		res.setHeader('Content-Type', 'application/html')
		res.setHeader('Content-Disposition', 'attachment; filename=' + fullname)

		return res.status(200).json({
			export_metadata: fileExport['export_metadata'],
			file_metadata: fileExport['file_metadata'],
			downloadUrl: urlDownload
		})
	} catch (error) {
		return res.status(500).send(error)
	}
})

router.post('/get-thumbnail', async (req, res) => {
	try {
		// Example: /girl.png
		const filepath = req.body.filepath
		const getThumb = await dbx.filesGetThumbnail({
			path: filepath,
			format: { ".tag": "png", },
			size: 	{ ".tag": "w640h480" },
			mode: 	{ ".tag": "strict" }
		})
		const fullname = getThumb['name']
		const destination = `${pathDownloads}/${fullname}`

		// create thumbnail image from binary
		writeFileBinary(getThumb, destination)

		const urlDownload = `${req.protocol}://${req.get('host')}/downloads/${fullname}`

		return res.status(200).json({ ...getThumb, urlDownload})
	} catch (error) {
		return res.status(500).send(error)
	}
})

router.post('/search-file', async (req, res) => {
	try {
		/* Example: 
			path: ''
			query: '*.txt'
			max_results: 1
		*/
		const { path, query, limit } = req.body
		
		const fileSearch = await dbx.filesSearch({
			path: path,
			query: query,
			max_results: limit
		})	

		return res.status(200).json(fileSearch['matches'])
	} catch (error) {
		return res.status(500).send(error)
	}
})

router.get('/space-usage', async (req, res) => {
	try {
		const getSpace =  await dbx.usersGetSpaceUsage()
		return res.status(200).json(getSpace)
	} catch (error) {
		return res.status(500).send(error)
	}
})

router.get('/get-token', async (req, res) => {
	try {
		const accessToken = await dbx.getAccessToken()
		return res.status(200).json(accessToken)
	} catch (error) {
		return res.status(500).send(error)
	}
})

router.post('/upload-file', async (req, res) => {
	try {
		// Parameter contents use multiform-data in html to upload file
		const { file, path } = req
		
		const fileUploaded = await dbx.filesUpload({
			contents: file,
			path: '/',
			mode: { ".tag": "update" },
			strict_conflict: true
		})
		
		return res.status(200).json(fileUploaded)
	} catch (error) {
		return res.status(500).send(error)
	}
})

module.exports = router
