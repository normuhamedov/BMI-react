import React, { useState, useEffect } from 'react';
import './App.css'
function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [dataList, setDataList] = useState([]);

  const handleAdd = () => {
    let result = Number(num1) / (Number(num2) * Number(num2));
    if (isNaN(result)) {
      alert("Xatolik: Raqam kiritilishi kerak");
      return;
    }
    const resultMath = result.toFixed(0)
    const newDataList = [...dataList, resultMath];
    setDataList(newDataList);
    setNum1('');
    setNum2('');
  }

  const handleDelete = (index) => {
    const newDataList = [...dataList];
    newDataList.splice(index, 1);
    setDataList(newDataList);
  }

  useEffect(() => {
    const savedDataList = JSON.parse(localStorage.getItem('dataList') || '[]');
    setDataList(savedDataList);
  }, []);

  useEffect(() => {
    localStorage.setItem('dataList', JSON.stringify(dataList));
  }, [dataList]);

  return (
    <div className='wrap'>
      <h1>BMI Tracer</h1>
      <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} placeholder='Weight( in kg )'/>
      <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} placeholder='Height (in m )'/>
      <button onClick={handleAdd}>Calculate BMI</button>
      <ul>
        {dataList.map((data, index) => (
          <li key={index}>
            {data} BMI
            <button className='delete-btn' onClick={() => handleDelete(index)}>Delate</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
