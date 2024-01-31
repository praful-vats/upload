import React, { useState } from 'react';
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
const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('/upload?files=', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        console.log('File uploaded successfully:', result);
        setSelectedFile(null);
      } catch (error) {
        console.error('Error during file upload:', error);
      }
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="file"
        style={styles.fileInput}
        onChange={handleFileChange}
      />
      <button style={styles.uploadButton} onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default App;