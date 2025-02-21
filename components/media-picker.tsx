"use client";
import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import axios from "axios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

type MediaPickerProps = {
  control: Control<any>;
  name: string;
};

export const MediaPicker = ({ control, name }: MediaPickerProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File) => {
    const MAX_FILE_SIZE = 50 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large (Max: 50MB)");

      return null;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData);

      return response.data.fileName;
    } catch {
      toast.error("Failed to upload media.");

      return null;
    }
  };

  return (
    <Controller
      control={control}
      defaultValue={[]}
      name={name}
      render={({ field: { value, onChange } }) => {
        const handleFilesSelected = async (files: FileList) => {
          setIsUploading(true);
          const existing = Array.isArray(value) ? [...value] : [];

          for (const file of Array.from(files)) {
            const uploadedUrl = await uploadFile(file);

            if (uploadedUrl) {
              existing.push(uploadedUrl);
            }
          }

          onChange(existing);
          setIsUploading(false);
        };

        return (
          <div className="flex flex-col gap-2">
            <input
              multiple
              accept="image/*,video/*"
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-800 rounded-lg disabled:cursor-not-allowed"
              type="file"
              onChange={(e) => {
                if (e.target.files) handleFilesSelected(e.target.files);
              }}
            />
            <p className="text-xs text-gray-400">(Allowed: images & videos, max 50MB)</p>
            {isUploading && (
              <div className="flex items-center gap-2 text-blue-500 text-sm animate-fade-in">
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
