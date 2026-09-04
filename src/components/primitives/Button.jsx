import PropTypes from 'prop-types'
import styles from './Button.module.css'

export default function Button({ variant = 'primary', size, children, className, ...props }) {
  const classes = [styles.button, styles[variant], size && styles[size], className]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'ghost']),
  size: PropTypes.oneOf(['lg']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
