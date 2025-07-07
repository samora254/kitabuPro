import { QuickFactsBank } from './types';

export const mathematicsQuickFacts: QuickFactsBank = {
  subject: "Mathematics",
  grades: ["Grade 8"],
  topics: [
    { name: "Algebra", subtopics: ["Equations", "Expressions", "Functions"] },
    { name: "Geometry", subtopics: ["Angles", "Shapes", "Transformations"] },
    { name: "Statistics", subtopics: ["Data Analysis", "Probability", "Graphs"] },
    { name: "Numbers", subtopics: ["Integers", "Fractions", "Decimals"] }
  ],
  flashcardSets: [
    {
      id: "math-algebra-basics",
      title: "Algebra Basics",
      description: "Test your knowledge of basic algebraic concepts and operations.",
      subject: "Mathematics",
      topic: "Algebra",
      subtopic: "Expressions",
      grade: "Grade 8",
      flashcards: [
        {
          id: "math-alg-f1",
          question: "What is a variable?",
          answer: "A variable is a symbol (usually a letter) that represents an unknown value or a value that can change.",
          difficulty: "easy",
          tags: ["algebra", "variables", "basics"],
          timeRecommended: 20
        },
        {
          id: "math-alg-f2",
          question: "What is the value of x in the equation 3x + 5 = 20?",
          answer: "x = 5\n\nTo solve: 3x + 5 = 20\nSubtract 5 from both sides: 3x = 15\nDivide both sides by 3: x = 5",
          difficulty: "medium",
          tags: ["algebra", "equations", "solving"],
          timeRecommended: 30
        },
        {
          id: "math-alg-f3",
          question: "If 2x + 3 = 15, what is the value of 3x + 1?",
          answer: "3x + 1 = 19\n\nFirst solve for x: 2x + 3 = 15\n2x = 12\nx = 6\n\nNow substitute: 3x + 1 = 3(6) + 1 = 18 + 1 = 19",
          difficulty: "medium",
          tags: ["algebra", "equations", "substitution"],
          timeRecommended: 40
        },
        {
          id: "math-alg-f4",
          question: "Simplify the expression: 3(2x - 4) + 5",
          answer: "6x - 7\n\nStep 1: Distribute 3 to terms inside parentheses: 3(2x - 4) = 6x - 12\nStep 2: Add 5: 6x - 12 + 5 = 6x - 7",
          difficulty: "medium",
          tags: ["algebra", "expressions", "simplifying"],
          timeRecommended: 35
        },
        {
          id: "math-alg-f5",
          question: "If f(x) = 3x² - 2x + 1, what is f(2)?",
          answer: "f(2) = 9\n\nf(2) = 3(2)² - 2(2) + 1\nf(2) = 3(4) - 4 + 1\nf(2) = 12 - 4 + 1\nf(2) = 9",
          difficulty: "medium",
          tags: ["algebra", "functions", "evaluation"],
          timeRecommended: 35
        },
        {
          id: "math-alg-f6",
          question: "Solve for x: 2(x + 3) = 3(x - 1)",
          answer: "x = 9\n\nStep 1: Distribute on both sides: 2x + 6 = 3x - 3\nStep 2: Subtract 3x from both sides: 2x - 3x + 6 = -3\nStep 3: Simplify: -x + 6 = -3\nStep 4: Subtract 6 from both sides: -x = -9\nStep 5: Multiply both sides by -1: x = 9",
          difficulty: "hard",
          tags: ["algebra", "equations", "solving"],
          timeRecommended: 45
        },
        {
          id: "math-alg-f7",
          question: "If a sequence follows the pattern 3, 7, 11, 15, ..., what is the 10th term?",
          answer: "39\n\nThis is an arithmetic sequence with first term a = 3 and common difference d = 4.\nThe formula for the nth term is: a_n = a + (n-1)d\nFor the 10th term: a_10 = 3 + (10-1)4 = 3 + 36 = 39",
          difficulty: "hard",
          tags: ["algebra", "patterns", "sequences"],
          timeRecommended: 40
        },
        {
          id: "math-alg-f8",
          question: "If f(x) = 2x + 3, what is f(4)?",
          answer: "f(4) = 11\n\nTo find f(4), substitute x = 4 into the function:\nf(4) = 2(4) + 3 = 8 + 3 = 11",
          difficulty: "easy",
          tags: ["algebra", "functions", "evaluation"],
          timeRecommended: 20
        },
        {
          id: "math-alg-f9",
          question: "Solve the system of equations:\nx + y = 5\n2x - y = 4",
          answer: "x = 3, y = 2\n\nAdd the equations:\nx + y = 5\n2x - y = 4\n---------\n3x = 9\nx = 3\n\nSubstitute x = 3 into the first equation:\n3 + y = 5\ny = 2",
          difficulty: "hard",
          tags: ["algebra", "systems of equations", "solving"],
          timeRecommended: 50
        },
        {
          id: "math-alg-f10",
          question: "Solve the inequality: 2x - 5 > 7",
          answer: "x > 6\n\nStep 1: Add 5 to both sides: 2x > 12\nStep 2: Divide both sides by 2: x > 6",
          difficulty: "medium",
          tags: ["algebra", "inequalities", "solving"],
          timeRecommended: 30
        }
      ],
      totalCards: 10,
      estimatedTime: 345,
      difficulty: "medium"
    },
    {
      id: "math-geometry-angles",
      title: "Angles and Triangles",
      description: "Review key concepts about angles, triangles, and their properties.",
      subject: "Mathematics",
      topic: "Geometry",
      subtopic: "Angles",
      grade: "Grade 8",
      flashcards: [
        {
          id: "math-geo-f1",
          question: "What is the sum of angles in a triangle?",
          answer: "The sum of angles in a triangle is 180 degrees.",
          difficulty: "easy",
          tags: ["geometry", "triangles", "angles"],
          timeRecommended: 15
        },
        {
          id: "math-geo-f2",
          question: "What are complementary angles?",
          answer: "Complementary angles are two angles whose sum equals 90 degrees (a right angle).",
          difficulty: "easy",
          tags: ["geometry", "angles", "complementary"],
          timeRecommended: 15
        },
        {
          id: "math-geo-f3",
          question: "What are supplementary angles?",
          answer: "Supplementary angles are two angles whose sum equals 180 degrees (a straight angle).",
          difficulty: "easy",
          tags: ["geometry", "angles", "supplementary"],
          timeRecommended: 15
        },
        {
          id: "math-geo-f4",
          question: "What is the Pythagorean theorem?",
          answer: "The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of the squares of the lengths of the other two sides. It is expressed as a² + b² = c², where c is the hypotenuse.",
          difficulty: "medium",
          tags: ["geometry", "triangles", "pythagorean theorem"],
          imageUrl: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400",
          timeRecommended: 30
        },
        {
          id: "math-geo-f5",
          question: "In a triangle with angles in the ratio 2:3:4, what are the measures of the angles?",
          answer: "40°, 60°, and 80°\n\nLet's say the angles are 2x, 3x, and 4x.\nSince the sum of angles in a triangle is 180°:\n2x + 3x + 4x = 180°\n9x = 180°\nx = 20°\n\nSo the angles are 2(20°) = 40°, 3(20°) = 60°, and 4(20°) = 80°",
          difficulty: "hard",
          tags: ["geometry", "triangles", "angles", "ratio"],
          timeRecommended: 45
        },
        {
          id: "math-geo-f6",
          question: "What is the formula for the area of a triangle?",
          answer: "Area = (1/2) × base × height\n\nAlternatively, if you know the lengths of all three sides (a, b, and c), you can use Heron's formula:\nArea = √(s(s-a)(s-b)(s-c))\nwhere s = (a+b+c)/2 (the semi-perimeter)",
          difficulty: "medium",
          tags: ["geometry", "triangles", "area"],
          timeRecommended: 25
        },
        {
          id: "math-geo-f7",
          question: "What are vertical angles?",
          answer: "Vertical angles are pairs of opposite angles formed when two lines intersect. Vertical angles are always equal in measure.",
          difficulty: "medium",
          tags: ["geometry", "angles", "vertical angles"],
          timeRecommended: 25
        },
        {
          id: "math-geo-f8",
          question: "In a right-angled triangle, if one angle is 90° and another is 30°, what is the third angle?",
          answer: "60°\n\nSince the sum of angles in a triangle is 180°, and we know two angles (90° and 30°), we can find the third angle:\n180° - 90° - 30° = 60°",
          difficulty: "medium",
          tags: ["geometry", "triangles", "angles"],
          timeRecommended: 25
        },
        {
          id: "math-geo-f9",
          question: "What is the measure of each interior angle in a regular hexagon?",
          answer: "120°\n\nFor a regular polygon with n sides, each interior angle measures:\n(n-2) × 180° ÷ n\n\nFor a hexagon (n=6):\n(6-2) × 180° ÷ 6 = 4 × 180° ÷ 6 = 720° ÷ 6 = 120°",
          difficulty: "hard",
          tags: ["geometry", "polygons", "angles"],
          timeRecommended: 40
        },
        {
          id: "math-geo-f10",
          question: "If two parallel lines are cut by a transversal, which angles are equal?",
          answer: "When two parallel lines are cut by a transversal:\n- Corresponding angles are equal\n- Alternate interior angles are equal\n- Alternate exterior angles are equal\n- Consecutive interior angles are supplementary (sum to 180°)",
          difficulty: "medium",
          tags: ["geometry", "parallel lines", "angles"],
          imageUrl: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400",
          timeRecommended: 35
        }
      ],
      totalCards: 10,
      estimatedTime: 270,
      difficulty: "medium"
    },
    {
      id: "math-number-patterns",
      title: "Number Patterns and Logic",
      description: "Challenge your brain with number patterns, sequences, and logical puzzles.",
      subject: "Mathematics",
      topic: "Numbers",
      subtopic: "Patterns",
      grade: "Grade 8",
      flashcards: [
        {
          id: "math-num-f1",
          question: "What comes next in the sequence: 2, 6, 12, 20, 30, ...?",
          answer: "42\n\nThis is a sequence where the differences between consecutive terms form an arithmetic sequence:\n4, 6, 8, 10, ...\n\nThe pattern is adding 2 more each time.\nSo the next difference is 10 + 2 = 12\nAnd 30 + 12 = 42",
          difficulty: "medium",
          tags: ["numbers", "patterns", "sequences"],
          timeRecommended: 40
        },
        {
          id: "math-num-f2",
          question: "If 5 cats can catch 5 mice in 5 minutes, how many cats would be needed to catch 100 mice in 100 minutes?",
          answer: "5 cats\n\nThis is a trick question that tests logical reasoning.\n\nIf 5 cats can catch 5 mice in 5 minutes, then:\n- Each cat catches 1 mouse in 5 minutes\n- In 100 minutes, each cat would catch 20 mice (100 ÷ 5 = 20)\n- 5 cats would catch 5 × 20 = 100 mice in 100 minutes",
          difficulty: "hard",
          tags: ["numbers", "logic", "problem solving"],
          timeRecommended: 60
        },
        {
          id: "math-num-f3",
          question: "What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, ...?",
          answer: "21\n\nIn the Fibonacci sequence, each number is the sum of the two preceding ones.\n13 + 8 = 21",
          difficulty: "easy",
          tags: ["numbers", "patterns", "fibonacci"],
          timeRecommended: 20
        },
        {
          id: "math-num-f4",
          question: "If a = 1, b = 2, c = 3, and so on, what does the word 'MATH' equal when you add up the values of its letters?",
          answer: "45\n\nM = 13\nA = 1\nT = 20\nH = 8\n\n13 + 1 + 20 + 8 = 45",
          difficulty: "medium",
          tags: ["numbers", "patterns", "coding"],
          timeRecommended: 30
        },
        {
          id: "math-num-f5",
          question: "What is the missing number in the sequence: 1, 8, 27, ?, 125, 216?",
          answer: "64\n\nThis sequence consists of perfect cubes:\n1 = 1³\n8 = 2³\n27 = 3³\n64 = 4³\n125 = 5³\n216 = 6³",
          difficulty: "medium",
          tags: ["numbers", "patterns", "sequences"],
          timeRecommended: 35
        },
        {
          id: "math-num-f6",
          question: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
          answer: "5 minutes\n\nThis is a logical reasoning problem.\n\nIf 5 machines make 5 widgets in 5 minutes, then 1 machine makes 1 widget in 5 minutes.\n\nSo 100 machines would make 100 widgets in 5 minutes.",
          difficulty: "hard",
          tags: ["numbers", "logic", "problem solving"],
          timeRecommended: 45
        },
        {
          id: "math-num-f7",
          question: "What is the sum of the first 100 positive integers (1 + 2 + 3 + ... + 100)?",
          answer: "5050\n\nWe can use the formula for the sum of an arithmetic sequence:\nSum = n(a₁ + aₙ)/2\nwhere n is the number of terms, a₁ is the first term, and aₙ is the last term.\n\nSum = 100(1 + 100)/2 = 100 × 101/2 = 5050",
          difficulty: "hard",
          tags: ["numbers", "sequences", "summation"],
          timeRecommended: 40
        },
        {
          id: "math-num-f8",
          question: "What number comes next: 1, 4, 9, 16, 25, ...?",
          answer: "36\n\nThese are perfect squares:\n1 = 1²\n4 = 2²\n9 = 3²\n16 = 4²\n25 = 5²\n36 = 6²",
          difficulty: "easy",
          tags: ["numbers", "patterns", "squares"],
          timeRecommended: 20
        },
        {
          id: "math-num-f9",
          question: "If you have 9 coins and one of them is counterfeit (lighter than the others), how many weighings on a balance scale would you need to identify it?",
          answer: "2 weighings\n\nFirst weighing: Compare 3 coins against 3 coins.\nIf they balance, the counterfeit coin is among the remaining 3 coins.\nIf they don't balance, the counterfeit coin is in the lighter group.\n\nSecond weighing: From the group of 3 that contains the counterfeit coin, compare 1 coin against 1 coin.\nIf they balance, the third coin is counterfeit.\nIf they don't balance, the lighter coin is counterfeit.",
          difficulty: "hard",
          tags: ["logic", "problem solving", "weighing problems"],
          timeRecommended: 60
        },
        {
          id: "math-num-f10",
          question: "What is the value of x in the equation: 2^x = 32?",
          answer: "x = 5\n\nWe need to find x such that 2^x = 32.\n\nSince 2^5 = 32, x = 5.",
          difficulty: "medium",
          tags: ["algebra", "exponents", "equations"],
          timeRecommended: 30
        }
      ],
      totalCards: 10,
      estimatedTime: 375,
      difficulty: "hard"
    }
  ]
};