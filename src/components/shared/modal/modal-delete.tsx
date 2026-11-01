import type { ReactNode } from 'react'
import { Loader2, Trash2, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type ModalDeleteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: ReactNode
  description: ReactNode
  onConfirm: () => void | Promise<void>
  loading?: boolean
  cancelLabel?: string
  confirmLabel?: string
}

export function ModalDelete({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  loading = false,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
}: ModalDeleteProps) {
  function handleOpenChange(nextOpen: boolean) {
    if (loading) {
      return
    }

    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden bg-card p-0 text-card-foreground sm:max-w-md"
      >
        <div className="h-1.5 w-full bg-destructive" />

        <button
          type="button"
          aria-label="Close"
          disabled={loading}
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-6 rounded-md p-1 text-card-foreground/60 transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          <X className="size-4" />
        </button>

        <div className="space-y-6 p-6">
          <div className="flex items-start gap-4 pr-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-destructive/20 text-destructive">
              <Trash2 className="size-5" />
            </span>

            <DialogHeader className="gap-1.5 text-left">
              <DialogTitle className="text-base font-semibold text-card-foreground">
                {title}
              </DialogTitle>

              <DialogDescription className="text-sm leading-relaxed text-card-foreground/70">
                {description}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => onOpenChange(false)}
              className="min-w-24 border-transparent bg-[var(--secondary-accent)] text-white hover:bg-[var(--secondary-accent)] hover:text-white hover:brightness-125"
            >
              {cancelLabel}
            </Button>

            <Button
              type="button"
              disabled={loading}
              onClick={onConfirm}
              className="min-w-24 bg-destructive font-semibold text-card-foreground hover:bg-destructive/85"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              {confirmLabel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}