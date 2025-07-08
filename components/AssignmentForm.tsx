import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { ChevronDown, X, Wand as Wand2, Calendar, Clock, FileText, Check } from 'lucide-react-native';
import DocumentUploader from './DocumentUploader';

interface AssignmentFormProps {
  onSubmit: (assignmentData: AssignmentData) => void;
  onCancel?: () => void;
  initialData?: Partial<AssignmentData>;
}

export interface AssignmentData {
  grade: string;
  subject: string;
  title: string;
  description: string;
  due_date: string;
  due_time: string;
  attachments?: any[];
}

export function AssignmentForm({ onSubmit, onCancel, initialData }: AssignmentFormProps) {
  const [formData, setFormData] = useState<AssignmentData>({
    grade: initialData?.grade || '',
    subject: initialData?.subject || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    due_date: initialData?.due_date || '',
    due_time: initialData?.due_time || '',
    attachments: initialData?.attachments || [],
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof AssignmentData, string>>>({});
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  // Mock data for grades and subjects
  const grades = ['Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'];
  const subjects = {
    'Grade 4': ['Mathematics', 'English', 'Science', 'Social Studies', 'Kiswahili'],
    'Grade 5': ['Mathematics', 'English', 'Science', 'Social Studies', 'Kiswahili'],
    'Grade 6': ['Mathematics', 'English', 'Science', 'Social Studies', 'Kiswahili'],
    'Grade 7': ['Mathematics', 'English', 'Science', 'Social Studies', 'Kiswahili'],
    'Grade 8': ['Mathematics', 'English', 'Science', 'Social Studies', 'Kiswahili', 'Religious Education'],
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof AssignmentData, string>> = {};
    
    if (!formData.grade) {
      newErrors.grade = 'Grade is required';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.due_date) {
      newErrors.due_date = 'Due date is required';
    }
    
    if (!formData.due_time) {
      newErrors.due_time = 'Due time is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof AssignmentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleGradeSelect = (grade: string) => {
    setFormData(prev => ({ 
      ...prev, 
      grade,
      // Reset subject if changing grade
      subject: '',
    }));
    setShowGradeDropdown(false);
    if (errors.grade) {
      setErrors(prev => ({ ...prev, grade: undefined }));
    }
  };

  const handleSubjectSelect = (subject: string) => {
    setFormData(prev => ({ ...prev, subject }));
    setShowSubjectDropdown(false);
    if (errors.subject) {
      setErrors(prev => ({ ...prev, subject: undefined }));
    }
  };

  const handleGenerateWithAI = () => {
    if (!formData.grade || !formData.subject) {
      setErrors({
        ...errors,
        grade: !formData.grade ? 'Grade is required for AI generation' : undefined,
        subject: !formData.subject ? 'Subject is required for AI generation' : undefined,
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedAssignment = {
        title: `${formData.subject} Assignment: Key Concepts Review`,
        description: `This assignment covers the key concepts we've learned in ${formData.subject} for ${formData.grade} this term. Students should demonstrate their understanding of the material through problem-solving and critical thinking.\n\nPlease complete all sections and show your work where applicable. This assignment will help prepare you for the upcoming assessment.`,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: '15:00',
      };
      
      setFormData(prev => ({
        ...prev,
        ...generatedAssignment,
      }));
      
      setIsGenerating(false);
      setIsPreviewVisible(true);
    }, 2000);
  };

  const handleFileProcessed = (extractedText: string) => {
    // Auto-populate form fields based on extracted text
    // This is a simplified implementation - in a real app, you would use
    // more sophisticated NLP to extract structured data
    
    // Simple extraction logic for demonstration
    let title = '';
    let description = extractedText;
    
    // Try to extract a title from the first line
    const lines = extractedText.split('\n');
    if (lines.length > 0 && lines[0].trim()) {
      title = lines[0].trim();
      description = lines.slice(1).join('\n').trim();
    }
    
    setFormData(prev => ({
      ...prev,
      title: title || prev.title,
      description: description || prev.description,
    }));
  };

  const availableSubjects = formData.grade ? 
    subjects[formData.grade as keyof typeof subjects] || [] : [];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* 1. Grade Selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Grade</Text>
          <TouchableOpacity
            style={[styles.dropdown, errors.grade && styles.inputError]}
            onPress={() => setShowGradeDropdown(true)}
          >
            <Text style={[styles.dropdownText, !formData.grade && styles.placeholderText]}>
              {formData.grade || 'Select Grade'}
            </Text>
            <ChevronDown size={20} color="#A0AEC0" />
          </TouchableOpacity>
          {errors.grade && <Text style={styles.errorText}>{errors.grade}</Text>}
        </View>

        {/* 2. Subject Selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Subject</Text>
          <TouchableOpacity
            style={[
              styles.dropdown, 
              errors.subject && styles.inputError,
              !formData.grade && styles.disabledDropdown
            ]}
            onPress={() => formData.grade && setShowSubjectDropdown(true)}
            disabled={!formData.grade}
          >
            <Text style={[
              styles.dropdownText, 
              !formData.subject && styles.placeholderText,
              !formData.grade && styles.disabledText
            ]}>
              {formData.subject || (formData.grade ? 'Select Subject' : 'Select Grade First')}
            </Text>
            <ChevronDown size={20} color={formData.grade ? "#A0AEC0" : "#CBD5E0"} />
          </TouchableOpacity>
          {errors.subject && <Text style={styles.errorText}>{errors.subject}</Text>}
        </View>

        {/* 3. Assignment Title */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Assignment Title</Text>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder="Enter assignment title"
            placeholderTextColor="#A0AEC0"
            value={formData.title}
            onChangeText={(value) => handleInputChange('title', value)}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        {/* 4. Due Date */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Due Date</Text>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateContainer}>
              <TextInput
                style={[styles.dateInput, errors.due_date && styles.inputError]}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#A0AEC0"
                value={formData.due_date}
                onChangeText={(value) => handleInputChange('due_date', value)}
              />
              <Calendar size={20} color="#A0AEC0" style={styles.dateIcon} />
            </View>
            
            <View style={styles.timeContainer}>
              <TextInput
                style={[styles.timeInput, errors.due_time && styles.inputError]}
                placeholder="HH:MM"
                placeholderTextColor="#A0AEC0"
                value={formData.due_time}
                onChangeText={(value) => handleInputChange('due_time', value)}
              />
              <Clock size={20} color="#A0AEC0" style={styles.timeIcon} />
            </View>
          </View>
          {(errors.due_date || errors.due_time) && (
            <Text style={styles.errorText}>
              {errors.due_date || errors.due_time}
            </Text>
          )}
        </View>

        {/* 5. Document Upload */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Upload Document (Optional)</Text>
          <DocumentUploader 
            onFileProcessed={handleFileProcessed}
            onError={(error) => console.log('Upload error:', error)}
          />
        </View>

        {/* 6. Assignment Description */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Assignment Description</Text>
          <TextInput
            style={[styles.textArea, errors.description && styles.inputError]}
            placeholder="Enter assignment details and instructions"
            placeholderTextColor="#A0AEC0"
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
        </View>

        {/* 7. Generate with AI Button */}
        <TouchableOpacity
          style={[
            styles.generateButton,
            isGenerating && styles.generatingButton
          ]}
          onPress={handleGenerateWithAI}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Wand2 size={20} color="white" />
          )}
          <Text style={styles.generateButtonText}>
            {isGenerating ? 'Generating...' : 'Generate with AI'}
          </Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Create Assignment</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Grade Dropdown Modal */}
      <Modal
        visible={showGradeDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowGradeDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowGradeDropdown(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Grade</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowGradeDropdown(false)}
              >
                <X size={20} color="#718096" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.optionsList}>
              {grades.map((grade) => (
                <TouchableOpacity
                  key={grade}
                  style={[
                    styles.optionItem,
                    formData.grade === grade && styles.selectedOption
                  ]}
                  onPress={() => handleGradeSelect(grade)}
                >
                  <Text style={[
                    styles.optionText,
                    formData.grade === grade && styles.selectedOptionText
                  ]}>
                    {grade}
                  </Text>
                  {formData.grade === grade && (
                    <Check size={20} color="#4299E1" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Subject Dropdown Modal */}
      <Modal
        visible={showSubjectDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSubjectDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSubjectDropdown(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Subject</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowSubjectDropdown(false)}
              >
                <X size={20} color="#718096" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.optionsList}>
              {availableSubjects.map((subject) => (
                <TouchableOpacity
                  key={subject}
                  style={[
                    styles.optionItem,
                    formData.subject === subject && styles.selectedOption
                  ]}
                  onPress={() => handleSubjectSelect(subject)}
                >
                  <Text style={[
                    styles.optionText,
                    formData.subject === subject && styles.selectedOptionText
                  ]}>
                    {subject}
                  </Text>
                  {formData.subject === subject && (
                    <Check size={20} color="#4299E1" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Assignment Preview Modal */}
      <Modal
        visible={isPreviewVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPreviewVisible(false)}
      >
        <View style={styles.previewModalOverlay}>
          <View style={styles.previewModalContent}>
            <View style={styles.previewModalHeader}>
              <Text style={styles.previewModalTitle}>Assignment Preview</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsPreviewVisible(false)}
              >
                <X size={20} color="#718096" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.previewContent}>
              <View style={styles.previewSection}>
                <Text style={styles.previewLabel}>Grade & Subject</Text>
                <Text style={styles.previewValue}>{formData.grade} • {formData.subject}</Text>
              </View>
              
              <View style={styles.previewSection}>
                <Text style={styles.previewLabel}>Title</Text>
                <Text style={styles.previewTitle}>{formData.title}</Text>
              </View>
              
              <View style={styles.previewSection}>
                <Text style={styles.previewLabel}>Description</Text>
                <Text style={styles.previewDescription}>{formData.description}</Text>
              </View>
              
              <View style={styles.previewSection}>
                <Text style={styles.previewLabel}>Due Date</Text>
                <Text style={styles.previewValue}>{formData.due_date} at {formData.due_time}</Text>
              </View>
            </ScrollView>
            
            <View style={styles.previewActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsPreviewVisible(false)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.sendButton}
                onPress={() => {
                  setIsPreviewVisible(false);
                  handleSubmit();
                }}
              >
                <Text style={styles.sendButtonText}>Send Assignment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
  },
  textArea: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  dropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  disabledDropdown: {
    backgroundColor: '#F7FAFC',
    borderColor: '#E2E8F0',
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    flex: 1,
  },
  placeholderText: {
    color: '#A0AEC0',
  },
  disabledText: {
    color: '#CBD5E0',
  },
  inputError: {
    borderColor: '#FC8181',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E53E3E',
    marginTop: 4,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateContainer: {
    flex: 3,
    position: 'relative',
  },
  timeContainer: {
    flex: 2,
    position: 'relative',
  },
  dateInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 40,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
  },
  timeInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 40,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
  },
  dateIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  timeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  generateButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  generatingButton: {
    backgroundColor: '#A78BFA',
  },
  generateButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#4299E1',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsList: {
    maxHeight: 300,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  selectedOption: {
    backgroundColor: '#EBF8FF',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
  },
  selectedOptionText: {
    fontFamily: 'Inter-Medium',
    color: '#4299E1',
  },
  previewModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  previewModalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  previewModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  previewModalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
  },
  previewContent: {
    padding: 20,
    maxHeight: 400,
  },
  previewSection: {
    marginBottom: 20,
  },
  previewLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    marginBottom: 4,
  },
  previewValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
  },
  previewTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
  },
  previewDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    lineHeight: 24,
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  editButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  sendButton: {
    backgroundColor: '#4299E1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  sendButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
});

export { AssignmentForm }