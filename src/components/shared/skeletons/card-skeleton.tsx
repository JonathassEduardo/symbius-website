import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-3 rounded-full" />
      </CardHeader>

      <CardContent>
        <Skeleton className="h-6 w-16" />
        <Skeleton className="mt-2 h-2.5 w-32" />
      </CardContent>
    </Card>
  )
}