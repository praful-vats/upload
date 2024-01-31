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

      axios.defaults.xsrfHeaderName = "X-CSRFToken";
      axios.defaults.xsrfCookieName = "csrftoken";
      const options = {
        url: `http://1.6.141.104/upload?files=`,
        method: "POST",
        headers,
        data: formData,
      };
      axios(options)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
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