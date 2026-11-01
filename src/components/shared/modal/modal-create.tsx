import type { FormEventHandler, ReactNode } from 'react'
import { Loader2, Plus, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type ModalCreateProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: ReactNode
  description: ReactNode
  children: ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
  icon?: LucideIcon
  loading?: boolean
  cancelLabel?: string
  submitLabel?: string
}

export function ModalCreate({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  icon: Icon = Plus,
  loading = false,
  cancelLabel = 'Cancelar',
  submitLabel = 'Criar',
}: ModalCreateProps) {
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
        className="bg-card text-card-foreground gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-lg"
      >
        <div className="bg-primary h-1.5 w-full" />

        <button
          type="button"
          aria-label="Fechar"
          disabled={loading}
          onClick={() => onOpenChange(false)}
          className="text-card-foreground/60 hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring absolute top-6 right-4 rounded-md p-1 transition-colors focus:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <X className="size-4" />
        </button>

        <form onSubmit={onSubmit} noValidate className="space-y-6 p-6">
          <div className="flex items-start gap-4 pr-6">
            <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-full">
              <Icon className="size-5" />
            </span>

            <DialogHeader className="gap-1.5 text-left">
              <DialogTitle className="text-card-foreground text-base font-semibold">
                {title}
              </DialogTitle>
              <DialogDescription className="text-card-foreground/70 text-sm leading-relaxed">
                {description}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-4">{children}</div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => onOpenChange(false)}
              className="h-11 min-w-24 rounded-xl"
            >
              {cancelLabel}
            </Button>

            <Button type="submit" disabled={loading} className="h-11 min-w-24 rounded-xl font-semibold">
              {loading && <Loader2 className="size-4 animate-spin" />}
              {submitLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}