import { useEffect, useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftarrowImage from './assets/leftarrow.png'
import {GridItem} from './components/GridItem';

import {levels, calculateImc, Level} from '../helpers/imc';

const App = () => {
  const[heightField, setHeightField] = useState<number>(0);
  const[weightField, setWeightField] = useState<number>(0);
  const[toshow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("Digite todos os campos.")
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  useEffect(() => {
    document.title = "Calculadora IMC";
  },[]);

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}> 
          <img src={poweredImage} alt='' width={150}></img>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para ìndice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input 
            type="number" 
            placeholder='Digite a sua altura. Ex: 1.5 (em metros)' 
            value={heightField > 0 ? heightField : ''} 
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled = {toshow ? true : false}
          />

          <input 
            type="number" 
            placeholder='Digite o seu peso. Ex: 75.3 (em kg)' 
            value={weightField > 0 ? weightField : ''} 
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled = {toshow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled = {toshow ? true : false}>Calcular</button>
        </div>

        <div className={styles.rightSide}>
          {!toshow &&
          <div className={styles.grid}>
            {levels.map((item, key) => (
              <GridItem key={key} item={item}/>
            ))}
          </div>
          }
          {
            toshow && 
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftarrowImage} width={25}/>
              </div>
              <GridItem item={toshow}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;