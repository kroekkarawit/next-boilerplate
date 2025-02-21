import { useState, useEffect } from "react";
import { Controller, Control } from "react-hook-form";
import axios from "axios";

// Props interface for the ImagePicker component
type ImageUploadProps = {
  control: Control<any>; // React Hook Form control
  name: string; // Field name in the form
  width?: string; // Optional width
  height?: string; // Optional height
};

export const ImagePicker = ({
  control,
  name,
  width = "w-full",
  height = "h-36",
}: ImageUploadProps) => {
  // State for image preview URL and loading status
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Cleanup function for blob URLs when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Fetch presigned URL from the server for uploading
  const getPresignedUrl = async () => {
    try {
      const response = await axios.get("/api/get-presigned-url");

      return {
        url: response.data.presignedUrl,
        fileName: response.data.fileName,
      };
    } catch {
      return null;
    }
  };

  const handleImageUpload = async (file: File) => {
    setLoading(true);

    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert("File is too large. Maximum size is 5MB.");

      return null;
    }

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");

      return null;
    }

    const presignedData = await getPresignedUrl();

    if (!presignedData) {
      //alert("Failed to get presigned URL");

      return null;
    }

    try {
      // Create and set image preview before upload
      const blob = new Blob([file], { type: file.type });
      const previewUrl = URL.createObjectURL(blob);

      setImagePreview(previewUrl);

      // Upload the file to storage
      await axios.put(presignedData.url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      return presignedData.fileName;
    } catch {
      alert("Failed to upload image.");

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Handle image removal
  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300" htmlFor={name}>
        Image Upload
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <div className="flex flex-col gap-4 items-center justify-center  ">
            {imagePreview ? (
              // Image preview container
              <div className="relative w-full max-w-xs items-center">
                <img
                  alt="Preview"
                  className="w-full h-auto rounded-lg"
                  src={imagePreview}
                />
                <button
                  className="absolute top-0 right-0 bg-gray-800 bg-opacity-60 text-white rounded-full backdrop-blur-md px-2 py-1"
                  type="button"
                  onClick={() => {
                    removeImage();
                    onChange(""); // Reset the field in React Hook Form
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              // Card-like upload area with dashed border and custom height/width
              <div
                className={`flex items-center justify-center  ${width} ${height} border-2 border-dashed border-gray-400 rounded-lg cursor-pointer`}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                {loading ? (
                  // Show loading spinner inside the card when uploading
                  <div className="w-8 h-8 border-4 border-t-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="text-slate-300">Click to upload image</span>
                )}
              </div>
            )}
            {/* Hidden file input */}
            <input
              accept="image/*"
              className="hidden"
              id="file-upload"
              type="file"
              onChange={async (e) => {
                const file = e.target.files?.[0];

                if (file) {
                  const fileName = await handleImageUpload(file);

                  if (fileName) {
                    onChange(fileName); // Update React Hook Form with the uploaded file name
                  }
                }
              }}
            />
          </div>
        )}
        rules={{
          required: "Image is required",
        }}
      />
    </div>
  );
};
