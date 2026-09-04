import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { categories } from '../assets/questions'
import CountdownTimer from './CountdownTimer'
import Button from './primitives/Button'
import styles from './QuestionCard.module.css'

export default function QuestionCard({
  currentQuestion,
  currentPlayerData,
  proceedToRating,
  handleSkip,
  selectedCategory,
  timerActive,
  onTimerComplete,
}) {
  const { t, i18n } = useTranslation(['ui', 'categories'])
  const lang = i18n.language

  const categoryMeta = categories[selectedCategory]
  const hasTimer = categoryMeta?.timerSeconds > 0
  const isMusicTrivia = categoryMeta?.specialBehavior === 'music-trivia'

  const specialInstructions = t(`categories:${selectedCategory}.instructions`, { defaultValue: '' })

  const instruction = specialInstructions
    ? specialInstructions
    : isMusicTrivia
      ? t('question.musicInstruction', { name: currentPlayerData.name })
      : t('question.defaultInstruction', { name: currentPlayerData.name })

  const questionText = currentQuestion?.[lang]?.q ?? ''
  const explanationText = currentQuestion?.[lang]?.explanation ?? ''

  return (
    <>
      {timerActive && hasTimer && (
        <CountdownTimer
          key={currentQuestion?.id}
          seconds={categoryMeta.timerSeconds}
          onComplete={onTimerComplete}
        />
      )}
      <div className={styles.card}>
        <p className={styles.question}>{questionText}</p>
        <p className={styles.explanation}>{explanationText}</p>
        <div
          className={styles.instruction}
          style={{ borderColor: currentPlayerData.color, color: currentPlayerData.color }}
        >
          {instruction}
        </div>
        <div className={styles.actions}>
          <Button onClick={proceedToRating}>{t('question.answered')}</Button>
          <Button variant="ghost" onClick={handleSkip}>
            {t('question.skip')}
          </Button>
        </div>
      </div>
    </>
  )
}

QuestionCard.propTypes = {
  currentQuestion: PropTypes.object,
  currentPlayerData: PropTypes.object.isRequired,
  proceedToRating: PropTypes.func.isRequired,
  handleSkip: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
  timerActive: PropTypes.bool,
  onTimerComplete: PropTypes.func,
}
