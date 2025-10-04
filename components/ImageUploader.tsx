import React, { useState, useRef, useCallback } from 'react';
import { UploadedImage } from '../types';
import { UploadIcon, CheckCircleIcon } from './icons';

interface ImageUploaderProps {
  title: string;
  onImageUpload: (image: UploadedImage | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ title, onImageUpload }) => {
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Please provide a JPEG or PNG image.');
        onImageUpload(null);
        setImage(null);
        return;
      }
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError('File size must be less than 4MB.');
        onImageUpload(null);
        setImage(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        const uploadedImage: UploadedImage = {
          base64: base64String,
          mimeType: file.type,
          url: URL.createObjectURL(file),
        };
        setImage(uploadedImage);
        onImageUpload(uploadedImage);
        setError(null);
      };
      reader.onerror = () => {
        setError('Failed to read the file.');
        onImageUpload(null);
        setImage(null);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-[var(--color-bg)] rounded-xl p-6 transition-all duration-300 border border-[var(--color-border)]">
      <h3 className="text-xl font-semibold text-stone-200 mb-4 text-center">{title}</h3>
      <div
        className="relative border-2 border-dashed border-[var(--color-border)] rounded-lg h-64 flex items-center justify-center cursor-pointer bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-accent)]"
        onClick={handleClick}
        role="button"
        aria-label={`Upload ${title}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png"
          className="hidden"
          aria-hidden="true"
        />
        {image ? (
          <>
            <img src={image.url} alt="Uploaded preview" className="object-cover h-full w-full rounded-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
              <span className="text-white font-bold text-lg">Replace Image</span>
            </div>
            <div className="absolute top-2 right-2 bg-green-600 rounded-full p-1 shadow-md">
                <CheckCircleIcon className="w-6 h-6 text-white" />
            </div>
          </>
        ) : (
          <div className="text-center text-stone-400">
            <UploadIcon className="w-12 h-12 mx-auto text-stone-500 mb-2" />
            <p className="font-semibold">Select Portrait</p>
            <p className="text-sm">PNG or JPG, max 4MB</p>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
    </div>
  );
};

export default ImageUploader;