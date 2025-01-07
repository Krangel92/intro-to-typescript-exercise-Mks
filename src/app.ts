import { question } from "readline-sync";
import { ANSWERS } from "./answers";
import { QUESTIONS } from "./questions";

const getAnswer = (questionText): boolean => {
  const userAnswer = question("- " + questionText);
  if (userAnswer === "true") return true;
  if (userAnswer === "false") return false;
  console.log("Answer must be true or false");
  getAnswer(questionText);
};

const getAllAnswers = () => {
  let answers: boolean[] = [];
  for (let i = 0; i < QUESTIONS.length; i++) {
    const question = QUESTIONS[i];
    const userAnswer = getAnswer(question + "\n");
    answers.push(userAnswer);
  }
  return answers;
};

const checkAllAnswers = (userAnswers) => {
  return userAnswers.every((answer, i) => checkAnswer(i, answer));
};

const checkAnswer = (answer: boolean, question: number): boolean => {
  const correctAnswer = ANSWERS[question];
  if (correctAnswer === undefined) {
    throw new Error(`No answer at index ${question} found`);
  }
  return answer === correctAnswer;
};

const run = () => {
  console.log(
    "--- Welcome to the quiz! Answer each statement with true or false ---"
  );
  const userAnswers = getAllAnswers();
  const userPassed = checkAllAnswers(userAnswers);
  if (userPassed === true) {
    console.log("Well done!");
  } else {
    console.log("Not quite! Try again!");
  }
};

run();
