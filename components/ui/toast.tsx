'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

interface ToastProps {
  toast: Toast
  onRemove: (id: string) => void
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const toastStyles = {
  success: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/50',
    icon: 'text-green-400',
    title: 'text-green-400',
    message: 'text-green-300',
  },
  error: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/50',
    icon: 'text-red-400',
    title: 'text-red-400',
    message: 'text-red-300',
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/50',
    icon: 'text-yellow-400',
    title: 'text-yellow-400',
    message: 'text-yellow-300',
  },
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/50',
    icon: 'text-blue-400',
    title: 'text-blue-400',
    message: 'text-blue-300',
  },
}

export function ToastComponent({ toast, onRemove }: ToastProps) {
  const Icon = toastIcons[toast.type]
  const styles = toastStyles[toast.type]

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id)
    }, toast.duration || 5000)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, onRemove])

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className={`relative glass rounded-xl p-4 border ${styles.bg} ${styles.border} min-w-[320px] max-w-md shadow-2xl backdrop-blur-md`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 p-1 rounded-full ${styles.bg}`}>
          <Icon className={`h-5 w-5 ${styles.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-sm ${styles.title} mb-1`}>
            {toast.title}
          </h4>
          {toast.message && (
            <p className={`text-xs ${styles.message} leading-relaxed`}>
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className={`flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors ${styles.icon}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 space-y-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}