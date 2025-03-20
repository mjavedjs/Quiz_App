// import { useEffect, useRef, useState } from "react";

// function App() {
//   let [data,setdata] = useState(null);
//    const [error,seterror] = useState(false);
//    const [loading,setloading] = useState(true);
//    const [questionNum,setquestionNum] = useState(1);
//    let [arr,setarr] = useState([]);
//    const  [result,setresult] = useState(false);
//    const [marks,setMarks] = useState(10);
//    const checkedInput = useRef([]);
//    const [time,settime] = useState(600)

//   useEffect(() => {
//     async function apidata() {
//       try {
//         const data = await fetch("https://the-trivia-api.com/v2/questions");
//         const response = await data.json();
//         console.log(response);
//         setdata(response);
//       } catch (error) {
//         console.log(error);
//         seterror(true)
//       }
//       finally{
//          setloading(false);
//       }
//     }
//     apidata(); 
//   }, []);


//   useEffect(()=>{
//      if(time <= 0 || result){
//       setresult(true); // Show result when time ends
//       return;
//      }
//      const timer = setInterval(() => {
//       settime((Time) => Time - 1);
//     }, 1000);

//     return () => clearInterval(timer);

//   },[time,result]);
  


//   if (questionNum >= 10) {
//     setresult(true); // End the quiz
//   } else {
//     setquestionNum((prev) => prev + 1);
//   }
// }
//   //   if (!data){
//   //     return null
//   //   }
//   //   else{
//   //    arr = [... data[0].incorrectAnswers];
//   //   arr.push(data[0].correctAnswer);
//   //   arr.sort(() => Math.random() - 0.5 );
//   //   setarr(arr)
//   // }

//   const shaffle = () => {
//     if (!data) {
//       return null;
//     } else {
//       const currentQuestion = data[questionNum - 1]; // Use questionNum to index data
//       arr = [...currentQuestion.incorrectAnswers];
//       arr.push(currentQuestion.correctAnswer);
//       arr.sort(() => Math.random() - 0.5);
//       setarr(arr);
//     }
//   };
//   useEffect(() => {
//     shaffle(); // Call shaffle whenever questionNum changes
//   }, [questionNum, data]);

// function countQuestion(){
//    setquestionNum(questionNum + 1 );
//     const checkedButton = checkedInput.current.find(input => input.checked);
//     if (checkedButton) {
//       const selectedValue = checkedButton.value;

//       console.log("Selected answer:", selectedValue);

//       if(selectedValue === data[questionNum - 1].correctAnswer){
//          setMarks(marks+10);
//       }
//     }
  
// }

// const minutes = Math.floor(time / 60);
// const seconds = time % 60;

//   return (
//     <>
//   <h2>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2> {/* Display Timer */}

//     {questionNum < 10 ? ( <>
//       {error && <h1>Error Accored</h1> }
//     {loading && <h1>....</h1> }
//      {data && <p> {questionNum}:{data[0].question.text}</p> }

//     {arr && arr.map((res,index)=>{
//       return <div key={index}>
//         {/* <input type="radio"  ref={(e)=>{e.current.value}} name="questionS" id="question"/> */}
//         {/* <input type="radio" ref={(el) => el && el.value} name="questionS" id="question" /> */}
//         <input type="radio"   value={res} ref={el => (checkedInput.current[index] = el)} name="questionS" id="question" />
//         <label htmlFor="question">{res}</label>
//       </div>
//     })}
//     <button onClick={()=>countQuestion()}  >Next</button>
//     </>) : <h1>{result && <p>Thank You for Attempting  Your Marks is {marks}</p> }  </h1> }
//     </>
//   );
// export default App


import { useEffect, useRef, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questionNum, setQuestionNum] = useState(1);
  const [arr, setArr] = useState([]);
  const [result, setResult] = useState(false);
  const [marks, setMarks] = useState(0);
  const checkedInput = useRef([]);
  const [time, setTime] = useState(600);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://the-trivia-api.com/v2/questions");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (time <= 0 || result) {
      return; // Stop the timer
    }
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [time, result]);

  useEffect(() => {
    if (!data || questionNum > 10) return;
    const currentQuestion = data[questionNum - 1];
    const options = [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer];
    options.sort(() => Math.random() - 0.5);
    setArr(options);
  }, [questionNum, data]);

  function countQuestion() {
    const checkedButton = checkedInput.current.find((input) => input?.checked);
    if (checkedButton) {
      const selectedValue = checkedButton.value;
      if (selectedValue === data[questionNum - 1].correctAnswer) {
        setMarks((prevMarks) => prevMarks + 10);
      }
    }

    if (questionNum >= 10) {
      setResult(true);
    } else {
      setQuestionNum((prev) => prev + 1);
    }
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div style={styles.container}>
      {!result ? (
        <>
          <div style={styles.header}>
            <h2 style={styles.timer}>
              Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h2>
            <h2 style={styles.score}>Score: {marks}</h2>
          </div>

          {error && <h1 style={styles.error}>Error Occurred</h1>}
          {loading && <h1 style={styles.loading}>Loading...</h1>}

          {data && (
            <div style={styles.questionContainer}>
              <p style={styles.questionText}>
                {questionNum}. {data[questionNum - 1].question.text}
              </p>
              <div style={styles.optionsContainer}>
                {arr.map((res, index) => (
                  <div key={index} style={styles.option}>
                    <input
                      type="radio"
                      value={res}
                      ref={(el) => (checkedInput.current[index] = el)}
                      name="questionS"
                      id={`question${index}`}
                      style={styles.radioInput}
                    />
                    <label htmlFor={`question${index}`} style={styles.optionLabel}>
                      {res}
                    </label>
                  </div>
                ))}
              </div>
              <button onClick={countQuestion} style={styles.nextButton}>
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={styles.resultContainer}>
          <h1 style={styles.resultText}>Thank You for Attempting!</h1>
          <h2 style={styles.finalScore}>Your Final Score: {marks}</h2>
        </div>
      )}
    </div>
  );
}

export default App;

// Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "600px",
    marginBottom: "20px",
  },
  timer: {
    fontSize: "18px",
    color: "#333",
  },
  score: {
    fontSize: "18px",
    color: "#4CAF50",
  },
  error: {
    color: "#ff0000",
    textAlign: "center",
  },
  loading: {
    color: "#333",
    textAlign: "center",
  },
  questionContainer: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  questionText: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "20px",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  option: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  radioInput: {
    marginRight: "10px",
  },
  optionLabel: {
    fontSize: "16px",
    color: "#333",
  },
  nextButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
    width: "100%",
    transition: "background-color 0.3s ease",
  },
  resultContainer: {
    textAlign: "center",
  },
  resultText: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "10px",
  },
  finalScore: {
    fontSize: "20px",
    color: "#4CAF50",
  },
};