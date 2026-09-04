import { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { useTranslation } from 'react-i18next'
import {
  categories,
  spark,
  roots,
  mirror,
  heat,
  shadow,
  absurdista,
  atlasOfMe,
  dilemma,
  decadesTape,
  getSongsByDecade,
  getAvailableDecades,
} from '../assets/questions'
import useLocalStorage from './useLocalStorage'

const INITIAL_QUESTIONS = {
  spark: [...spark],
  roots: [...roots],
  mirror: [...mirror],
  heat: [...heat],
  shadow: [...shadow],
  absurdista: [...absurdista],
  atlasOfMe: [...atlasOfMe],
  dilemma: [...dilemma],
  decadesTape: [...decadesTape],
}

function withTransition(fn) {
  if (document.startViewTransition) {
    document.startViewTransition(() => flushSync(fn))
  } else {
    fn()
  }
}

export default function useGame() {
  const { t } = useTranslation(['ui'])
  const [players, setPlayers, removePlayers] = useLocalStorage('gamePlayers', null)
  const [ratings, setRatings, removeRatings] = useLocalStorage('playerRatings', {})
  const [mode, setMode, removeMode] = useLocalStorage('gameMode', null)
  const [gameStarted, setGameStarted] = useState(false)
  const [phase, setPhase] = useState('selecting-mode')
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [playerWhoAnswered, setPlayerWhoAnswered] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedDecade, setSelectedDecade] = useState(null)
  const [categoryQuestions, setCategoryQuestions] = useState(INITIAL_QUESTIONS)
  const [timerActive, setTimerActive] = useState(false)
  const [confirmModal, setConfirmModal] = useState(null)
  const [toast, setToast] = useState('')
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  // Migrate old {player1, player2} localStorage shape to array
  useEffect(() => {
    if (players && !Array.isArray(players)) {
      setPlayers([players.player1, players.player2])
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Restore game session from localStorage
  useEffect(() => {
    if (!Array.isArray(players) || players.length !== 2) return
    setGameStarted(true)
    if (!ratings || Object.keys(ratings).length === 0) {
      setRatings({ [players[0].name]: [], [players[1].name]: [] })
    }
    setPhase(mode ? 'selecting-category' : 'selecting-mode')
  }, [players]) // eslint-disable-line react-hooks/exhaustive-deps

  const filteredCategories = mode
    ? Object.fromEntries(Object.entries(categories).filter(([, cat]) => cat.modes?.includes(mode)))
    : categories

  const calculateAvailableCounts = () => {
    const counts = Object.fromEntries(
      Object.entries(categoryQuestions).map(([k, v]) => [k, v.length])
    )
    counts.all = Object.keys(filteredCategories)
      .filter((k) => categories[k]?.specialBehavior !== 'music-trivia')
      .reduce((sum, k) => sum + (categoryQuestions[k]?.length || 0), 0)
    return counts
  }

  const calculateSongsByDecade = () =>
    Object.fromEntries(
      getAvailableDecades().map((decade) => {
        const available = getSongsByDecade(decade).filter((song) =>
          categoryQuestions.decadesTape.some(
            (q) => q[0] === song[0] && q[1] === song[1] && q[2] === song[2]
          )
        )
        return [decade, available.length]
      })
    )

  const getRandomQuestion = (category) => {
    const nonMusicKeys = Object.keys(filteredCategories).filter(
      (k) => categories[k]?.specialBehavior !== 'music-trivia'
    )
    const available =
      category === 'all'
        ? nonMusicKeys.flatMap((k) => categoryQuestions[k] || [])
        : categoryQuestions[category] || []

    if (available.length === 0) {
      setToast(t('toast.categoryExhausted'))
      setPhase('selecting-category')
      return
    }

    const idx = Math.floor(Math.random() * available.length)
    const selected = available[idx]

    withTransition(() => {
      setCurrentQuestion(selected)

      if (category === 'all') {
        const updated = { ...categoryQuestions }
        for (const k of nonMusicKeys) {
          const i = updated[k]?.findIndex((q) => q.id === selected.id)
          if (i !== -1) {
            updated[k] = updated[k].filter((_, j) => j !== i)
            break
          }
        }
        setCategoryQuestions(updated)
      } else {
        setCategoryQuestions((prev) => ({
          ...prev,
          [category]: prev[category].filter((_, i) => i !== idx),
        }))
      }

      setPlayerWhoAnswered(players[currentPlayer].name)
      setPhase('showing-question')
    })
  }

  const startGame = (playerConfig) => {
    const playerArray = [playerConfig.player1, playerConfig.player2]
    setPlayers(playerArray)
    setRatings({ [playerConfig.player1.name]: [], [playerConfig.player2.name]: [] })
    setMode(playerConfig.mode)
    setGameStarted(true)
    setCategoryQuestions({ ...INITIAL_QUESTIONS })
    setCurrentPlayer(0)
    setPhase('selecting-category')
  }

  const selectMode = (selectedMode) => {
    setMode(selectedMode)
    withTransition(() => setPhase('selecting-category'))
  }

  const doReset = () => {
    setGameStarted(false)
    removePlayers()
    removeRatings()
    removeMode()
    setCategoryQuestions({ ...INITIAL_QUESTIONS })
    setCurrentPlayer(0)
    setPhase('selecting-mode')
    setPlayerWhoAnswered(null)
    setShowLeaderboard(false)
    setSelectedCategory(null)
    setSelectedDecade(null)
  }

  const resetGame = () => {
    setConfirmModal({
      title: t('modal.changePlayers.title'),
      message: t('modal.changePlayers.message'),
      confirmLabel: t('modal.changePlayers.confirm'),
      onConfirm: () => {
        setConfirmModal(null)
        doReset()
      },
    })
  }

  const replayGame = () => {
    if (!players) return
    setCategoryQuestions({ ...INITIAL_QUESTIONS })
    setRatings({ [players[0].name]: [], [players[1].name]: [] })
    setCurrentPlayer(0)
    setSelectedCategory(null)
    setSelectedDecade(null)
    setPlayerWhoAnswered(null)
    withTransition(() => setPhase('selecting-category'))
  }

  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(categoryKey)
    const meta = categories[categoryKey]
    if (meta?.specialBehavior === 'music-trivia') {
      setPhase('selecting-decade')
      return
    }
    setTimerActive(!!meta?.timerSeconds)
    getRandomQuestion(categoryKey)
  }

  const handleDecadeSelect = (decade) => {
    setSelectedDecade(decade)
    const songsInDecade = getSongsByDecade(decade).filter((song) =>
      categoryQuestions.decadesTape.some(
        (q) => q[0] === song[0] && q[1] === song[1] && q[2] === song[2]
      )
    )

    if (songsInDecade.length === 0) {
      setToast(t('toast.decadeExhausted', { decade }))
      return
    }

    const idx = Math.floor(Math.random() * songsInDecade.length)
    const song = songsInDecade[idx]

    withTransition(() => {
      setCurrentQuestion({
        id: `music-${song[0]}-${song[1].replace(/\s+/g, '-')}`,
        en: { q: `🎵 ${song[2]}`, explanation: `Artist: ${song[1]} | Year: ${song[0]}` },
        es: { q: `🎵 ${song[2]}`, explanation: `Artista: ${song[1]} | Año: ${song[0]}` },
      })
      setCategoryQuestions((prev) => ({
        ...prev,
        decadesTape: prev.decadesTape.filter(
          (q) => !(q[0] === song[0] && q[1] === song[1] && q[2] === song[2])
        ),
      }))
      setPlayerWhoAnswered(players[currentPlayer].name)
      setPhase('showing-question')
    })
  }

  const proceedToRating = () => {
    setTimerActive(false)
    setPhase('showing-rating')
  }

  const handleTimerComplete = () => {
    setTimerActive(false)
    setPhase('showing-rating')
  }

  const submitRating = (rating) => {
    setRatings((prev) => ({
      ...prev,
      [playerWhoAnswered]: [...(prev[playerWhoAnswered] || []), rating],
    }))

    const nextPlayer = 1 - currentPlayer
    setCurrentPlayer(nextPlayer)
    setPlayerWhoAnswered(null)
    setSelectedDecade(null)

    withTransition(() => {
      const total = Object.values(categoryQuestions).reduce((s, a) => s + a.length, 0)
      if (total === 0) {
        setPhase('game-over')
        return
      }
      setPhase('selecting-category')
    })
  }

  const handleSkip = () => {
    const meta = categories[selectedCategory]
    if (meta?.specialBehavior === 'music-trivia' && selectedDecade) {
      handleDecadeSelect(selectedDecade)
    } else {
      getRandomQuestion(selectedCategory)
    }
  }

  const sortedPlayers = Array.isArray(players)
    ? [...players]
        .map((p) => ({
          ...p,
          average: (() => {
            const r = ratings[p.name]
            if (!r || r.length === 0) return 0
            return (r.reduce((a, v) => a + v, 0) / r.length).toFixed(2)
          })(),
          totalRatings: ratings[p.name]?.length || 0,
        }))
        .sort((a, b) => b.average - a.average)
    : []

  return {
    gameStarted,
    players,
    phase,
    currentPlayer,
    currentQuestion,
    playerWhoAnswered,
    selectedCategory,
    selectedDecade,
    categoryQuestions,
    timerActive,
    confirmModal,
    toast,
    showLeaderboard,
    ratings,
    mode,
    filteredCategories,
    sortedPlayers,
    startGame,
    selectMode,
    resetGame,
    replayGame,
    handleCategorySelect,
    handleDecadeSelect,
    proceedToRating,
    handleTimerComplete,
    submitRating,
    handleSkip,
    calculateAvailableCounts,
    calculateSongsByDecade,
    setConfirmModal,
    setToast,
    setShowLeaderboard,
  }
}
