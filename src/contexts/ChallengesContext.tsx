import { createContext, ReactNode, useState } from 'react'

import challenges from '../../challenges.json'

//children porque o  ContextProvader vai ficar em volta dos componente no _app
interface ChallengesProviderProps {
  children: ReactNode
}

//interface do challenge.json
interface Challenge {
  type: 'body' | 'eye',
  description:string
  amount:number
}

interface ChallengesContextData {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  levelUp: () => void,
  startNewChallenge: () => void,
  activeChallenge: Challenge
  resetChallenge: () => void,
  experienceToNextLevel: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {

  const [level, setlevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  
  const experienceToNextLevel = Math.pow(( level + 1 ) * 4 , 2)

  function levelUp() {
    setlevel(level + 1)

  }

  function startNewChallenge() {
    const randomChalllengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChalllengeIndex]
    setActiveChallenge(challenge)
  }

  function resetChallenge(){
    setActiveChallenge(null)
  }


  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel
      }}
    >
      { children}
    </ChallengesContext.Provider>
  )
}