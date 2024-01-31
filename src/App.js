  // import React, { useState } from 'react';
  // import axios from axios;
  // const styles = {
  //   container: {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //     padding: '20px',
  //   },
  //   fileInput: {
  //     marginBottom: '20px',
  //   },
  //   uploadButton: {
  //     padding: '10px 20px',
  //     backgroundColor: '#007BFF',
  //     color: 'white',
  //     border: 'none',
  //     borderRadius: '5px',
  //     cursor: 'pointer',
  //   },
  // };
  // const App = () => {
  //   const [selectedFile, setSelectedFile] = useState(null);

  //   const handleFileChange = (e) => {
  //     setSelectedFile(e.target.files[0]);
  //   };

  //   const handleUpload = async () => {
  //     if (selectedFile) {
  //       const formData = new FormData();
  //       formData.append('file', selectedFile);

  //       axios.defaults.xsrfHeaderName = "X-CSRFToken";
  //       axios.defaults.xsrfCookieName = "csrftoken";
  //       const options = {
  //         url: `http://1.6.141.104/upload?files=`,
  //         method: "POST",
  //         data: formData,
  //       };
  //       axios(options)
  //         .then((response) => {
  //           console.log(response);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     } else {
  //       console.log('No file selected');
  //     }
  //   };

  //   return (
  //     <div style={styles.container}>
  //       <input
  //         type="file"
  //         style={styles.fileInput}
  //         onChange={handleFileChange}
  //       />
  //       <button style={styles.uploadButton} onClick={handleUpload}>
  //         Upload
  //       </button>
  //     </div>
  //   );
  // };

  // export default App;


import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

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
    <div>
      <h1>Upload a File</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
