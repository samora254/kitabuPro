import React, { useState, useEffect, useRef } from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';

interface TypewriterTextProps {
  text: string;
  style?: TextStyle;
  typingSpeed?: number; // milliseconds per character
  onComplete?: () => void;
  startDelay?: number; // delay before typing starts
  initialDelay?: number; // delay before typing the first character
}

export default function TypewriterText({
  text,
  style,
  typingSpeed = 30,
  onComplete,
  startDelay = 300,
  initialDelay = 0,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textRef = useRef(text);
  const indexRef = useRef(0);

  useEffect(() => {
    // Reset when text changes
    textRef.current = text;
    indexRef.current = 0;
    setDisplayedText('');
    
    // Start typing after delay
    const delayTimer = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);
    
    return () => clearTimeout(delayTimer);
  }, [text, startDelay]);

  useEffect(() => {
    if (!isTyping) return;

    // Add initial delay for the first character
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
      if (indexRef.current < textRef.current.length) {
        setDisplayedText(prev => prev + textRef.current.charAt(indexRef.current));
        indexRef.current += 1;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        onComplete?.();
       }
      }, typingSpeed);

      return () => clearInterval(interval);
    }, indexRef.current === 0 ? initialDelay : 0);
    
    return () => clearTimeout(timer);
  }, [isTyping, typingSpeed, initialDelay, onComplete]);

  return <Text style={[styles.text, style]}>{displayedText}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
});