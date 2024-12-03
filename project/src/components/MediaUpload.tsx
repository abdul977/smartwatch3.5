import React, { useState, useRef } from 'react';
import { Upload, X, Image, Film } from 'lucide-react';

interface MediaUploadProps {
  onMediaSelect: (files: File[]) => void;
  selectedFiles: File[];
  maxFiles?: number;
}

export function MediaUpload({ onMediaSelect, selectedFiles, maxFiles = 5 }: MediaUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );

    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const files = Array.from(e.target.files).filter(file => 
        file.type.startsWith('image/') || file.type.startsWith('video/')
      );
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const totalFiles = selectedFiles.length + files.length;
    if (totalFiles > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files`);
      return;
    }
    onMediaSelect([...selectedFiles, ...files]);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    onMediaSelect(newFiles);
  };

  const getFilePreview = (file: File) => {
    if (file.type.startsWith('video/')) {
      return URL.createObjectURL(file);
    }
    return URL.createObjectURL(file);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600">
          Drag and drop your photos/videos here, or click to select
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Supported formats: JPG, PNG, GIF, MP4, MOV (max {maxFiles} files)
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                {file.type.startsWith('video/') ? (
                  <div className="relative w-full h-full">
                    <video
                      src={getFilePreview(file)}
                      className="w-full h-full object-cover"
                    />
                    <Film className="absolute inset-0 m-auto w-8 h-8 text-white opacity-75" />
                  </div>
                ) : (
                  <img
                    src={getFilePreview(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}