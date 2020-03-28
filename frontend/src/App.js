import React, { useEffect, useState, Suspense, lazy } from 'react';
import qs from 'qs';
import Swal from 'sweetalert2';
import { call } from './calls/call';
import { FileListProvider } from './components/FileListContext';
import { Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Welcome = lazy(() => import('./components/Welcome/Welcome'))
const ToolBar = lazy(() => import('./components/OptionList/ToolBar'))
const FileList = lazy(() => import('./components/FileList/FileList'))

const baseURL = `${window.location.protocol}//${window.location.host}`

const App = () => {	
	const [token, setToken] = useState('')

	useEffect(() => {
		const getToken = localStorage.getItem('access-token');
		const searchUrl = new URLSearchParams(window.location.href)

		if(!searchUrl.has('code') && !getToken){
			Swal.fire({
				title: 'Connect to Dropbox',
				text: "Get all files of you from dropbox",
				icon: 'question',
				showCancelButton: false,
				confirmButtonText: 'Connect',
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
			}).then((result) => {
				if (result.value) {
					const link = document.createElement('a')
					link.href = `http://localhost:1002/dropbox/auth`
					link.target = '_self'
					link.click()
					link.remove()
				}
			})
		}

		if(searchUrl.has('code') && !getToken){
			(async () => {
				const code = searchUrl.get('code')
				const params = {
					code: code,
					grant_type: 'authorization_code',
					client_id: 'w3lyl35xxwokx39',
					client_secret: 'qo55aeeoc9f24e3',
					redirect_uri: baseURL
				} 
				
				const result = await call.post('https://api.dropboxapi.com/oauth2/token', qs.stringify(params), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				})

				const token = await call.get(`/access-token?token=${result.data['access_token']}`)
				setToken(token.data)
				localStorage.setItem('access-token', token.data)
			})()

		} else{
			setToken(getToken)
		}


		// if(!getToken){
		// 	Swal.fire({
		// 		title: 'Enter your token',
		// 		input: 'text',
		// 		inputAttributes: {
		// 		autocapitalize: 'off'
		// 		},
		// 		showCancelButton: true,
		// 		confirmButtonText: 'Access',
		// 		showLoaderOnConfirm: true,
		// 		preConfirm: result => {
		// 			call.get(`/access-token?token=${result}`).then(res => {
		// 				setToken(res.data)
		// 				localStorage.setItem('access-token', res.data)
		// 				return;
		// 			}).catch(err => {
		// 				Swal.showValidationMessage(`Request failed: ${err}`)
		// 			})
		// 		},
		// 		allowOutsideClick: () => !Swal.isLoading()
		// 	})
		// } else{
		// 	setToken(getToken)
		// }
	}, [])

	return (
		<>
			{token ? (
				<Suspense fallback={<>Loading...</>}>
					<FileListProvider>
						<Container fluid>
							<Welcome />
							<Row>
								<Col md={9}>
									<FileList />
								</Col>
								<Col md={3}>
									<ToolBar />
								</Col>
							</Row>
						</Container>
					</FileListProvider>
				</Suspense>
			) : null}
		</>
	)
}

export default App;
