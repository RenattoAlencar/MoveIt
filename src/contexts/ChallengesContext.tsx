import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

//children porque o  ContextProvader vai ficar em volta dos componente no _app
interface ChallengesProviderProps {
  children: ReactNode,
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

//interface do challenge.json
interface Challenge {
  type: 'body' | 'eye',
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  levelUp: () => void,
  startNewChallenge: () => void,
  activeChallenge: Challenge
  resetChallenge: () => void,
  experienceToNextLevel: number,
  completeChallenge: () => void,
  closeLevelModal: () => void
}


export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...res }: ChallengesProviderProps) {

  const [level, setlevel] = useState(res.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(res.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(res.challengesCompleted ?? 0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)



  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setlevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function startNewChallenge() {
    const randomChalllengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChalllengeIndex]
    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo Desafio! ', {
        body: `Valend ${challenge.amount}xp!`,

      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)

  }

  function closeLevelModal() {
    setIsLevelUpModalOpen(false)
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
        experienceToNextLevel,
        completeChallenge,
        closeLevelModal
      }}
    >
      { children}
      { isLevelUpModalOpen &&
        <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}