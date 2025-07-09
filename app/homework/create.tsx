import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Save, Send } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import { AssignmentForm } from '@/components/AssignmentForm';

export default function CreateAssignmentScreen() {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSubmit = (assignmentData: any) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert(
        'Assignment Created',
        'Your assignment has been created successfully.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/homework')
          }
        ]
      );
    }, 1500);
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <DevModeIndicator />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#2D3748" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Assignment</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AssignmentForm 
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
        />
      </ScrollView>
      
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.disabledButton]}
          onPress={() => {
            // This would normally be connected to the form submission
            // For demo purposes, we'll just show an alert
            Alert.alert(
              'Save Assignment',
              'This would save the assignment as a draft.',
              [
                {
                  text: 'Cancel',
                  style: 'cancel'
                },
                {
                  text: 'Save',
                  onPress: () => {
                    setIsSaving(true);
                    setTimeout(() => {
                      setIsSaving(false);
                      router.push('/homework');
                    }, 1000);
                  }
                }
              ]
            );
          }}
          disabled={isSaving}
        >
          <Save size={20} color="white" />
          <Text style={styles.saveButtonText}>Save Draft</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#2D3748',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#718096',
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4299E1',
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 8,
  },
  disabledButton: {
    opacity: 0.7,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginLeft: 8,
  },
});