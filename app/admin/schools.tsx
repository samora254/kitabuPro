import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  TextInput,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Search, Filter, Download, RefreshCw, School, Users, TrendingUp, MapPin, Phone, Mail, Calendar, ChevronDown, X, Eye, CreditCard as Edit, Trash2, Plus, ChartBar as BarChart3, Target, Award, Clock, Menu, UserCheck, FileText, Bot, CircleHelp as HelpCircle, Settings, GraduationCap, Zap } from 'lucide-react-native';
import { DevModeIndicator } from '@/components/DevModeIndicator';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
