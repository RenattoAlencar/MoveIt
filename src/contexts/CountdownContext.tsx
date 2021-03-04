import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownProviderProps {
  children: ReactNode
}

interface CountdownContextData {
  minutes: number,
  seconds: number,
  hasFinished: boolean,
  isActive: boolean,
  startCountdown: () => void,
  resetCountdown: () => void
}


//corrigir o problema do timeout de 1 segundo
let countdownTimeout: NodeJS.Timeout

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }: CountdownProviderProps) {

  //Context
  const { startNewChallenge } = useContext(ChallengesContext)

  //Time (minutos '25', segudos'60')
  const [time, setTime] = useState(25 * 60)

  //Verificar se o Countdown esta parado
  const [isActive, setIsActive] = useState(false)

  //Countdown chegar no zero
  const [hasFinished, setHasFinished] = useState(false)

  //Arredonda o numero para baixo
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFinished(false)
    setTime(25 * 60)
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
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }} >
      {children}
    </CountdownContext.Provider>
  )
}