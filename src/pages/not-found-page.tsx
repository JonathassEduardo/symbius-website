import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { routes } from '@/lib/routes'

export function NotFoundPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-primary text-xs font-semibold tracking-widest uppercase">Erro 404</p>
      <h1 className="text-4xl leading-tight font-semibold">Página não encontrada</h1>
      <p className="text-muted-foreground max-w-sm text-sm">
        A página que você procura não existe ou foi movida.
      </p>
      <Button asChild className="h-11 rounded-xl">
        <Link to={routes.home}>Voltar ao início</Link>
      </Button>
    </div>
  )
}