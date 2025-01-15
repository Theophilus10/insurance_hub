import Attach from "@app/components/svg/attach";
import PdfImage from "@app/components/svg/pdf";
import Word from "@app/components/svg/word";
import { delete_upload } from "@app/server/services";
import API from "@app/server/useAxios";
import { Document, Policy } from "@app/types/severTypes";

import { Upload, XCircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import toast from "react-hot-toast";

interface AcceptedFile extends FileWithPath {
  preview: string;
}
interface UploadedFile {
  id: number;
  url: string;
  filename: string;
  content_type: string;
  byte_size: number;
  created_at: string;
}
interface Props {
  uploaded: any;
  handleUploadSuccess: () => void;
}

const DocumentUploads = ({ uploaded, handleUploadSuccess }: Props) => {
  console.log(uploaded, "uploaded");
  const [rejected, setRejected] = useState<
    { file: FileWithPath; errors: { code: string; message: string }[] }[]
  >([]);
  const [files, setFiles] = useState<File[]>([]);
  const searchParams = useSearchParams();
  const policyIdParam = searchParams.get("policy_id");
  const policyId = policyIdParam ? parseInt(policyIdParam) : 0;
  const [isFileUploading, setIsFileUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: any) => {
      if (acceptedFiles.length) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file), // Preview URL for images, PDFs, etc.
            })
          ),
        ]);
      }

      if (rejectedFiles.length) {
        setRejected((previous) => [
          ...previous,
          ...rejectedFiles.map((file: any) => ({
            file,
            errors: [{ code: "REJECTED_FILE", message: "File rejected" }],
          })),
        ]);
      }
    },
    [setFiles]
  );

  const removeFile = (name: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize: 1024 * 1000,
    onDrop,
  });

  const handleSubmitFile = async () => {
    setIsFileUploading(true);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("documents[]", file);
    });

    try {
      const response = await API.post(
        `/policies/${policyId}/upload_files`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Files uploaded successfully");
        setFiles([]);
        handleUploadSuccess();
      } else {
        toast.error(response.data.error || "Failed to upload files");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Error uploading files");
    } finally {
      setIsFileUploading(false);
    }
  };

  const handleDeleteUpload = async (docId: number) => {
    try {
      const response = await delete_upload(docId);
      if (response.message === "Document deleted successfully") {
        toast.success(response.message);
        handleUploadSuccess();
      } else {
        toast.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Error deleting file");
    }
  };

  return (
    <div>
      <h2>Supporting Document</h2>
      <div className="flex items-center justify-center" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="flex flex-col justify-center items-center p-32">
          <Upload />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      <section className="mt-10">
        {files.length > 0 && (
          <div className="flex justify-between gap-4 ">
            <button
              type="button"
              onClick={removeAll}
              className="mt-1 text-[12px] uppercase tracking-wider font-bold bg-red-500 text-white border border-secondary-400 rounded-md px-3 hover:bg-red-600 hover:text-black transition-colors"
            >
              Remove all files
            </button>

            <button
              type="button"
              onClick={handleSubmitFile}
              className="mt-1 text-[12px] uppercase tracking-wider font-bold bg-blue-500 text-white border border-secondary-400 rounded-md px-3 hover:bg-blue-600 hover:text-black transition-colors"
            >
              {isFileUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}
        {files.length ? (
          <div>
            <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
              Accepted Files
            </h3>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
              {files.map((file) => (
                <li
                  key={file.name}
                  className="relative h-auto rounded-md shadow-lg"
                >
                  <div className="flex items-center justify-center">
                    {file.type === "application/pdf" ? (
                      <PdfImage />
                    ) : file.type === "application/msword" ? (
                      <Word />
                    ) : (
                      <Attach />
                    )}
                  </div>

                  <button
                    type="button"
                    className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                    onClick={() => removeFile(file.name)}
                  >
                    <XCircleIcon className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                  </button>
                  <div className="flex text-center mt-2 text-neutral-500 text-[12px] font-medium overflow-x-hidden">
                    <p>{file.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          []
        )}

        {uploaded?.documents?.length ? (
          <div>
            <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
              Uploaded Files
            </h3>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
              {uploaded?.documents?.map((doc: Document) => (
                <li
                  key={doc.id}
                  className="relative h-auto rounded-md shadow-lg"
                >
                  <div className="flex items-center justify-center">
                    {doc.content_type === "application/pdf" ? (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center"
                      >
                        <PdfImage />
                        <span className="text-blue-500 mt-2 text-sm">
                          Preview PDF
                        </span>
                      </a>
                    ) : doc.content_type === "application/msword" ? (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center"
                      >
                        <Word />
                        <span className="text-blue-500 mt-2 text-sm">
                          Preview Word
                        </span>
                      </a>
                    ) : (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center"
                      >
                        <Attach />
                        <span className="text-blue-500 mt-2 text-sm">
                          View File
                        </span>
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    className="w-7 h-auto border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                    onClick={() => handleDeleteUpload(doc.id)}
                  >
                    <XCircleIcon className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                  </button>

                  <div className="flex text-center mt-2 text-neutral-500 text-[12px] font-medium overflow-x-hidden">
                    <p>{doc.filename}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          []
        )}
      </section>
    </div>
  );
};

export default DocumentUploads;
