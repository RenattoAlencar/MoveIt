import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/Countdown.module.css'

//corrigir o problema do timeout de 1 segundo
let countdownTimeout: NodeJS.Timeout

export function Countdown() {
  //Context
  const { startNewChallenge } = useContext(ChallengesContext)

  //Time (minutos '25', segudos'60')
  const [time, setTime] = useState(0.1 * 60)

  //Verificar se o Countdown esta parado
  const [isActive, setIsActive] = useState(false)

  //Countdown chegar no zero
  const [hasFinished, setHasFinished] = useState(false)

  //Arredonda o numero para baixo
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  // converte para string
  // split pega o minutes ex 25 e divide em ['2','5']
  // quando o minute não tiver dois digitos, ex: 5 minutes, o padStart acrescenta um 0 na primeira posição ['0','5'] 
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(0.1 * 60)
  }

  // Click no botaõ o state active vai para true.
  // time sepre sera maior que 0
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000) //A cada 1 segundo diminua 1 setTime(time - 1)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }

  }, [isActive, time])

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

      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          ciclo encerrado
        </button>
      ) : (
          <>
            { isActive ? (
              <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive} `}
                onClick={resetCountdown}
              >
                Abandonar ciclo
              </button>

            ) : (
                <button
                  type="button"
                  className={styles.countdownButton}
                  onClick={startCountdown}
                >
                  Iniciar ciclo
                </button>
              )}

          </>
        )}







    </div>
  )
  //Verificar se o isActive esta ativo e mudar mensagem button
}