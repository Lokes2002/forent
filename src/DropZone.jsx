import { useCallback, useState } from 'react';

const DropZone = ({ onFileSelect }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="drop-zone-container">
      <div 
        className={`drop-area ${isDragOver ? 'drag-active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input 
          type="file" 
          id="file-input"
          accept=".pdf,.jpg,.jpeg,.png" 
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        <div className="drop-content">
          <div className="upload-icon">
            📁
          </div>
          <h3>Drop your file here</h3>
          <p>or click to browse</p>
          <div className="supported-formats">
            <span>PDF, JPG, PNG supported</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropZone;