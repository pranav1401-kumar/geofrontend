import React, { useState } from 'react';
import { uploadFile } from '../services/api';

const FileUpload = ({ token }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            await uploadFile(formData, token);
            alert('File uploaded successfully');
        } catch (err) {
            alert('File upload failed');
        }
    };

    return (
        <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} accept=".geojson,.kml" required />
            <button type="submit">Upload File</button>
        </form>
    );
};

export default FileUpload;
