import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { FileText, Image as ImageIcon, File, X, Upload, Eye, RefreshCw, TriangleAlert as AlertTriangle } from 'lucide-react-native';

// Supported file types and their MIME types
const SUPPORTED_TYPES = {
  'application/pdf': { icon: FileText, color: '#FF6B6B', extension: 'PDF' },
  'application/msword': { icon: FileText, color: '#4ECDC4', extension: 'DOC' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { icon: FileText, color: '#4ECDC4', extension: 'DOCX' },
  'text/plain': { icon: FileText, color: '#A0AEC0', extension: 'TXT' },
  'image/jpeg': { icon: ImageIcon, color: '#F59E0B', extension: 'JPEG' },
  'image/png': { icon: ImageIcon, color: '#10B981', extension: 'PNG' },
};

// Maximum file size in bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

interface DocumentUploaderProps {
  onFileProcessed: (text: string) => void;
  onError?: (error: string) => void;
}

interface FileInfo {
  uri: string;
  name: string;
  size: number;
  type: string;
  extension: string;
}

export default function DocumentUploader({ onFileProcessed, onError }: DocumentUploaderProps) {
  const [file, setFile] = useState<FileInfo | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uploadController = useRef<AbortController | null>(null);

  const pickDocument = async () => {
    try {
      setError(null);
      
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
          'image/jpeg',
          'image/png',
        ],
        copyToCacheDirectory: true,
      });
      
      if (result.canceled) {
        return;
      }
      
      const pickedFile = result.assets[0];
      
      // Validate file size
      if (pickedFile.size && pickedFile.size > MAX_FILE_SIZE) {
        setError(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
        if (onError) onError(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
        return;
      }
      
      // Get file extension
      const fileNameParts = pickedFile.name.split('.');
      const extension = fileNameParts.length > 1 
        ? fileNameParts[fileNameParts.length - 1].toUpperCase() 
        : '';
      
      setFile({
        uri: pickedFile.uri,
        name: pickedFile.name,
        size: pickedFile.size || 0,
        type: pickedFile.mimeType || 'application/octet-stream',
        extension,
      });
      
      // Auto-start processing
      processFile(pickedFile.uri, pickedFile.mimeType || 'application/octet-stream');
      
    } catch (err) {
      console.error('Error picking document:', err);
      setError('Failed to select document. Please try again.');
      if (onError) onError('Failed to select document. Please try again.');
    }
  };

  const cancelUpload = () => {
    if (uploadController.current) {
      uploadController.current.abort();
      uploadController.current = null;
    }
    setIsUploading(false);
    setUploadProgress(0);
  };

  const processFile = async (fileUri: string, mimeType: string) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      // Simulate upload progress
      setIsUploading(true);
      uploadController.current = new AbortController();
      
      // Simulate upload with progress
      for (let i = 0; i <= 100; i += 5) {
        if (uploadController.current.signal.aborted) {
          throw new Error('Upload cancelled');
        }
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setIsUploading(false);
      
      // Simulate processing based on file type
      let extractedText = '';
      
      // In a real implementation, this would use different processing methods
      // based on file type (PDF parsing, OCR for images, etc.)
      if (mimeType.startsWith('image/')) {
        // Simulate OCR processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        extractedText = "This is simulated OCR text extracted from the image. In a real implementation, this would use OCR technology to extract text content from the uploaded image.";
      } else if (mimeType === 'application/pdf') {
        // Simulate PDF processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        extractedText = "This is simulated text extracted from a PDF document. In a real implementation, this would parse the PDF structure and extract formatted text content.";
      } else {
        // Simulate text extraction from other document types
        await new Promise(resolve => setTimeout(resolve, 1000));
        extractedText = "This is simulated text extracted from a document. In a real implementation, this would parse the document structure and extract formatted text content while preserving headings, paragraphs, and other formatting elements.";
      }
      
      // Pass the extracted text to the parent component
      onFileProcessed(extractedText);
      
    } catch (err: any) {
      if (err.message !== 'Upload cancelled') {
        console.error('Error processing file:', err);
        setError('Failed to process document. Please try again.');
        if (onError) onError('Failed to process document. Please try again.');
      }
    } finally {
      setIsProcessing(false);
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    if (isUploading) {
      cancelUpload();
    }
    setFile(null);
    setError(null);
  };

  const retryProcessing = () => {
    if (file) {
      processFile(file.uri, file.type);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = () => {
    if (!file) return File;
    
    const fileType = SUPPORTED_TYPES[file.type as keyof typeof SUPPORTED_TYPES];
    if (fileType) {
      return fileType.icon;
    }
    
    return File;
  };

  const getFileColor = () => {
    if (!file) return '#A0AEC0';
    
    const fileType = SUPPORTED_TYPES[file.type as keyof typeof SUPPORTED_TYPES];
    if (fileType) {
      return fileType.color;
    }
    
    return '#A0AEC0';
  };

  const previewFile = () => {
    if (!file) return;
    
    // In a real implementation, this would open a preview modal or navigate to a preview screen
    Alert.alert('File Preview', 'This would show a preview of the document content.');
  };

  const FileIcon = getFileIcon();
  const fileColor = getFileColor();

  return (
    <View style={styles.container}>
      {!file ? (
        <TouchableOpacity 
          style={styles.uploadButton} 
          onPress={pickDocument}
          disabled={isUploading || isProcessing}
        >
          <Upload size={24} color="#4299E1" />
          <Text style={styles.uploadText}>Choose File</Text>
          <Text style={styles.uploadSubtext}>
            PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB)
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.fileContainer}>
          <View style={styles.fileHeader}>
            <View style={styles.fileInfo}>
              <View style={[styles.fileIconContainer, { backgroundColor: `${fileColor}15` }]}>
                <FileIcon size={24} color={fileColor} />
              </View>
              <View style={styles.fileDetails}>
                <Text style={styles.fileName} numberOfLines={1}>{file.name}</Text>
                <Text style={styles.fileSize}>{formatFileSize(file.size)} • {file.extension}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={removeFile}
              disabled={isProcessing && !isUploading}
            >
              <X size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
          
          {isUploading && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${uploadProgress}%` }
                  ]} 
                />
              </View>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>{uploadProgress}%</Text>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={cancelUpload}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          {isProcessing && !isUploading && (
            <View style={styles.processingContainer}>
              <ActivityIndicator size="small" color="#4299E1" />
              <Text style={styles.processingText}>Processing document...</Text>
            </View>
          )}
          
          {error && (
            <View style={styles.errorContainer}>
              <AlertTriangle size={16} color="#EF4444" />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={retryProcessing}
              >
                <RefreshCw size={14} color="#4299E1" />
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {!isUploading && !isProcessing && !error && (
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.previewButton}
                onPress={previewFile}
              >
                <Eye size={16} color="#4299E1" />
                <Text style={styles.previewText}>Preview</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  uploadText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#4299E1',
    marginTop: 12,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
    textAlign: 'center',
  },
  fileContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'white',
  },
  fileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4299E1',
    borderRadius: 3,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
  },
  cancelButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  cancelText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 8,
    backgroundColor: '#EBF8FF',
    borderRadius: 8,
  },
  processingText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
    marginLeft: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
    marginLeft: 8,
    marginRight: 8,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#EBF8FF',
    borderRadius: 4,
  },
  retryText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#EBF8FF',
    borderRadius: 6,
  },
  previewText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
    marginLeft: 6,
  },
});