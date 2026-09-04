import PropTypes from 'prop-types'
import styles from './Card.module.css'

export default function Card({ children, className, ...props }) {
  const classes = [styles.card, className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
