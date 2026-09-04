import PropTypes from 'prop-types'
import styles from './Screen.module.css'

export default function Screen({ children, className, ...props }) {
  const classes = [styles.screen, className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

Screen.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
