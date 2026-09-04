import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from './i18n'
import useGame from './hooks/useGame'
import useLocalStorage from './hooks/useLocalStorage'
import Onboarding from './components/onboarding/Onboarding'
import ModeSelector from './components/ModeSelector'
import CategorySelector from './components/CategorySelector'
import DecadeSelector from './components/DecadeSelector'
import QuestionCard from './components/QuestionCard'
import RatingPanel from './components/RatingPanel'
import Leaderboard from './components/Leaderboard'
import GameOver from './components/GameOver'
import AvatarGlyph from './components/AvatarGlyph'
import PrefsToggles from './components/PrefsToggles'
import Button from './components/primitives/Button'
import Modal from './components/primitives/Modal'
import Toast from './components/primitives/Toast'
import styles from './App.module.css'

function App() {
  const [lang, setLang] = useLocalStorage('lang', 'es')
  const [themeMode, setThemeMode] = useLocalStorage('themeMode', 'dark')
  const { t } = useTranslation()

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode
  }, [themeMode])
  useEffect(() => {
    i18n.changeLanguage(lang)
    document.documentElement.lang = lang
  }, [lang])

  const game = useGame()

  const toggleLang = () => setLang((l) => (l === 'es' ? 'en' : 'es'))
  const toggleTheme = () => setThemeMode((m) => (m === 'dark' ? 'light' : 'dark'))

  if (!game.gameStarted) {
    return (
      <Onboarding
        onComplete={game.startGame}
        prefsSlot={
          <PrefsToggles
            lang={lang}
            onLangToggle={toggleLang}
            themeMode={themeMode}
            onThemeToggle={toggleTheme}
          />
        }
      />
    )
  }

  const currentPlayerData = game.players[game.currentPlayer]
  const nextPlayerData = game.players[1 - game.currentPlayer]
  const raterData = game.players[1 - game.currentPlayer]

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.avatarRow}>
          {game.players.map((p) => (
            <AvatarGlyph key={p.name} name={p.avatar} color={p.color} size="lg" />
          ))}
        </div>
        <h1 className={styles.playerNames}>
          {game.players.map((p, i) => (
            <span key={p.name}>
              {i > 0 && ' + '}
              <span style={{ color: p.color }}>{p.name}</span>
            </span>
          ))}
        </h1>
        <div className={styles.headerActions}>
          <Button onClick={() => game.setShowLeaderboard(true)}>{t('game.leaderboard')}</Button>
          <Button variant="ghost" onClick={() => game.selectMode(null)}>
            {t('game.changeMode')}
          </Button>
          <Button variant="ghost" onClick={game.resetGame}>
            {t('game.changePlayers')}
          </Button>
          <PrefsToggles
            lang={lang}
            onLangToggle={toggleLang}
            themeMode={themeMode}
            onThemeToggle={toggleTheme}
          />
        </div>
      </header>

      <div className={styles.phaseContent}>
        {game.phase === 'selecting-mode' && (
          <ModeSelector currentMode={game.mode} onModeSelect={game.selectMode} />
        )}

        {game.phase === 'selecting-category' && (
          <CategorySelector
            currentPlayerData={currentPlayerData}
            onCategorySelect={game.handleCategorySelect}
            availableCounts={game.calculateAvailableCounts()}
            categories={game.filteredCategories}
          />
        )}

        {game.phase === 'selecting-decade' && (
          <DecadeSelector
            opponentData={nextPlayerData}
            onDecadeSelect={game.handleDecadeSelect}
            availableSongsByDecade={game.calculateSongsByDecade()}
          />
        )}

        {game.phase === 'showing-question' && (
          <>
            <div className={styles.turnBanner}>
              <p className={styles.turnNext}>
                {t('game.nextTurn')}:{' '}
                <strong style={{ color: nextPlayerData.color }}>{nextPlayerData.name}</strong>
              </p>
              <p className={styles.turnNow}>
                {t('game.nowPlaying')}:{' '}
                <strong style={{ color: currentPlayerData.color }}>{currentPlayerData.name}</strong>
              </p>
            </div>
            <QuestionCard
              currentQuestion={game.currentQuestion}
              currentPlayerData={currentPlayerData}
              proceedToRating={game.proceedToRating}
              handleSkip={game.handleSkip}
              selectedCategory={game.selectedCategory}
              timerActive={game.timerActive}
              onTimerComplete={game.handleTimerComplete}
            />
          </>
        )}

        {game.phase === 'showing-rating' && (
          <>
            <div className={styles.sheetBackdrop} />
            <RatingPanel
              playerWhoAnswered={game.playerWhoAnswered}
              raterData={raterData}
              submitRating={game.submitRating}
              categoryKey={game.selectedCategory}
            />
          </>
        )}

        {game.phase === 'game-over' && (
          <GameOver
            players={game.sortedPlayers}
            onReplay={game.replayGame}
            onReset={game.resetGame}
          />
        )}
      </div>

      {game.showLeaderboard && (
        <div className={styles.overlay} onClick={() => game.setShowLeaderboard(false)}>
          <div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
            <Leaderboard
              players={game.sortedPlayers}
              onClose={() => game.setShowLeaderboard(false)}
              onReset={game.resetGame}
            />
          </div>
        </div>
      )}

      <Modal
        open={!!game.confirmModal}
        title={game.confirmModal?.title ?? ''}
        message={game.confirmModal?.message}
        confirmLabel={game.confirmModal?.confirmLabel ?? 'Confirmar'}
        onConfirm={game.confirmModal?.onConfirm ?? (() => game.setConfirmModal(null))}
        onCancel={() => game.setConfirmModal(null)}
      />

      <Toast message={game.toast} onDismiss={() => game.setToast('')} />
    </div>
  )
}

export default App
