import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { shouldShowDevIndicator } from '@/constants/config';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';

export function DevModeIndicator() {
  // Dev mode functionality preserved but UI indicator removed
  return null;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FF6B6B',
    marginLeft: 4,
  },
});