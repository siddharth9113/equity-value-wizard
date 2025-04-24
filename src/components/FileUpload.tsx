
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Upload } from 'lucide-react';

interface FileUploadProps {
  title: string;
  description: string;
  fileType: string;
  onFileUpload: (file: File) => void;
}

const FileUpload = ({ title, description, fileType, onFileUpload }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        onFileUpload(file);
        toast.success(`${title} uploaded successfully`);
      }
    }, 200);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="mr-2 h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-finance-accent transition-colors">
          <input 
            type="file" 
            accept=".csv,.xlsx,.pdf,.xls" 
            id={`file-upload-${fileType}`}
            onChange={handleFileChange}
            className="hidden" 
          />
          <label 
            htmlFor={`file-upload-${fileType}`} 
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload size={32} className="text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Click to browse files</p>
          </label>
          
          {file && (
            <div className="mt-4 w-full">
              <p className="text-sm font-medium truncate max-w-full">{file.name}</p>
              {isUploading && <Progress value={uploadProgress} className="h-2 mt-2" />}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleUpload} 
          disabled={!file || isUploading}
          className="w-full bg-finance hover:bg-finance-light"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileUpload;
