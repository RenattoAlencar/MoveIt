import { useState, useEffect } from 'react'

import styles from '../styles/components/Countdown.module.css'

export function Countdown() {

  //Time (minutos '25', segudos'60')
  const [time, setTime] = useState(25 * 60)

  //Verificar se o Countdown esta parado
  const [active, setActive] = useState(false)

  //Arredonda o numero para baixo
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  // converte para string
  // split pega o minutes ex 25 e divide em ['2','5']
  // quando o minute não tiver dois digitos, ex: 5 minutes, o padStart acrescenta um 0 na primeira posição ['0','5'] 
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function startCountdown() {
    setActive(true)
  }

  // Click no botaõ o state active vai para true.
  // time sepre sera maior que 0
  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000) //A cada 1 segundo diminua 1 setTime(time - 1)
    }

  }, [active, time])

  return (
    <div>
      <div className={styles.countdownContainer} >
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      <button
        type="button"
        className={styles.countdownButton}
        onClick={startCountdown}
      >
        Iniciar um ciclo
       </button>
    </div>
  )
}