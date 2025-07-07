# Quiz Components Documentation

This directory contains reusable components for implementing quizzes across different subjects in the Kitabu.AI application.

## Components Overview

### 1. PopQuiz Component

The `PopQuiz` component is a reusable quiz interface that can be used with any subject's question bank.

#### Props

- `subjectId`: Unique identifier for the subject (e.g., "mathematics", "english")
- `grade`: The grade level (e.g., "Grade 8")
- `topic`: Optional topic to filter questions by
- `subtopic`: Optional subtopic to filter questions by
- `difficulty`: Optional difficulty level to filter questions by
- `questionCount`: Number of questions to include (default: 20)
- `timePerQuestion`: Time in seconds per question (default: 30)
- `customStyles`: Optional styling overrides for subject-specific theming
- `onClose`: Callback function when the quiz is closed
- `onComplete`: Callback function when the quiz is completed, receives score and total points

#### Usage Example

```tsx
<PopQuiz
  subjectId="mathematics"
  grade="Grade 8"
  topic="Algebra"
  questionCount={15}
  customStyles={{
    primaryColor: '#4299E1',
    secondaryColor: '#48BB78',
    accentColor: '#F59E0B'
  }}
  onClose={() => setShowQuiz(false)}
  onComplete={(score, total) => handleQuizComplete(score, total)}
/>
```

### 2. QuizResults Component

The `QuizResults` component displays the results of a completed quiz.

#### Props

- `score`: The score achieved
- `totalPoints`: The total possible points
- `correctAnswers`: Number of correctly answered questions
- `totalQuestions`: Total number of questions
- `timeSpent`: Time spent on the quiz in seconds
- `subjectName`: Optional subject name for display
- `customStyles`: Optional styling overrides
- `onRetake`: Callback function to retake the quiz
- `onClose`: Callback function to close the results
- `onShare`: Optional callback function to share results

#### Usage Example

```tsx
<QuizResults
  score={350}
  totalPoints={500}
  correctAnswers={14}
  totalQuestions={20}
  timeSpent={600}
  subjectName="Mathematics"
  onRetake={handleRetakeQuiz}
  onClose={() => setShowResults(false)}
  onShare={handleShareResults}
/>
```

### 3. SubjectQuiz Component

The `SubjectQuiz` component is a wrapper that manages the state transitions between the quiz and results screens.

#### Props

- `subjectId`: Unique identifier for the subject
- `subjectName`: Display name of the subject
- `grade`: The grade level
- `topic`: Optional topic to filter questions by
- `subtopic`: Optional subtopic to filter questions by
- `difficulty`: Optional difficulty level to filter questions by
- `questionCount`: Number of questions to include
- `timePerQuestion`: Time in seconds per question
- `customStyles`: Optional styling overrides
- `onClose`: Callback function when the quiz flow is closed

#### Usage Example

```tsx
<SubjectQuiz
  subjectId="english"
  subjectName="English"
  grade="Grade 8"
  topic="Grammar"
  questionCount={20}
  customStyles={{
    primaryColor: '#8B5CF6',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B'
  }}
  onClose={() => setShowQuiz(false)}
/>
```

## Customization

Each subject can have its own theme by providing custom colors:

- `primaryColor`: Used for buttons, progress bars, and other primary UI elements
- `secondaryColor`: Used for success states and the "Finish" button
- `accentColor`: Used for warnings and special highlights

## Question Bank Integration

The components automatically fetch questions from the subject's question bank using the `QuestionBankService`. Each subject should have its own question bank file in the `data/questionBank` directory.

## Accessibility

The quiz components include features for accessibility:
- Clear visual feedback for correct/incorrect answers
- Sufficient color contrast
- Readable font sizes
- Proper focus management

## Localization

The components are designed to work with multiple languages. Text strings can be easily replaced with localized versions.