import React from 'react';
import { Col, Accordion, Card, Button } from 'react-bootstrap';
import { formatBytes } from '../../Helper';

const styles = {
	icon: {
		fontSize: '20px',
		marginRight: '5px'
	}
}

const File = ({ fileinfo }) => {
	return (
		<Col md={12} className="mb-3">
			<Accordion defaultActiveKey="1">
				{fileinfo['.tag'] === 'file' ? (
					<Card>
						<Card.Header>
							<Accordion.Toggle as={Button} variant="link" eventKey="0">
								<i className="fa fa-file-alt" style={styles.icon}></i>
								<span>{fileinfo['path_display']}</span>
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<p>File name: {fileinfo['name']}</p>
								<p>Size: {formatBytes(fileinfo['size'])}</p>
								<p>Modified: {fileinfo['client_modified']}</p>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				) : (fileinfo['.tag'] === 'folder' ? (
					<Card>
						<Card.Header>
							<Accordion.Toggle as={Button} variant="link" eventKey="0">
								<i className="fa fa-folder" style={styles.icon}></i>
								<span >{fileinfo['path_display']}</span>
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<p>Folder name: {fileinfo['name']}</p>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				) : {fileinfo})}
			</Accordion>
		</Col>
	)
}

export default File;
