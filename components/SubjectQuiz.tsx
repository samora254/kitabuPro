import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import PopQuiz from './PopQuiz';
import QuizResults from './QuizResults';

interface SubjectQuizProps {
  subjectId: string;
  subjectName: string;
  grade: string;
  topic?: string;
  subtopic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  questionCount?: number;
  timePerQuestion?: number;
  customStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
  };
  onClose: () => void;
}

/**
 * A wrapper component that manages the quiz flow for a specific subject
 * This component handles the state transitions between quiz and results
 */
export default function SubjectQuiz({
  subjectId,
  subjectName,
  grade,
  topic,
  subtopic,
  difficulty,
  questionCount = 20,
  timePerQuestion = 30,
  customStyles = {},
  onClose
}: SubjectQuizProps) {
  const [showQuiz, setShowQuiz] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState({
    score: 0,
    totalPoints: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    timeSpent: 0,
  });

  const handleQuizComplete = (score: number, totalPoints: number) => {
    setShowQuiz(false);
    setQuizResults({
      score,
      totalPoints,
      correctAnswers: Math.round(score / (totalPoints / questionCount)), // Estimate based on question count
      totalQuestions: questionCount,
      timeSpent: timePerQuestion * questionCount, // Placeholder - in a real app, track actual time
    });
    setShowResults(true);
  };

  const handleRetakeQuiz = () => {
    setShowResults(false);
    setShowQuiz(true);
  };

  const handleShareResults = () => {
    if (Platform.OS === 'web') {
      console.log('Share results functionality would be implemented here');
    } else {
      Alert.alert('Share Results', 'Sharing functionality would be implemented here.');
    }
  };

  return (
    <>
      {showQuiz && (
        <PopQuiz
          subjectId={subjectId}
          grade={grade}
          topic={topic}
          subtopic={subtopic}
          difficulty={difficulty}
          questionCount={questionCount}
          timePerQuestion={timePerQuestion}
          customStyles={customStyles}
          onClose={onClose}
          onComplete={handleQuizComplete}
        />
      )}
      
      {showResults && (
        <QuizResults
          score={quizResults.score}
          totalPoints={quizResults.totalPoints}
          correctAnswers={quizResults.correctAnswers}
          totalQuestions={quizResults.totalQuestions}
          timeSpent={quizResults.timeSpent}
          subjectName={subjectName}
          customStyles={customStyles}
          onRetake={handleRetakeQuiz}
          onClose={onClose}
          onShare={handleShareResults}
        />
      )}
    </>
  );
}