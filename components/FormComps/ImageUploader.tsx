"use client";
import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import { Upload } from "lucide-react";
import Image from "next/image";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
  errorMessage?: string;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
  errorMessage,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      const fileUrl = convertFileToUrl(acceptedFiles[0]);
      onFieldChange(fileUrl);
    },
    [setFiles, onFieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]) || undefined,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`bg-muted flex justify-center items-center h-64 cursor-pointer flex-col overflow-hidden rounded-md bg-grey-50 focus:outline-0 `}
      >
        <input {...getInputProps()} className="cursor-pointer" />

        {imageUrl ? (
          <div className="flex h-full w-full flex-1 justify-center relative ">
            <Image
              fill
              src={imageUrl}
              alt="image"
              className="w-full object-contain object-center"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center py-5 text-grey-500">
            <Upload className="text-primary" size={60} />
            <h3 className="mb-2 mt-2">Drag photo here</h3>
            <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
            <Button type="button" className="rounded-full">
              Select from computer
            </Button>
          </div>
        )}
      </div>
      {errorMessage && (
        <p className="p-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
