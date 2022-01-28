import React from 'react';
import styled from 'styled-components';
import Editor from './components/Editor';
import Spinner from './components/Spinner';
import { color, mixin } from './shered/styles';

const Title = styled.h1`
	margin:0;
	height:8rem; 
	font-size: 3rem;
	${mixin.center}
	color: ${color.primaryLight};
`;

const Form = styled.form`
	text-align:center;
`;

const ChooseLabel = styled.label`
	color:${color.tertiary};
	display: inline-block;
  padding: 1.2rem 2.4rem;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${color.primaryDark};
  font-size: 1.7rem;
	font-weight:600;
	
	&.disabled{
		background-color: ${color.secondaryLight};
	}
`;

const ChooseInput = styled.input`
  visibility:hidden;
	position: absolute;
	left:0;
	width:0;
`;

const ChooseError = styled.p`
  color:${color.error};
	font-size: 2rem;
`;

const EditorBox = styled.div`
	/* background: ${color.primaryDark}; */
	color:${color.secondaryDark};
	margin: auto;
	width:90%;
	max-width: 1400px;
	min-height: 40rem;
	border-radius: 2rem;
	padding:2rem;
	${mixin.center}
`;

const DownloadButton = styled.button`
	color:${color.tertiary};
	display: inline-block;
  padding: 1.2rem 2.4rem;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${color.primaryDark};
  font-size: 1.7rem;
	font-weight:600;
	margin-bottom: 3rem;
`;

function App() {
	const [file, setFile] = React.useState<string>('');
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<boolean>(false);

	const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
		setError(false);
		setLoading(true);
		const fileReader = new FileReader();
		if (event.target.files) {
			if (event.target.files[0]?.type === 'application/json') {
				fileReader.readAsText(event.target.files[0], 'UTF-8');
				fileReader.onload = (e) => {
					if (e.target && e.target.result) {
						setFile(e.target.result.toString());
						setLoading(false);
					}
				};
			} else if (!event.target.files[0]) {
				setLoading(false);
			} else {
				event.target.value = '';
				setError(true);
				setLoading(false);
				setFile('');
			}
		}
	};

	return (
		<>
			<Title>JSON EDITOR</Title>
			<Form onSubmit={(e) => { e.preventDefault(); }}>
				<div>
					<ChooseLabel htmlFor="file-input" className={loading ? 'disabled' : ''}>
						Choose file
					</ChooseLabel>
					<ChooseInput type="file" id="file-input" name="imageuploads" accept="application/json" onChange={changeHandler} disabled={loading} />
					{error && <ChooseError>The selected file must be JSON file!</ChooseError>}
				</div>
				<EditorBox>{loading ? <Spinner /> : <Editor file={file} />}</EditorBox>
				{!error && file && <DownloadButton type="submit">Download JSON file</DownloadButton>}
			</Form>

		</>
	);
}

export default App;
