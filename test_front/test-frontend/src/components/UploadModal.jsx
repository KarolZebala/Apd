import React, { useState } from "react";
import { updateDiploma } from "../api/userApi";

const UploadModal = ({ diploma, onClose }) => {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50MB.");
      return;
    }
    setError("");
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64File = reader.result.split(",")[1];

        const payload = {
          diplomaId: diploma.id,
          description: "Uploaded by student",
          attachments: [
            {
              title: file.name,
              size: file.size,
              extension: file.name.split(".").pop(),
              data: base64File,
              contentType: file.type,
            },
          ],
          tags: tags.split(",").map((tag) => ({ name: tag.trim() })),
        };

        await updateDiploma(payload);
        onClose();
      };
    } catch (error) {
      setError("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Upload PDF for {diploma.title}</h3>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="Enter tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UploadModal;
