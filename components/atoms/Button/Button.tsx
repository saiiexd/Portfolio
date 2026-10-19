import { cn } from '@/lib/utils'
import styles from './Button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  href,
  target,
  rel,
  iconLeft,
  iconRight,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(styles.button, styles[variant], styles[size], className)

  if (Tag === 'a' && href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        className={classes}
      >
        {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
        <span>{children}</span>
        {iconRight && <span className={styles.icon}>{iconRight}</span>}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </button>
  )
}
