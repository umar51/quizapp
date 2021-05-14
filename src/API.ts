import { shuffleArray } from "./utiles";


export type Question = {
    category : string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers : string[];
    question: string;
    type: string;
    answers: string [];
}

export type QuestionState = Question & {answers : any[]}; //this type is for addingall answers correct and incorrect into one array for mapping purpose

export enum Difficulty {
    HARD = 'hard',
    MEDIUM = 'medium',
    EASY= 'easy'
}


 export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty ) => {
     const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`;
     const data = await(await fetch(endpoint)).json();
    //  console.log([data.results[0].correct_answer, ...data.results[0].incorrect_answers ])
    // console.log(shuffleArray([data.results[0].correct_answer, ...data.results[0].incorrect_answers ]))
    //  console.log([data.results[0].correct_answer, ...data.results[0].incorrect_answers ].sort(()=> Math.random() - 1.5))
     
     return data.results.map((question:Question) => ({
             ...question,
             answers: shuffleArray([
                 ...question.incorrect_answers,
                  question.correct_answer
                ]),
                
         }
         )
         );
    
 };


