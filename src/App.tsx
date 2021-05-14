import React , {useState} from 'react';

import {QuestionCard} from './components/QuestionCard';
import {fetchQuizQuestions} from './API';

//types
import {Difficulty, QuestionState} from './API';

//styles
import {GlobalStyle, Wrapper} from './App.styles';

//service worker
import {swDev} from './swDev';

//firebase
import firebase from './firebase';



export type AnswerObject = {
  question: string;
  answer : string;
  correct : boolean;
  correctAnswer : string;
}

const TOTAL_QUESTIONS = 10;

function App() {

  const [loading, setLoading] = useState(false);
  const [questions , setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const msg = firebase.messaging();
  msg.requestPermission().then(()=> {
    return msg.getToken();
  }).then((token: any) => {
    console.log('token', token)
  })

  const startTrivia = async ()=> {

    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )
  

  setQuestions(newQuestions);
  setScore(0);

  setUserAnswers([]);
  setNumber(0);
  setLoading(false);



    };
    

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

    if (!gameOver) {
      //user answer
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      
      if(correct) {
        setScore(prev => prev + 1);
      } 

      //save answer in the array for user answers

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers(prev => [...prev, answerObject])
    }

  }

  const nextQuestion = () => {

    //move to next question number if not last 
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
;    }else{
  setNumber(nextQuestion);
}

  }

  
  return (
      <>
        <GlobalStyle/>
        <Wrapper>
        <h1>REACT QUIZ</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className="start" onClick={startTrivia}>
              Start
            </button>
        ) : null }

        { !gameOver ? (
            <p className="score">Score: {score}</p>
        ) : null}

        {loading &&
            <p>Loading questions ....</p>
          }

          {!loading && !gameOver &&
            <QuestionCard
                questionNr={number + 1}
                totalQuestions = {TOTAL_QUESTIONS}
                question={questions[number].question}
                answers = {questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
            />
          }

          { !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS-1 &&
              <button className="next" onClick={nextQuestion}>
          Next
        </button>
          }
        </Wrapper>
    </>
  );
}
swDev();

export default App;

