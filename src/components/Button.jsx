import { motion } from 'framer-motion'
import './Button.css'

function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full',
    loading && 'btn-loading',
    className
  ].filter(Boolean).join(' ')

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="btn-icon">{icon}</span>
          )}
          <span className="btn-text">{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="btn-icon">{icon}</span>
          )}
        </>
      )}
    </motion.button>
  )
}

export default Button

