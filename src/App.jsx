import { useEffect, useRef, useState } from "react";

function App() {
  let [data,setdata] = useState(null);
   const [error,seterror] = useState(false);
   const [loading,setloading] = useState(true);
   const [questionNum,setquestionNum] = useState(1);
   let [arr,setarr] = useState([]);
   const  [result,setresult] = useState(true);
   const [marks,setMarks] = useState(10);
   const checkedInput = useRef([]);
  useEffect(() => {
    async function apidata() {
      try {
        const data = await fetch("https://the-trivia-api.com/v2/questions");
        const response = await data.json();
        console.log(response);
        setdata(response);
      } catch (error) {
        console.log(error);
        seterror(true)
      }
      finally{
         setloading(false);
      }
    }
    apidata(); 
  }, []);

  if (!data){
    return null
  }
  else{
   arr = [... data[0].incorrectAnswers];
  arr.push(data[0].correctAnswer);
  arr.sort(() => Math.random() - 0.5 );
}

function countQuestion(){
   setquestionNum(questionNum + 1 );
    setMarks(marks+10);
    const checkedButton = checkedInput.current.find(input => input.checked);
    if (checkedButton) {
      const selectedValue = checkedButton.value;
      console.log("Selected answer:", selectedValue);
    }
  
}


  return (
    <>
    {questionNum < 10 ? ( <>
      {error && <h1>Error Accored</h1> }
    {loading && <h1>....</h1> }
     {data && <p> {questionNum}:{data[0].question.text}</p> }

    {arr && arr.map((res,index)=>{
      return <div key={index}>
        {/* <input type="radio"  ref={(e)=>{e.current.value}} name="questionS" id="question"/> */}
        {/* <input type="radio" ref={(el) => el && el.value} name="questionS" id="question" /> */}
        <input type="radio"   value={res} ref={el => (checkedInput.current[index] = el)} name="questionS" id="question" />
        <label htmlFor="question">{res}</label>
      </div>
    })}
    <button onClick={()=>countQuestion()}  >Next</button>
    </>) : <h1>{result && <p>Thank You for Attempting {marks}</p>}</h1>}
    </>
  );

}
export default App
