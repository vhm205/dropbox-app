import React, { useState, useEffect, useContext } from 'react';
import { Jumbotron, Button, ButtonGroup } from 'react-bootstrap';

import Profile from '../Profile/Profile';
import { FileListContext } from '../FileListContext';
import { call } from '../../calls/call';
import { isObjEmpty } from '../../Helper';

const Welcome = () => {
	const [userInfo, setUserInfo] = useState({})
	const [show, setShow] = useState(false)
	const [,, getFileList] = useContext(FileListContext)

	const handleClose = () => setShow(false)
	const handleOpen = () => setShow(true)

	useEffect(() => {
		(async () => {
			const info = await call.get('/account-info')
			setUserInfo(info.data)
		})()
	}, [])

	return (
		<Jumbotron>
			<h1>Hello, welcome to dropbox!</h1>
			<p>
				This is a simple hero unit, a simple jumbotron-style component for calling
				extra attention to featured content or information.
			</p>
			<ButtonGroup aria-label="Basic example">
				<Button variant="primary" onClick={handleOpen}>Your Profile</Button>
				<Button variant="warning" onClick={getFileList}>Refresh</Button>
			</ButtonGroup>
			{!isObjEmpty(userInfo) ? <Profile userinfo={userInfo} show={show} handleClose={handleClose} /> : null}
		</Jumbotron>
	)
}

export default Welcome
