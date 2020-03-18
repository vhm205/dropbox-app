import React, { useEffect, useState, Suspense, lazy } from 'react';
import Swal from 'sweetalert2';
import { Container, Row, Col } from 'react-bootstrap';
import { FileListProvider } from './components/FileListContext';
import { call } from './calls/call';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Welcome = lazy(() => import('./components/Welcome/Welcome'))
const ToolBar = lazy(() => import('./components/OptionList/ToolBar'))
const FileList = lazy(() => import('./components/FileList/FileList'))

const App = () => {	
	const [token, setToken] = useState('')

	useEffect(() => {
		const getToken = localStorage.getItem('access-token');
		
		if(!getToken){
			Swal.fire({
				title: 'Enter your token',
				input: 'text',
				inputAttributes: {
				autocapitalize: 'off'
				},
				showCancelButton: true,
				confirmButtonText: 'Access',
				showLoaderOnConfirm: true,
				preConfirm: result => {
					call.get(`/access-token?token=${result}`).then(res => {
						setToken(res.data)
						localStorage.setItem('access-token', res.data)
						return;
					}).catch(err => {
						Swal.showValidationMessage(`Request failed: ${err}`)
					})
				},
				allowOutsideClick: () => !Swal.isLoading()
			})
		} else{
			setToken(getToken)
		}
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
