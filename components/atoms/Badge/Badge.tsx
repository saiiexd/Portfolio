import { cn } from '@/lib/utils'
import styles from './Badge.module.scss'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'tech' | 'category' | 'status'
  className?: string
}

export default function Badge({ children, variant = 'tech', className }: BadgeProps) {
  return <span className={cn(styles.badge, styles[variant], className)}>{children}</span>
}
