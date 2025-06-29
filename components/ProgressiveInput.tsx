import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Check } from 'lucide-react-native';

interface ProgressiveInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  autoFocus?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  onComplete?: () => void;
}

export default function ProgressiveInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  autoFocus,
  keyboardType = 'default',
  secureTextEntry,
  multiline,
  numberOfLines,
  onComplete,
}: ProgressiveInputProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (value.length > 0) {
      Animated.spring(checkAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(checkAnim, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
  }, [value]);

  const handleChangeText = (text: string) => {
    onChangeText(text);
    if (text.length > 0 && onComplete) {
      setTimeout(onComplete, 500);
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Animated.View
          style={[
            styles.checkIcon,
            {
              opacity: checkAnim,
              transform: [{ scale: checkAnim }],
            },
          ]}
        >
          <Check size={16} color="#48BB78" />
        </Animated.View>
      </View>
      
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          multiline && styles.textArea,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#A0AEC0"
        value={value}
        onChangeText={handleChangeText}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    flex: 1,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0FFF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
  },
  inputError: {
    borderColor: '#E53E3E',
  },
  textArea: {
    height: 80,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E53E3E',
    marginTop: 4,
  },
});