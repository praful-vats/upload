import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    fileInput: {
      marginBottom: '20px',
    },
    uploadButton: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('files', selectedFile);

    axios.post('http://1.6.141.104/upload', formData)
      .then((response) => {
        setMessage(`File uploaded successfully! Hash: ${response.data.hash}`);
      })
      .catch((error) => {
        setMessage(`Error uploading file: ${error.response.data.error}`);
      });
  };

  return (
    <div style={styles.container}>
      <h1>Upload a File</h1>
      <input type="file" style={styles.fileInput} onChange={handleFileChange} />
      <button style={styles.uploadButton} onClick={handleFileUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
