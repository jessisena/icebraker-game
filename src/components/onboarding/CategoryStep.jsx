import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import * as questions from '../../assets/questions'
import CustomCategoryPicker from '../CustomCategoryPicker'
import styles from './CategoryStep.module.css'

const INITIAL_COUNTS = Object.fromEntries(
  Object.keys(questions.categories).map((key) => [key, questions[key].length])
)

export default function CategoryStep({ selected, onChange, onBack, onNext }) {
  const { t } = useTranslation()

  return (
    <div className={styles.step}>
      <CustomCategoryPicker
        defaultSelected={selected}
        onChange={onChange}
        onConfirm={onNext}
        confirmLabel={t('setup.next')}
        counts={INITIAL_COUNTS}
        onBack={onBack}
      />
    </div>
  )
}

CategoryStep.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
}
