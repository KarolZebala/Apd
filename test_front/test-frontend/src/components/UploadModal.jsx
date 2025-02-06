import React, { useState, useEffect } from "react";
import { updateDiploma } from "../api/userApi";

const UploadModal = ({ diploma, onClose }) => {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    console.log("Received diploma:", diploma);
  }, [diploma]);

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

    if (!diploma || !diploma.diplomaId) {
      setError("Invalid diploma information.");
      console.error("Invalid diploma:", diploma);
      return;
    }

    setLoading(true);
    setIsLocked(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64File = reader.result.split(",")[1];

        const payload = {
          diplomaId: diploma.diplomaId,
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

        setIsSuccess(true);

        setTimeout(() => {
          onClose(); // Zamknięcie modala
          window.location.reload(); // Odświeżenie strony
        }, 3000);
      };
    } catch (error) {
      setError("Failed to upload file.");
      console.error("Upload error:", error);
      setIsLocked(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      {isSuccess && (
        <div className="success-message-overlay">
          <p>File uploaded successfully!</p>
        </div>
      )}
      {isLocked && <div className="interaction-blocker"></div>}

      <div className="modal-content">
        <h3>Upload PDF for {diploma?.title || "Unknown Diploma"}</h3>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={isLocked}
        />
        <input
          type="text"
          placeholder="Enter tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          disabled={isLocked}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleUpload} disabled={loading || isLocked}>
          {loading ? "Uploading..." : "Upload"}
        </button>
        <button onClick={onClose} disabled={isLocked}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
