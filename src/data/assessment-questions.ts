export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'binary';
  category: 'psychometric' | 'technical' | 'aptitude' | 'domain';
  subcategory?: string;
  options?: string[];
  correctAnswer?: string;
  points?: number;
}

export const assessmentQuestions: Question[] = [
  // Psychometric Section (10 questions)
  {
    id: 'psych_1',
    text: 'I enjoy analyzing real-world systems and understanding how they work.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest'
  },
  {
    id: 'psych_2', 
    text: 'I continue pursuing goals even after multiple failures.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'grit'
  },
  {
    id: 'psych_3',
    text: 'I prefer systems that follow clear rules over open-ended exploration.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'cognitive_style'
  },
  {
    id: 'psych_4',
    text: 'The ability to model the real world digitally excites me.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation'
  },
  {
    id: 'psych_5',
    text: 'I follow emerging tech trends like IoT, smart factories, and Industry 4.0.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest'
  },
  {
    id: 'psych_6',
    text: 'I learn from mistakes quickly and revise my approach.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'growth_mindset'
  },
  {
    id: 'psych_7',
    text: 'I enjoy working with both hardware and software components.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest'
  },
  {
    id: 'psych_8',
    text: 'I can stay focused on complex technical problems for hours.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'conscientiousness'
  },
  {
    id: 'psych_9',
    text: 'I am curious about how virtual models can predict real-world behavior.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'openness'
  },
  {
    id: 'psych_10',
    text: 'I believe technology should solve practical, real-world problems.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation'
  },

  // Technical Aptitude (10 questions)
  {
    id: 'tech_1',
    text: 'If a sensor reads temperature every 10 seconds and you need hourly averages, how many data points would you average?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'numerical_reasoning',
    options: ['6', '60', '360', '3600'],
    correctAnswer: '360',
    points: 10
  },
  {
    id: 'tech_2',
    text: 'Which data structure is most suitable for storing time-series sensor data?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'data_structures',
    options: ['Array/List', 'Hash Table', 'Binary Tree', 'Graph'],
    correctAnswer: 'Array/List',
    points: 10
  },
  {
    id: 'tech_3',
    text: 'What is the primary purpose of a digital twin?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'domain_knowledge',
    options: [
      'To replace physical systems entirely',
      'To create virtual replicas for simulation and optimization',
      'To store backup data',
      'To reduce manufacturing costs'
    ],
    correctAnswer: 'To create virtual replicas for simulation and optimization',
    points: 15
  },
  {
    id: 'tech_4',
    text: 'In a predictive maintenance system, what would indicate equipment failure?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'domain_knowledge',
    options: [
      'Normal operating temperatures',
      'Unusual vibration patterns or temperature spikes',
      'Regular maintenance schedules',
      'Low energy consumption'
    ],
    correctAnswer: 'Unusual vibration patterns or temperature spikes',
    points: 15
  },
  {
    id: 'tech_5',
    text: 'Which programming concept is essential for processing real-time IoT data?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'programming',
    options: ['Loops and conditionals', 'Object-oriented programming', 'Event-driven programming', 'Recursive functions'],
    correctAnswer: 'Event-driven programming',
    points: 10
  },
  {
    id: 'tech_6',
    text: 'How confident are you with Python programming?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'self_assessment',
    options: ['Complete beginner', 'Basic syntax knowledge', 'Can write simple programs', 'Intermediate level', 'Advanced level'],
    correctAnswer: 'Can write simple programs',
    points: 0
  },
  {
    id: 'tech_7',
    text: 'What does IoT stand for and what is its main purpose?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'domain_knowledge',
    options: [
      'Internet of Things - connecting physical devices to the internet',
      'Integration of Technology - combining different tech systems',
      'Information Technology - managing computer systems',
      'Interactive Objects Technology - creating smart interfaces'
    ],
    correctAnswer: 'Internet of Things - connecting physical devices to the internet',
    points: 10
  },
  {
    id: 'tech_8',
    text: 'Which tool is commonly used for 3D modeling and simulation?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'tools',
    options: ['Microsoft Excel', 'ANSYS or Siemens NX', 'Adobe Photoshop', 'Google Sheets'],
    correctAnswer: 'ANSYS or Siemens NX',
    points: 10
  },
  {
    id: 'tech_9',
    text: 'Rate your experience with data analysis and interpretation.',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'self_assessment',
    options: ['No experience', 'Basic charts and graphs', 'Statistical analysis', 'Advanced analytics', 'Expert level'],
    correctAnswer: 'Statistical analysis',
    points: 0
  },
  {
    id: 'tech_10',
    text: 'What is the main benefit of real-time monitoring in industrial systems?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'domain_knowledge',
    options: [
      'Reduced equipment costs',
      'Immediate detection of issues and optimization opportunities', 
      'Simplified maintenance schedules',
      'Lower energy bills'
    ],
    correctAnswer: 'Immediate detection of issues and optimization opportunities',
    points: 15
  }
];

export const sectionInfo = {
  psychometric: {
    title: "Personality & Interest Assessment",
    description: "Evaluating your personality traits, interests, and motivation for Digital Twin engineering.",
    icon: "🧠"
  },
  technical: {
    title: "Technical Knowledge & Aptitude",
    description: "Testing your foundational knowledge in programming, data analysis, and Digital Twin concepts.",
    icon: "⚙️"
  }
};