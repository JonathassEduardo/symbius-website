import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

interface TableSkeletonProps {
  columns: number
  rows?: number
  headers?: string[]
}

export function TableSkeleton({ columns, rows = 6, headers }: TableSkeletonProps) {
  return (
    <Table>
      {headers && (
        <TableHeader>
          <TableRow>
            {headers.map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="h-3 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}

      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex} className="py-2">
                <Skeleton className="h-3 w-20" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}