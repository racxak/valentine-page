import React from 'react';
import { useEffect, useState } from 'react';
import HeartImg from './images/heart.png';
import "./App.css"
const App = () => {
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateHearts = () => {
    const hearts = [];
    const minSize = 10; // Minimalny rozmiar serca
    const maxSize = 60; // Maksymalny rozmiar serca
    const numberOfHearts = 1000;

    for (let i = 0; i < numberOfHearts; i++) {
      const size = Math.round(Math.random() * (maxSize - minSize)) + minSize;
      const top = Math.round(Math.random() * (screenSize.height - size));
      const left = Math.round(Math.random() * (screenSize.width - size));

      hearts.push({ top, left, size });
    }

    return hearts;
  };

  const hearts = generateHearts(); 

   // Stan do przechowywania rozmiarów przycisku
   const [buttonSize, setButtonSize] = useState({ width: 150, height: 60 }); // Początkowe rozmiary przycisku
   const [buttonSizeBig, setButtonSizeBig] = useState({ width: 150, height: 60 }); // Początkowe rozmiary przycisku
   const [yes, setYes] = useState(false); // Początkowe rozmiary przycisku




   const handleNoClick = () => {
     setButtonSize(prevSize => ({
       width: prevSize.width > 60 ? prevSize.width - 10 : prevSize.width, // Zmniejsza szerokość o 10px, ale nie mniej niż 10px
       height: prevSize.height > 30 ? prevSize.height - 5 : prevSize.height, // Zmniejsza wysokość o 5px, ale nie mniej niż 10px
     }));

     setButtonSizeBig(prevSize => ({
      width: prevSize.width + 10,// Zmniejsza szerokość o 10px, ale nie mniej niż 10px
      height: prevSize.height + 5, // Zmniejsza wysokość o 5px, ale nie mniej niż 10px
    }));
   };

  return (
    <div className="App">

    {!yes &&
    <>
       {hearts.map((heart, index) => (
        <img
          key={index}
          src={HeartImg} // Zastąp ścieżką do obrazka serca
          alt="heart"
          style={{
            height: `${heart.size}px`,
            width: `${heart.size}px`,
            position: 'absolute',
            top: `${heart.top}px`,
            left: `${heart.left}px`,
          }}
        />
      ))}

      <h1>Cześć. Wiem, że jest późno, ale tak się zastanawiam... Czy będziesz moją walentynką???</h1>
      <div className='buttons'> 
        <button style={{ width: `${buttonSize.width}px`, height: `${buttonSize.height}px` }} onClick={handleNoClick}>Nie :(</button>
      <button style={{ width: `${buttonSizeBig.width}px`, height: `${buttonSizeBig.height}px` }} onClick={()=>setYes(true)}>No oczywiście, że tak!</button>
      </div> </>}

    {yes && <div id="wrapper"> Yayy!    
    <div id="pulsingheart"></div>
    <p> inczej był byś głupiś :)</p> 
    
      <div class="firework"></div>
      <div class="firework"></div>
      <div class="firework"></div> </div> }
    </div>
  );
};

export default App;
