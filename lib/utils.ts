// =============================================================================
// UTILS — Utility functions used across the codebase
// =============================================================================
import { type ClassValue, clsx as clsxBase } from 'clsx'

/**
 * Merge class names conditionally.
 * Thin wrapper around clsx — use this everywhere for conditional class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsxBase(inputs)
}

/**
 * Format a YYYY-MM date string into a human-readable label.
 * e.g. '2024-08' → 'Aug 2024'
 */
export function formatDate(dateStr: string | 'present'): string {
  if (dateStr === 'present') return 'Present'
  const [year, month] = dateStr.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/**
 * Derive a display duration string from start/end dates.
 * e.g. '2024-01' to '2024-06' → 'Jan 2024 – Jun 2024'
 */
export function formatDateRange(start: string, end: string | 'present'): string {
  return `${formatDate(start)} – ${formatDate(end)}`
}

/**
 * Convert a project slug to a URL-safe path.
 */
export function projectPath(slug: string): string {
  return `/projects/${slug}`
}

/**
 * Truncate a string to a max length, appending '…' if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '…'
}

/**
 * Map a ProjectCategory value to a human-readable label.
 */
export function categoryLabel(category: string): string {
  const map: Record<string, string> = {
    'llm-genai': 'Applied AI & GenAI',
    'backend-systems': 'Distributed Systems',
    'ml-data': 'Machine Learning',
    analytics: 'Data & Analytics',
  }
  return map[category] ?? category
}
