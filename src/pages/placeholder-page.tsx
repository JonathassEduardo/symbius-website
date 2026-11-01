import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/** Generic page for private routes that are not implemented yet. */
export function PlaceholderPage({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground flex h-48 items-center justify-center rounded-lg border border-dashed text-sm">
          Coming soon
        </div>
      </CardContent>
    </Card>
  )
}
