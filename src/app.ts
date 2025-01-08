import { question } from "readline-sync";
import { ANSWERS } from "./answers";
import { QUESTIONS } from "./questions";

// error: Parameter 'questionText' implicitly has an 'any' type. Fix: added ' : string' in line 6.
const getAnswer = (questionText: string): boolean => {
	const userAnswer = question("- " + questionText);
	if (userAnswer === "true") return true;
	if (userAnswer === "false") return false;
	console.log("Answer must be true or false");
	return getAnswer(questionText); // error: Function lacks ending return statement and return type does not include 'undefined'. Fix: added 'return'
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

// error: Parameter 'userAnswers' implicitly has an 'any' type. Fix: added ' : boolean' in line 25.
const checkAllAnswers = (userAnswers: boolean[]) => {
	// error: Property 'every' does not exist on type 'string'. Fix: furter added ' : boolean[]' in line 25.
	// error: Parameter 'answer' implicitly has an 'any' type. Fix: added ' : boolean' in line 29.
	// error: Parameter 'i' implicitly has an 'any' type. Fix; added ' : number' in line 29.
	return userAnswers.every((answer: boolean, i: number) =>
		// error: Argument of type 'number' is not assignable to parameter of type 'boolean'. Fix: I inverted (question: number, answer: boolean) in line 35.
		checkAnswer(i, answer)
	);
};

const checkAnswer = (question: number, answer: boolean): boolean => {
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
