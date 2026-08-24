import type { CitizenshipQuestion } from '@/src/types/question';
import { nepaliTranslations } from '@/src/data/nepaliTranslations';
import { warnIfInvalidQuestionSet } from '@/src/utils/validation';

/*
  Source of truth: 2025-Civics-Test-128-Questions-and-Answers.pdf
  Extracted from the user-provided USCIS PDF in official order.
  Do not edit UI components when updating questions; edit this dataset only.

  Validation expectation: questions.length === 128 and numbers cover 1 through 128.
*/
export const questionSetMeta = {
  title: '128 Civics Questions and Answers (2025 version)',
  source: '2025-Civics-Test-128-Questions-and-Answers.pdf',
  sourceUrl: 'https://www.uscis.gov/citizenship',
  totalQuestions: 128,
  intro: [
    "Listed below are the 128 civics questions and answers for the 2025 version of the civics test.",
    "On the civics test, some answers may change because of elections or appointments. Visit uscis.gov/citizenship/testupdates to find any answers that may have changed on the civics test.",
    "Applicants are encouraged to respond to the questions using the answers provided by USCIS."
  ],
} as const;

const baseQuestions = [
  {
    "id": "q001",
    "number": 1,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "What is the form of government of the United States?",
    "answers": [
      "Republic",
      "Constitution-based federal republic",
      "Representative democracy"
    ],
    "type": "civics",
    "sourcePage": 2,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q002",
    "number": 2,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "What is the supreme law of the land?",
    "answers": [
      "(U.S.) Constitution"
    ],
    "nepaliQuestion": "देशको सर्वोच्च कानून के हो?",
    "nepaliAnswers": [
      "संविधान"
    ],
    "type": "civics",
    "sourcePage": 2,
    "specialConsideration": true,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q003",
    "number": 3,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "Name one thing the U.S. Constitution does.",
    "answers": [
      "Forms the government",
      "Defines powers of government",
      "Defines the parts of government",
      "Protects the rights of the people"
    ],
    "nepaliQuestion": "संविधानले के गर्छ?",
    "nepaliAnswers": [
      "सरकारको संरचना बनाउँछ",
      "सरकारका अधिकारहरू परिभाषित गर्छ",
      "सरकारका भागहरू परिभाषित गर्छ",
      "जनताको अधिकार संरक्षण गर्छ"
    ],
    "type": "civics",
    "sourcePage": 2,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q004",
    "number": 4,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "The U.S. Constitution starts with the words “We the People.” What does “We the People” mean?",
    "answers": [
      "Self-government",
      "Popular sovereignty",
      "Consent of the governed",
      "People should govern themselves",
      "(Example of) social contract"
    ],
    "type": "civics",
    "sourcePage": 2,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q005",
    "number": 5,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "How are changes made to the U.S. Constitution?",
    "answers": [
      "Amendments",
      "The amendment process"
    ],
    "type": "civics",
    "sourcePage": 2,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q006",
    "number": 6,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "What does the Bill of Rights protect?",
    "answers": [
      "(The basic) rights of Americans",
      "(The basic) rights of people living in the United States"
    ],
    "type": "civics",
    "sourcePage": 2,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q007",
    "number": 7,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "How many amendments does the U.S. Constitution have?",
    "answers": [
      "Twenty-seven (27)"
    ],
    "type": "civics",
    "sourcePage": 2,
    "specialConsideration": true,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q008",
    "number": 8,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "Why is the Declaration of Independence important?",
    "answers": [
      "It says America is free from British control.",
      "It says all people are created equal.",
      "It identifies inherent rights.",
      "It identifies individual freedoms."
    ],
    "type": "civics",
    "sourcePage": 2,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q009",
    "number": 9,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "What founding document said the American colonies were free from Britain?",
    "answers": [
      "Declaration of Independence"
    ],
    "type": "civics",
    "sourcePage": 3,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q010",
    "number": 10,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "Name two important ideas from the Declaration of Independence and the U.S. Constitution.",
    "answers": [
      "Equality",
      "Liberty",
      "Social contract",
      "Natural rights",
      "Limited government",
      "Self-government"
    ],
    "type": "civics",
    "sourcePage": 3,
    "specialConsideration": false,
    "answerInstruction": "Give two.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q011",
    "number": 11,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "The words “Life, Liberty, and the pursuit of Happiness” are in what founding document?",
    "answers": [
      "Declaration of Independence"
    ],
    "type": "civics",
    "sourcePage": 3,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q012",
    "number": 12,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "What is the economic system of the United States?",
    "answers": [
      "Capitalism",
      "Free market economy"
    ],
    "type": "civics",
    "sourcePage": 3,
    "specialConsideration": true,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q013",
    "number": 13,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "What is the rule of law?",
    "answers": [
      "Everyone must follow the law.",
      "Leaders must obey the law.",
      "Government must obey the law.",
      "No one is above the law."
    ],
    "type": "civics",
    "sourcePage": 3,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q014",
    "number": 14,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "Many documents influenced the U.S. Constitution. Name one.",
    "answers": [
      "Declaration of Independence",
      "Articles of Confederation",
      "Federalist Papers",
      "Anti-Federalist Papers",
      "Virginia Declaration of Rights",
      "Fundamental Orders of Connecticut",
      "Mayflower Compact",
      "Iroquois Great Law of Peace"
    ],
    "type": "civics",
    "sourcePage": 3,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q015",
    "number": 15,
    "category": "American Government",
    "subcategory": "Principles of American Government",
    "question": "There are three branches of government. Why?",
    "answers": [
      "So one part does not become too powerful",
      "Checks and balances",
      "Separation of powers"
    ],
    "type": "civics",
    "sourcePage": 3,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q016",
    "number": 16,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Name the three branches of government.",
    "answers": [
      "Legislative, executive, and judicial",
      "Congress, president, and the courts"
    ],
    "type": "civics",
    "sourcePage": 4,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q017",
    "number": 17,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "The President of the United States is in charge of which branch of government?",
    "answers": [
      "Executive branch"
    ],
    "type": "civics",
    "sourcePage": 4,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q018",
    "number": 18,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "What part of the federal government writes laws?",
    "answers": [
      "(U.S.) Congress",
      "(U.S. or national) legislature",
      "Legislative branch"
    ],
    "type": "civics",
    "sourcePage": 4,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q019",
    "number": 19,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "What are the two parts of the U.S. Congress?",
    "answers": [
      "Senate and House (of Representatives)"
    ],
    "type": "civics",
    "sourcePage": 4,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q020",
    "number": 20,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Name one power of the U.S. Congress.",
    "answers": [
      "Writes laws",
      "Declares war",
      "Makes the federal budget"
    ],
    "type": "civics",
    "sourcePage": 4,
    "specialConsideration": true,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q021",
    "number": 21,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "How many U.S. senators are there?",
    "answers": [
      "One hundred (100)"
    ],
    "type": "civics",
    "sourcePage": 4,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q022",
    "number": 22,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "How long is a term for a U.S. senator?",
    "answers": [
      "Six (6) years"
    ],
    "type": "civics",
    "sourcePage": 4,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q023",
    "number": 23,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Who is one of your state’s U.S. senators now?",
    "answers": [
      "John Cornyn",
      "Ted Cruz"
    ],
    "type": "civics",
    "sourcePage": 4,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": true,
    "currentAnswer": true,
    "note": "Texas answer. Verified from the official U.S. Senate state listing."
  },
  {
    "id": "q024",
    "number": 24,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "How many voting members are in the House of Representatives?",
    "answers": [
      "Four hundred thirty-five (435)"
    ],
    "type": "civics",
    "sourcePage": 4,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q025",
    "number": 25,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "How long is a term for a member of the House of Representatives?",
    "answers": [
      "Two (2) years"
    ],
    "type": "civics",
    "sourcePage": 4,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q026",
    "number": 26,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Why do U.S. representatives serve shorter terms than U.S. senators?",
    "answers": [
      "To more closely follow public opinion"
    ],
    "type": "civics",
    "sourcePage": 4,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q027",
    "number": 27,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "How many senators does each state have?",
    "answers": [
      "Two (2)"
    ],
    "type": "civics",
    "sourcePage": 4,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q028",
    "number": 28,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Why does each state have two senators?",
    "answers": [
      "Equal representation (for small states)",
      "The Great Compromise (Connecticut Compromise)"
    ],
    "type": "civics",
    "sourcePage": 5,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q029",
    "number": 29,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Name your U.S. representative.",
    "answers": [
      "Your U.S. Representative depends on your Texas congressional district. Use house.gov with your ZIP code or address to find the exact name."
    ],
    "type": "civics",
    "sourcePage": 5,
    "specialConsideration": false,
    "answerInstruction": "District-specific answer.",
    "variableAnswer": true,
    "currentAnswer": false,
    "note": "Texas has multiple congressional districts, so this cannot be determined from the state alone."
  },
  {
    "id": "q030",
    "number": 30,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "What is the name of the Speaker of the House of Representatives now?",
    "answers": [
      "Mike Johnson",
      "Johnson",
      "James Michael Johnson"
    ],
    "type": "civics",
    "sourcePage": 5,
    "specialConsideration": true,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": true,
    "note": "Verified from USCIS civics test updates."
  },
  {
    "id": "q031",
    "number": 31,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Who does a U.S. senator represent?",
    "answers": [
      "Citizens of their state",
      "People of their state"
    ],
    "type": "civics",
    "sourcePage": 5,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q032",
    "number": 32,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Who elects U.S. senators?",
    "answers": [
      "Citizens from their state"
    ],
    "type": "civics",
    "sourcePage": 5,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q033",
    "number": 33,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Who does a member of the House of Representatives represent?",
    "answers": [
      "Citizens in their (congressional) district",
      "Citizens in their district",
      "People from their (congressional) district",
      "People in their district"
    ],
    "type": "civics",
    "sourcePage": 5,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q034",
    "number": 34,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Who elects members of the House of Representatives?",
    "answers": [
      "Citizens from their (congressional) district"
    ],
    "type": "civics",
    "sourcePage": 5,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q035",
    "number": 35,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Some states have more representatives than other states. Why?",
    "answers": [
      "(Because of) the state’s population",
      "(Because) they have more people",
      "(Because) some states have more people"
    ],
    "type": "civics",
    "sourcePage": 5,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q036",
    "number": 36,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "The President of the United States is elected for how many years?",
    "answers": [
      "Four (4) years"
    ],
    "type": "civics",
    "sourcePage": 5,
    "specialConsideration": true,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q037",
    "number": 37,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "The President of the United States can serve only two terms. Why?",
    "answers": [
      "(Because of) the 22nd Amendment",
      "To keep the president from becoming too powerful"
    ],
    "type": "civics",
    "sourcePage": 5,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q038",
    "number": 38,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "What is the name of the President of the United States now?",
    "answers": [
      "Donald J. Trump",
      "Donald Trump",
      "Trump"
    ],
    "type": "civics",
    "sourcePage": 5,
    "specialConsideration": true,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": true,
    "note": "Verified from USCIS civics test updates."
  },
  {
    "id": "q039",
    "number": 39,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "What is the name of the Vice President of the United States now?",
    "answers": [
      "JD Vance",
      "Vance"
    ],
    "type": "civics",
    "sourcePage": 6,
    "specialConsideration": true,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": true,
    "note": "Verified from USCIS civics test updates."
  },
  {
    "id": "q040",
    "number": 40,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "If the president can no longer serve, who becomes president?",
    "answers": [
      "The Vice President (of the United States)"
    ],
    "type": "civics",
    "sourcePage": 6,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q041",
    "number": 41,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Name one power of the president.",
    "answers": [
      "Signs bills into law",
      "Vetoes bills",
      "Enforces laws",
      "Commander in Chief (of the military)",
      "Chief diplomat",
      "Appoints federal judges"
    ],
    "type": "civics",
    "sourcePage": 6,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q042",
    "number": 42,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Who is Commander in Chief of the U.S. military?",
    "answers": [
      "The President (of the United States)"
    ],
    "type": "civics",
    "sourcePage": 6,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q043",
    "number": 43,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Who signs bills to become laws?",
    "answers": [
      "The President (of the United States)"
    ],
    "type": "civics",
    "sourcePage": 6,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q044",
    "number": 44,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Who vetoes bills?",
    "answers": [
      "The President (of the United States)"
    ],
    "type": "civics",
    "sourcePage": 6,
    "specialConsideration": true,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q045",
    "number": 45,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Who appoints federal judges?",
    "answers": [
      "The President (of the United States)"
    ],
    "type": "civics",
    "sourcePage": 6,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q046",
    "number": 46,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "The executive branch has many parts. Name one.",
    "answers": [
      "President (of the United States)",
      "Cabinet",
      "Federal departments and agencies"
    ],
    "type": "civics",
    "sourcePage": 6,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q047",
    "number": 47,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "What does the President’s Cabinet do?",
    "answers": [
      "Advises the President (of the United States)"
    ],
    "type": "civics",
    "sourcePage": 6,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q048",
    "number": 48,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "What are two Cabinet-level positions?",
    "answers": [
      "Attorney General",
      "Secretary of Agriculture",
      "Secretary of Commerce",
      "Secretary of Education",
      "Secretary of Energy",
      "Secretary of Health and Human Services",
      "Secretary of Homeland Security",
      "Secretary of Housing and Urban Development",
      "Secretary of the Interior",
      "Secretary of Labor",
      "Secretary of State",
      "Secretary of Transportation",
      "Secretary of the Treasury",
      "Secretary of Veterans Affairs",
      "Secretary of War (Defense)",
      "Vice-President",
      "Administrator of the Environmental Protection Agency",
      "Administrator of the Small Business Administration",
      "Director of the Central Intelligence Agency",
      "Director of the Office of Management and Budget",
      "Director of National Intelligence",
      "United States Trade Representative"
    ],
    "type": "civics",
    "sourcePage": 7,
    "specialConsideration": false,
    "answerInstruction": "Give two.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q049",
    "number": 49,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Why is the Electoral College important?",
    "answers": [
      "It decides who is elected president.",
      "It provides a compromise between the popular election of the president and congressional selection."
    ],
    "type": "civics",
    "sourcePage": 7,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q050",
    "number": 50,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "What is one part of the judicial branch?",
    "answers": [
      "Supreme Court",
      "Federal Courts"
    ],
    "type": "civics",
    "sourcePage": 7,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q051",
    "number": 51,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "What does the judicial branch do?",
    "answers": [
      "Reviews laws",
      "Explains laws",
      "Resolves disputes (disagreements) about the law",
      "Decides if a law goes against the (U.S.) Constitution"
    ],
    "type": "civics",
    "sourcePage": 7,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q052",
    "number": 52,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "What is the highest court in the United States?",
    "answers": [
      "Supreme Court"
    ],
    "type": "civics",
    "sourcePage": 7,
    "specialConsideration": true,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q053",
    "number": 53,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "How many seats are on the Supreme Court?",
    "answers": [
      "Nine (9)"
    ],
    "type": "civics",
    "sourcePage": 8,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q054",
    "number": 54,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "How many Supreme Court justices are usually needed to decide a case?",
    "answers": [
      "Five (5)"
    ],
    "type": "civics",
    "sourcePage": 8,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q055",
    "number": 55,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "How long do Supreme Court justices serve?",
    "answers": [
      "(For) life",
      "Lifetime appointment",
      "(Until) retirement"
    ],
    "type": "civics",
    "sourcePage": 8,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q056",
    "number": 56,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Supreme Court justices serve for life. Why?",
    "answers": [
      "To be independent (of politics)",
      "To limit outside (political) influence"
    ],
    "type": "civics",
    "sourcePage": 8,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q057",
    "number": 57,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Who is the Chief Justice of the United States now?",
    "answers": [
      "John Roberts",
      "John G. Roberts, Jr.",
      "Roberts"
    ],
    "type": "civics",
    "sourcePage": 8,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": true,
    "note": "Verified from USCIS civics test updates."
  },
  {
    "id": "q058",
    "number": 58,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Name one power that is only for the federal government.",
    "answers": [
      "Print paper money",
      "Mint coins",
      "Declare war",
      "Create an army",
      "Make treaties",
      "Set foreign policy"
    ],
    "type": "civics",
    "sourcePage": 8,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q059",
    "number": 59,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Name one power that is only for the states.",
    "answers": [
      "Provide schooling and education",
      "Provide protection (police)",
      "Provide safety (fire departments)",
      "Give a driver’s license",
      "Approve zoning and land use"
    ],
    "type": "civics",
    "sourcePage": 8,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q060",
    "number": 60,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "What is the purpose of the 10th Amendment?",
    "answers": [
      "(It states that the) powers not given to the federal government belong to the states or to the people."
    ],
    "type": "civics",
    "sourcePage": 8,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q061",
    "number": 61,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "Who is the governor of your state now?",
    "answers": [
      "Greg Abbott",
      "Abbott"
    ],
    "type": "civics",
    "sourcePage": 8,
    "specialConsideration": true,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": true,
    "currentAnswer": true,
    "note": "Texas answer. Verified from the Office of the Texas Governor."
  },
  {
    "id": "q062",
    "number": 62,
    "category": "American Government",
    "subcategory": "System of Government",
    "question": "What is the capital of your state?",
    "answers": [
      "Austin"
    ],
    "type": "civics",
    "sourcePage": 8,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": true,
    "currentAnswer": false,
    "note": "Texas answer. Verified from official Texas state resources."
  },
  {
    "id": "q063",
    "number": 63,
    "category": "American Government",
    "subcategory": "Rights and Responsibilities",
    "question": "There are four amendments to the U.S. Constitution about who can vote. Describe one of them.",
    "answers": [
      "Citizens eighteen (18) and older (can vote).",
      "You don’t have to pay (a poll tax) to vote.",
      "Any citizen can vote. (Women and men can vote.)",
      "A male citizen of any race (can vote)."
    ],
    "type": "civics",
    "sourcePage": 9,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q064",
    "number": 64,
    "category": "American Government",
    "subcategory": "Rights and Responsibilities",
    "question": "Who can vote in federal elections, run for federal office, and serve on a jury in the United States?",
    "answers": [
      "Citizens",
      "Citizens of the United States",
      "U.S. citizens"
    ],
    "type": "civics",
    "sourcePage": 9,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q065",
    "number": 65,
    "category": "American Government",
    "subcategory": "Rights and Responsibilities",
    "question": "What are three rights of everyone living in the United States?",
    "answers": [
      "Freedom of expression",
      "Freedom of speech",
      "Freedom of assembly",
      "Freedom to petition the government",
      "Freedom of religion",
      "The right to bear arms"
    ],
    "type": "civics",
    "sourcePage": 9,
    "specialConsideration": false,
    "answerInstruction": "Give three.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q066",
    "number": 66,
    "category": "American Government",
    "subcategory": "Rights and Responsibilities",
    "question": "What do we show loyalty to when we say the Pledge of Allegiance?",
    "answers": [
      "The United States",
      "The flag"
    ],
    "type": "civics",
    "sourcePage": 9,
    "specialConsideration": true,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q067",
    "number": 67,
    "category": "American Government",
    "subcategory": "Rights and Responsibilities",
    "question": "Name two promises that new citizens make in the Oath of Allegiance.",
    "answers": [
      "Give up loyalty to other countries",
      "Defend the (U.S.) Constitution",
      "Obey the laws of the United States",
      "Serve in the military (if needed)",
      "Serve (help, do important work for) the nation (if needed)",
      "Be loyal to the United States"
    ],
    "type": "civics",
    "sourcePage": 9,
    "specialConsideration": false,
    "answerInstruction": "Give two.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q068",
    "number": 68,
    "category": "American Government",
    "subcategory": "Rights and Responsibilities",
    "question": "How can people become United States citizens?",
    "answers": [
      "Be born in the United States, under the conditions set by the 14th Amendment",
      "Naturalize",
      "Derive citizenship (under conditions set by Congress)"
    ],
    "type": "civics",
    "sourcePage": 9,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q069",
    "number": 69,
    "category": "American Government",
    "subcategory": "Rights and Responsibilities",
    "question": "What are two examples of civic participation in the United States?",
    "answers": [
      "Vote",
      "Run for office",
      "Join a political party",
      "Help with a campaign",
      "Join a civic group",
      "Join a community group",
      "Give an elected official your opinion (on an issue)",
      "Contact elected officials",
      "Support or oppose an issue or policy",
      "Write to a newspaper"
    ],
    "type": "civics",
    "sourcePage": 10,
    "specialConsideration": false,
    "answerInstruction": "Give two.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q070",
    "number": 70,
    "category": "American Government",
    "subcategory": "Rights and Responsibilities",
    "question": "What is one way Americans can serve their country?",
    "answers": [
      "Vote",
      "Pay taxes",
      "Obey the law",
      "Serve in the military",
      "Run for office",
      "Work for local, state, or federal government"
    ],
    "type": "civics",
    "sourcePage": 10,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q071",
    "number": 71,
    "category": "American Government",
    "subcategory": "Rights and Responsibilities",
    "question": "Why is it important to pay federal taxes?",
    "answers": [
      "Required by law",
      "All people pay to fund the federal government",
      "Required by the (U.S.) Constitution (16th Amendment)",
      "Civic duty"
    ],
    "type": "civics",
    "sourcePage": 10,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q072",
    "number": 72,
    "category": "American Government",
    "subcategory": "Rights and Responsibilities",
    "question": "It is important for all men age 18 through 25 to register for the Selective Service. Name one reason why.",
    "answers": [
      "Required by law",
      "Civic duty",
      "Makes the draft fair, if needed"
    ],
    "type": "civics",
    "sourcePage": 10,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q073",
    "number": 73,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "The colonists came to America for many reasons. Name one.",
    "answers": [
      "Freedom",
      "Political liberty",
      "Religious freedom",
      "Economic opportunity",
      "Escape persecution"
    ],
    "type": "civics",
    "sourcePage": 11,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q074",
    "number": 74,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "Who lived in America before the Europeans arrived?",
    "answers": [
      "American Indians",
      "Native Americans"
    ],
    "type": "civics",
    "sourcePage": 11,
    "specialConsideration": true,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q075",
    "number": 75,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "What group of people was taken and sold as slaves?",
    "answers": [
      "Africans",
      "People from Africa"
    ],
    "type": "civics",
    "sourcePage": 11,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q076",
    "number": 76,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "What war did the Americans fight to win independence from Britain?",
    "answers": [
      "American Revolution",
      "The (American) Revolutionary War",
      "War for (American) Independence"
    ],
    "type": "civics",
    "sourcePage": 11,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q077",
    "number": 77,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "Name one reason why the Americans declared independence from Britain.",
    "answers": [
      "High taxes",
      "Taxation without representation",
      "British soldiers stayed in Americans’ houses (boarding, quartering)",
      "They did not have self-government",
      "Boston Massacre",
      "Boston Tea Party (Tea Act)",
      "Stamp Act",
      "Sugar Act",
      "Townshend Acts",
      "Intolerable (Coercive) Acts"
    ],
    "type": "civics",
    "sourcePage": 11,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q078",
    "number": 78,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "Who wrote the Declaration of Independence?",
    "answers": [
      "(Thomas) Jefferson"
    ],
    "type": "civics",
    "sourcePage": 11,
    "specialConsideration": true,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q079",
    "number": 79,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "When was the Declaration of Independence adopted?",
    "answers": [
      "July 4, 1776"
    ],
    "type": "civics",
    "sourcePage": 11,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q080",
    "number": 80,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "The American Revolution had many important events. Name one.",
    "answers": [
      "(Battle of) Bunker Hill",
      "Declaration of Independence",
      "Washington Crossing the Delaware (Battle of Trenton)",
      "(Battle of) Saratoga",
      "Valley Forge (Encampment)",
      "(Battle of) Yorktown (British surrender at Yorktown)"
    ],
    "type": "civics",
    "sourcePage": 12,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q081",
    "number": 81,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "There were 13 original states. Name five.",
    "answers": [
      "New Hampshire",
      "Massachusetts",
      "Rhode Island",
      "Connecticut",
      "New York",
      "New Jersey",
      "Pennsylvania",
      "Delaware",
      "Maryland",
      "Virginia",
      "North Carolina",
      "South Carolina",
      "Georgia"
    ],
    "type": "civics",
    "sourcePage": 12,
    "specialConsideration": false,
    "answerInstruction": "Give five.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q082",
    "number": 82,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "What founding document was written in 1787?",
    "answers": [
      "(U.S.) Constitution"
    ],
    "type": "civics",
    "sourcePage": 12,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q083",
    "number": 83,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.",
    "answers": [
      "(James) Madison",
      "(Alexander) Hamilton",
      "(John) Jay",
      "Publius"
    ],
    "type": "civics",
    "sourcePage": 12,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q084",
    "number": 84,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "Why were the Federalist Papers important?",
    "answers": [
      "They helped people understand the (U.S.) Constitution.",
      "They supported passing the (U.S.) Constitution."
    ],
    "type": "civics",
    "sourcePage": 12,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q085",
    "number": 85,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "Benjamin Franklin is famous for many things. Name one.",
    "answers": [
      "Founded the first free public libraries",
      "First Postmaster General of the United States",
      "Helped write the Declaration of Independence",
      "Inventor",
      "U.S. diplomat"
    ],
    "type": "civics",
    "sourcePage": 12,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q086",
    "number": 86,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "George Washington is famous for many things. Name one.",
    "answers": [
      "“Father of Our Country”",
      "First president of the United States",
      "General of the Continental Army",
      "President of the Constitutional Convention"
    ],
    "type": "civics",
    "sourcePage": 13,
    "specialConsideration": true,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q087",
    "number": 87,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "Thomas Jefferson is famous for many things. Name one.",
    "answers": [
      "Writer of the Declaration of Independence",
      "Third president of the United States",
      "Doubled the size of the United States (Louisiana Purchase)",
      "First Secretary of State",
      "Founded the University of Virginia",
      "Writer of the Virginia Statute on Religious Freedom"
    ],
    "type": "civics",
    "sourcePage": 13,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q088",
    "number": 88,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "James Madison is famous for many things. Name one.",
    "answers": [
      "“Father of the Constitution”",
      "Fourth president of the United States",
      "President during the War of 1812",
      "One of the writers of the Federalist Papers"
    ],
    "type": "civics",
    "sourcePage": 13,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q089",
    "number": 89,
    "category": "American History",
    "subcategory": "Colonial Period and Independence",
    "question": "Alexander Hamilton is famous for many things. Name one.",
    "answers": [
      "First Secretary of the Treasury",
      "One of the writers of the Federalist Papers",
      "Helped establish the First Bank of the United States",
      "Aide to General George Washington",
      "Member of the Continental Congress"
    ],
    "type": "civics",
    "sourcePage": 13,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q090",
    "number": 90,
    "category": "American History",
    "subcategory": "1800s",
    "question": "What territory did the United States buy from France in 1803?",
    "answers": [
      "Louisiana Territory",
      "Louisiana"
    ],
    "type": "civics",
    "sourcePage": 13,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q091",
    "number": 91,
    "category": "American History",
    "subcategory": "1800s",
    "question": "Name one war fought by the United States in the 1800s.",
    "answers": [
      "War of 1812",
      "Mexican-American War",
      "Civil War",
      "Spanish-American War"
    ],
    "type": "civics",
    "sourcePage": 13,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q092",
    "number": 92,
    "category": "American History",
    "subcategory": "1800s",
    "question": "Name the U.S. war between the North and the South.",
    "answers": [
      "The Civil War"
    ],
    "type": "civics",
    "sourcePage": 13,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q093",
    "number": 93,
    "category": "American History",
    "subcategory": "1800s",
    "question": "The Civil War had many important events. Name one.",
    "answers": [
      "(Battle of) Fort Sumter",
      "Emancipation Proclamation",
      "(Battle of) Vicksburg",
      "(Battle of) Gettysburg",
      "Sherman’s March",
      "(Surrender at) Appomattox",
      "(Battle of) Antietam/Sharpsburg",
      "Lincoln was assassinated."
    ],
    "type": "civics",
    "sourcePage": 14,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q094",
    "number": 94,
    "category": "American History",
    "subcategory": "1800s",
    "question": "Abraham Lincoln is famous for many things. Name one.",
    "answers": [
      "Freed the slaves (Emancipation Proclamation)",
      "Saved (or preserved) the Union",
      "Led the United States during the Civil War",
      "16th president of the United States",
      "Delivered the Gettysburg Address"
    ],
    "type": "civics",
    "sourcePage": 14,
    "specialConsideration": true,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q095",
    "number": 95,
    "category": "American History",
    "subcategory": "1800s",
    "question": "What did the Emancipation Proclamation do?",
    "answers": [
      "Freed the slaves",
      "Freed slaves in the Confederacy",
      "Freed slaves in the Confederate states",
      "Freed slaves in most Southern states"
    ],
    "type": "civics",
    "sourcePage": 14,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q096",
    "number": 96,
    "category": "American History",
    "subcategory": "1800s",
    "question": "What U.S. war ended slavery?",
    "answers": [
      "The Civil War"
    ],
    "type": "civics",
    "sourcePage": 14,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q097",
    "number": 97,
    "category": "American History",
    "subcategory": "1800s",
    "question": "What amendment says all persons born or naturalized in the United States, and subject to the jurisdiction thereof, are U.S. citizens?",
    "answers": [
      "14th Amendment"
    ],
    "type": "civics",
    "sourcePage": 14,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q098",
    "number": 98,
    "category": "American History",
    "subcategory": "1800s",
    "question": "When did all men get the right to vote?",
    "answers": [
      "After the Civil War",
      "During Reconstruction",
      "(With the) 15th Amendment",
      "1870"
    ],
    "type": "civics",
    "sourcePage": 14,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q099",
    "number": 99,
    "category": "American History",
    "subcategory": "1800s",
    "question": "Name one leader of the women’s rights movement in the 1800s.",
    "answers": [
      "Susan B. Anthony",
      "Elizabeth Cady Stanton",
      "Sojourner Truth",
      "Harriet Tubman",
      "Lucretia Mott",
      "Lucy Stone"
    ],
    "type": "civics",
    "sourcePage": 14,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q100",
    "number": 100,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "Name one war fought by the United States in the 1900s.",
    "answers": [
      "World War I",
      "World War II",
      "Korean War",
      "Vietnam War",
      "(Persian) Gulf War"
    ],
    "type": "civics",
    "sourcePage": 15,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q101",
    "number": 101,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "Why did the United States enter World War I?",
    "answers": [
      "Because Germany attacked U.S. (civilian) ships",
      "To support the Allied Powers (England, France, Italy, and Russia)",
      "To oppose the Central Powers (Germany, Austria-Hungary, the Ottoman Empire, and Bulgaria)"
    ],
    "type": "civics",
    "sourcePage": 15,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q102",
    "number": 102,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "When did all women get the right to vote?",
    "answers": [
      "1920",
      "After World War I",
      "(With the) 19th Amendment"
    ],
    "type": "civics",
    "sourcePage": 15,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q103",
    "number": 103,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "What was the Great Depression?",
    "answers": [
      "Longest economic recession in modern history"
    ],
    "type": "civics",
    "sourcePage": 15,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q104",
    "number": 104,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "When did the Great Depression start?",
    "answers": [
      "The Great Crash (1929)",
      "Stock market crash of 1929"
    ],
    "type": "civics",
    "sourcePage": 15,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q105",
    "number": 105,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "Who was president during the Great Depression and World War II?",
    "answers": [
      "(Franklin) Roosevelt"
    ],
    "type": "civics",
    "sourcePage": 15,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q106",
    "number": 106,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "Why did the United States enter World War II?",
    "answers": [
      "(Bombing of) Pearl Harbor",
      "Japanese attacked Pearl Harbor",
      "To support the Allied Powers (England, France, and Russia)",
      "To oppose the Axis Powers (Germany, Italy, and Japan)"
    ],
    "type": "civics",
    "sourcePage": 15,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q107",
    "number": 107,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "Dwight Eisenhower is famous for many things. Name one.",
    "answers": [
      "General during World War II",
      "President at the end of (during) the Korean War",
      "34th president of the United States",
      "Signed the Federal-Aid Highway Act of 1956 (Created the Interstate System)"
    ],
    "type": "civics",
    "sourcePage": 15,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q108",
    "number": 108,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "Who was the United States’ main rival during the Cold War?",
    "answers": [
      "Soviet Union",
      "USSR",
      "Russia"
    ],
    "type": "civics",
    "sourcePage": 16,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q109",
    "number": 109,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "During the Cold War, what was one main concern of the United States?",
    "answers": [
      "Communism",
      "Nuclear war"
    ],
    "type": "civics",
    "sourcePage": 16,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q110",
    "number": 110,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "Why did the United States enter the Korean War?",
    "answers": [
      "To stop the spread of communism"
    ],
    "type": "civics",
    "sourcePage": 16,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q111",
    "number": 111,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "Why did the United States enter the Vietnam War?",
    "answers": [
      "To stop the spread of communism"
    ],
    "type": "civics",
    "sourcePage": 16,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q112",
    "number": 112,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "What did the civil rights movement do?",
    "answers": [
      "Fought to end racial discrimination"
    ],
    "type": "civics",
    "sourcePage": 16,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q113",
    "number": 113,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "Martin Luther King, Jr. is famous for many things. Name one.",
    "answers": [
      "Fought for civil rights",
      "Worked for equality for all Americans",
      "Worked to ensure that people would “not be judged by the color of their skin, but by the content of their character”"
    ],
    "type": "civics",
    "sourcePage": 16,
    "specialConsideration": true,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q114",
    "number": 114,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "Why did the United States enter the Persian Gulf War?",
    "answers": [
      "To force the Iraqi military from Kuwait"
    ],
    "type": "civics",
    "sourcePage": 16,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q115",
    "number": 115,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "What major event happened on September 11, 2001 in the United States?",
    "answers": [
      "Terrorists attacked the United States",
      "Terrorists took over two planes and crashed them into the World Trade Center in New York City",
      "Terrorists took over a plane and crashed into the Pentagon in Arlington, Virginia",
      "Terrorists took over a plane originally aimed at Washington, D.C., and crashed in a field in Pennsylvania"
    ],
    "type": "civics",
    "sourcePage": 16,
    "specialConsideration": true,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q116",
    "number": 116,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "Name one U.S. military conflict after the September 11, 2001 attacks.",
    "answers": [
      "(Global) War on Terror",
      "War in Afghanistan",
      "War in Iraq"
    ],
    "type": "civics",
    "sourcePage": 16,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q117",
    "number": 117,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "Name one American Indian tribe in the United States.",
    "answers": [
      "Apache",
      "Blackfeet",
      "Cayuga",
      "Cherokee",
      "Cheyenne",
      "Chippewa",
      "Choctaw",
      "Creek",
      "Crow",
      "Hopi",
      "Huron",
      "Inupiat",
      "Lakota",
      "Mohawk",
      "Mohegan",
      "Navajo",
      "Oneida",
      "Onondaga",
      "Pueblo",
      "Seminole",
      "Seneca",
      "Shawnee",
      "Sioux",
      "Teton",
      "Tuscarora"
    ],
    "type": "civics",
    "sourcePage": 17,
    "specialConsideration": false,
    "note": "For a complete list of tribes, please visit bia.gov.",
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q118",
    "number": 118,
    "category": "American History",
    "subcategory": "Recent American History and Other Important Historical Information",
    "question": "Name one example of an American innovation.",
    "answers": [
      "Light bulb",
      "Automobile (cars, internal combustion engine)",
      "Skyscrapers",
      "Airplane",
      "Assembly line",
      "Landing on the moon",
      "Integrated circuit (IC)"
    ],
    "type": "civics",
    "sourcePage": 17,
    "specialConsideration": false,
    "answerInstruction": "Give one.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q119",
    "number": 119,
    "category": "Symbols and Holidays",
    "subcategory": "Symbols",
    "question": "What is the capital of the United States?",
    "answers": [
      "Washington, D.C."
    ],
    "type": "civics",
    "sourcePage": 18,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q120",
    "number": 120,
    "category": "Symbols and Holidays",
    "subcategory": "Symbols",
    "question": "Where is the Statue of Liberty?",
    "answers": [
      "New York (Harbor)",
      "Liberty Island [Also acceptable are New Jersey, near New York City, and on the Hudson (River).]"
    ],
    "type": "civics",
    "sourcePage": 18,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q121",
    "number": 121,
    "category": "Symbols and Holidays",
    "subcategory": "Symbols",
    "question": "Why does the flag have 13 stripes?",
    "answers": [
      "(Because there were) 13 original colonies",
      "(Because the stripes) represent the original colonies"
    ],
    "type": "civics",
    "sourcePage": 18,
    "specialConsideration": true,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q122",
    "number": 122,
    "category": "Symbols and Holidays",
    "subcategory": "Symbols",
    "question": "Why does the flag have 50 stars?",
    "answers": [
      "(Because there is) one star for each state",
      "(Because) each star represents a state",
      "(Because there are) 50 states"
    ],
    "type": "civics",
    "sourcePage": 18,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q123",
    "number": 123,
    "category": "Symbols and Holidays",
    "subcategory": "Symbols",
    "question": "What is the name of the national anthem?",
    "answers": [
      "The Star-Spangled Banner"
    ],
    "type": "civics",
    "sourcePage": 18,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q124",
    "number": 124,
    "category": "Symbols and Holidays",
    "subcategory": "Symbols",
    "question": "The Nation’s first motto was “E Pluribus Unum.” What does that mean?",
    "answers": [
      "Out of many, one",
      "We all become one"
    ],
    "type": "civics",
    "sourcePage": 18,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q125",
    "number": 125,
    "category": "Symbols and Holidays",
    "subcategory": "Holidays",
    "question": "What is Independence Day?",
    "answers": [
      "A holiday to celebrate U.S. independence (from Britain)",
      "The country’s birthday"
    ],
    "type": "civics",
    "sourcePage": 19,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q126",
    "number": 126,
    "category": "Symbols and Holidays",
    "subcategory": "Holidays",
    "question": "Name three national U.S. holidays.",
    "answers": [
      "New Year’s Day",
      "Martin Luther King, Jr. Day",
      "Presidents Day (Washington’s Birthday)",
      "Memorial Day",
      "Juneteenth",
      "Independence Day",
      "Labor Day",
      "Columbus Day",
      "Veterans Day",
      "Thanksgiving Day",
      "Christmas Day"
    ],
    "type": "civics",
    "sourcePage": 19,
    "specialConsideration": true,
    "answerInstruction": "Give three.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q127",
    "number": 127,
    "category": "Symbols and Holidays",
    "subcategory": "Holidays",
    "question": "What is Memorial Day?",
    "answers": [
      "A holiday to honor soldiers who died in military service"
    ],
    "type": "civics",
    "sourcePage": 19,
    "specialConsideration": false,
    "answerInstruction": "Accepted answer.",
    "variableAnswer": false,
    "currentAnswer": false
  },
  {
    "id": "q128",
    "number": 128,
    "category": "Symbols and Holidays",
    "subcategory": "Holidays",
    "question": "What is Veterans Day?",
    "answers": [
      "A holiday to honor people in the (U.S.) military",
      "A holiday to honor people who have served (in the U.S. military)"
    ],
    "type": "civics",
    "sourcePage": 19,
    "specialConsideration": false,
    "answerInstruction": "Accepted answers.",
    "variableAnswer": false,
    "currentAnswer": false
  }
] satisfies CitizenshipQuestion[];

export const questions = baseQuestions.map((question) => ({
  ...question,
  ...nepaliTranslations[question.id],
})) satisfies CitizenshipQuestion[];

warnIfInvalidQuestionSet(questions);
