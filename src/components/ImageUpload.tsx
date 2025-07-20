import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  uploadedImage: File | null;
  onClearImage: () => void;
  isLoading?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  uploadedImage,
  onClearImage,
  isLoading = false,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onImageUpload(acceptedFiles[0]);
      }
      setDragActive(false);
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  if (uploadedImage) {
    return (
      <div className="relative group">
        <div className="relative overflow-hidden rounded-lg border border-primary/20 bg-card shadow-card">
          <img
            src={URL.createObjectURL(uploadedImage)}
            alt="Uploaded preview"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <Button
            variant="destructive"
            size="icon"
            onClick={onClearImage}
            disabled={isLoading}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-2 text-sm text-muted-foreground text-center">
          {uploadedImage.name}
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300",
        isDragActive || dragActive
          ? "border-primary bg-primary/5 shadow-glow"
          : "border-primary/20 hover:border-primary/40 hover:bg-primary/5",
        isLoading && "pointer-events-none opacity-50"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            {isDragActive || dragActive ? (
              <ImageIcon className="w-8 h-8 text-primary-foreground" />
            ) : (
              <Upload className="w-8 h-8 text-primary-foreground" />
            )}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {isDragActive || dragActive
              ? "Drop your image here"
              : "Upload an image"}
          </h3>
          <p className="text-sm text-muted-foreground">
            Drag and drop an image, or{" "}
            <span className="text-accent font-medium">click to browse</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Supports: JPG, PNG, GIF, WEBP
          </p>
        </div>
      </div>
    </div>
  );
};