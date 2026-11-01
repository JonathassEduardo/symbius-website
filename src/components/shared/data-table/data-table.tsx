import { Fragment,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
} from 'lucide-react'

import { cn } from '@/lib/utils'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export type DataTableColumn<T> = {
  id: string
  header: string
  headerTooltip?: string
  sortable?: boolean
  sortValue?: (row: T) => string | number
  sticky?: boolean
  headerClassName?: string
  cellClassName?: string
  cell: (row: T) => ReactNode
  exportValue?: (row: T) => string
}

type SortState = {
  id: string
  direction: 'asc' | 'desc'
}

type PageSize = 10 | 50 | 100

type DataTableProps<T> = {
  data: T[]
  columns: DataTableColumn<T>[]
  emptyMessage?: string
  containerClassName?: string
  stickyHeader?: boolean
  rowKey?: (row: T, index: number) => string
  rowClassName?: (row: T) => string
  paginated?: boolean
  pageSizeOptions?: readonly PageSize[]
  defaultPageSize?: PageSize

  isRowExpanded?: (row: T) => boolean
  renderExpandedRow?: (row: T) => ReactNode
}

const stickyHeaderClasses =
  'sticky left-0 z-10 data-table-sticky-header after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-border'

const stickyCellClasses =
  'sticky left-0 z-10 data-table-sticky-cell after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-border'

const defaultPageSizeOptions: readonly PageSize[] = [
  10,
  50,
  100,
]

function compare(
  a: string | number,
  b: string | number,
) {
  if (
    typeof a === 'number' &&
    typeof b === 'number'
  ) {
    return a - b
  }

  return String(a).localeCompare(String(b))
}

function TableSkeletonRows<T>({
  columns,
  rows = 10,
}: {
  columns: DataTableColumn<T>[]
  rows?: number
}) {
  return (
    <>
      {Array.from({ length: rows }).map(
        (_, rowIndex) => (
          <TableRow
            key={`skeleton-${rowIndex}`}
            className="hover:bg-transparent!"
          >
            {columns.map(
              (column, columnIndex) => (
                <TableCell
                  key={column.id}
                  className={cn(
                    'relative hover:bg-transparent!',
                    column.sticky &&
                      stickyCellClasses,
                    column.cellClassName,
                  )}
                >
                  <div
                    className={cn(
                      'h-4 animate-pulse rounded-md bg-skeleton',
                      columnIndex % 4 === 0 &&
                        'w-[75%]',
                      columnIndex % 4 === 1 &&
                        'w-[55%]',
                      columnIndex % 4 === 2 &&
                        'w-[65%]',
                      columnIndex % 4 === 3 &&
                        'w-[85%]',
                    )}
                  />
                </TableCell>
              ),
            )}
          </TableRow>
        ),
      )}
    </>
  )
}

export const DataTable = <T,>({
  data,
  columns,
  emptyMessage = 'No data found.',
  containerClassName,
  stickyHeader = false,
  rowKey,
  rowClassName,
  paginated = false,
  pageSizeOptions = defaultPageSizeOptions,
  defaultPageSize = 10,
  isRowExpanded,
  renderExpandedRow,
}: DataTableProps<T>) => {
  const [sort, setSort] =
    useState<SortState | null>(null)

  const [pageSize, setPageSize] =
    useState<PageSize>(defaultPageSize)

  const [page, setPage] = useState(1)

  const [
    isChangingPageSize,
    setIsChangingPageSize,
  ] = useState(false)

  const containerRef =
    useRef<HTMLDivElement>(null)

  const [lockedHeight, setLockedHeight] =
    useState<number | undefined>(
      undefined,
    )

  const sortedData = useMemo(() => {
    if (!sort) {
      return data
    }

    const column = columns.find(
      (item) => item.id === sort.id,
    )

    if (!column?.sortValue) {
      return data
    }

    const { sortValue } = column

    return [...data].sort(
      (a, b) => {
        const result = compare(
          sortValue(a),
          sortValue(b),
        )

        return sort.direction === 'asc'
          ? result
          : -result
      },
    )
  }, [data, columns, sort])

  const totalItems = sortedData.length

  const totalPages = !paginated
    ? 1
    : Math.max(
        1,
        Math.ceil(totalItems / pageSize),
      )

  useEffect(() => {
    setPage(1)
  }, [pageSize, totalItems])

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const pagedData = useMemo(() => {
    if (!paginated) {
      return sortedData
    }

    const start =
      (page - 1) * pageSize

    return sortedData.slice(
      start,
      start + pageSize,
    )
  }, [
    sortedData,
    paginated,
    pageSize,
    page,
  ])

  useLayoutEffect(() => {
    if (!paginated || totalPages <= 1) {
      setLockedHeight(undefined)
      return
    }

    if (
      pagedData.length === pageSize &&
      containerRef.current
    ) {
      setLockedHeight(
        containerRef.current.scrollHeight,
      )
    }
  }, [
    paginated,
    pageSize,
    pagedData,
    totalPages,
  ])

  const rangeStart =
    totalItems === 0
      ? 0
      : (page - 1) * pageSize + 1

  const rangeEnd = Math.min(
    page * pageSize,
    totalItems,
  )

  function handlePageSizeChange(
    value: string,
  ) {
    const nextPageSize = Number(
      value,
    ) as PageSize

    if (nextPageSize === pageSize) {
      return
    }

    setIsChangingPageSize(true)

    requestAnimationFrame(() => {
      setPageSize(nextPageSize)
      setPage(1)

      requestAnimationFrame(() => {
        setIsChangingPageSize(false)
      })
    })
  }

  function toggleSort(id: string) {
    setSort((current) => {
      if (current?.id !== id) {
        return {
          id,
          direction: 'asc',
        }
      }

      if (current.direction === 'asc') {
        return {
          id,
          direction: 'desc',
        }
      }

      return null
    })
  }

  function renderSortIcon(id: string) {
    if (sort?.id !== id) {
      return (
        <ChevronsUpDown className="size-3 shrink-0 opacity-40" />
      )
    }

    return sort.direction === 'asc' ? (
      <ArrowUp className="size-3 shrink-0" />
    ) : (
      <ArrowDown className="size-3 shrink-0" />
    )
  }

  return (
    <div className="w-full space-y-3">
      <div
        ref={containerRef}
        style={
          lockedHeight
            ? { minHeight: lockedHeight }
            : undefined
        }
        className={cn(
          'w-full overflow-x-auto',
          containerClassName,
        )}
      >
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow className="hover:bg-transparent!">
              {columns.map((column) => {
                const isSortable =
                  Boolean(column.sortable) &&
                  Boolean(column.sortValue)

                const headerContent = isSortable ? (
                  <button
                    type="button"
                    onClick={() =>
                      toggleSort(column.id)
                    }
                    className="inline-flex max-w-full items-center gap-1 truncate"
                  >
                    <span className="truncate">
                      {column.header}
                    </span>

                    {renderSortIcon(column.id)}
                  </button>
                ) : (
                  column.header
                )

                return (
                  <TableHead
                    key={column.id}
                    aria-sort={
                      sort?.id === column.id
                        ? sort.direction ===
                          'asc'
                          ? 'ascending'
                          : 'descending'
                        : undefined
                    }
                    className={cn(
                      'overflow-hidden text-ellipsis whitespace-nowrap',
                      stickyHeader &&
                        'sticky top-0 z-20 bg-card',
                      column.sticky &&
                        stickyHeaderClasses,
                      column.headerClassName,
                    )}
                  >
                    {column.headerTooltip ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-block max-w-full truncate">
                            {headerContent}
                          </span>
                        </TooltipTrigger>

                        <TooltipContent className="max-w-[240px] bg-accent text-accent-foreground fill-accent [&_*]:!text-accent-foreground">
                          {column.headerTooltip}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      headerContent
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-border">
            {isChangingPageSize ? (
              <TableSkeletonRows
                columns={columns}
                rows={10}
              />
            ) : pagedData.length === 0 ? (
              <TableRow className="hover:bg-transparent!">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center hover:bg-transparent!"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              pagedData.map((row, index) => {
                const key = rowKey?.(row, index) ?? index
                const expanded = isRowExpanded?.(row) ?? false

                return (
                  <Fragment key={key}>
                    <TableRow
                        className={cn(
                          'border-b border-border',
                          index % 2 === 0 ? 'bg-card' : 'bg-muted/10',
                          rowClassName?.(row),
                        )}
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          className={cn(
                            'relative hover:bg-transparent!',
                            column.sticky && stickyCellClasses,
                            column.cellClassName,
                          )}
                        >
                          {column.cell(row)}
                        </TableCell>
                      ))}
                    </TableRow>

                    {expanded && renderExpandedRow && (
                      <TableRow className="bg-muted/10 hover:bg-muted/10!">
                        <TableCell
                          colSpan={columns.length}
                          className="p-4 border-b border-border"
                        >
                          {renderExpandedRow(row)}
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {paginated &&
        totalItems > 0 && (
          <div className="flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Rows per page
              </span>

              <Select
                value={String(
                  pageSize,
                )}
                onValueChange={
                  handlePageSizeChange
                }
                disabled={
                  isChangingPageSize
                }
              >
                <SelectTrigger className="h-8 w-[80px]">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {pageSizeOptions.map(
                    (option) => (
                      <SelectItem
                        key={option}
                        value={String(
                          option,
                        )}
                      >
                        {option}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                {rangeStart}–{rangeEnd}{' '}
                of {totalItems}
              </span>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  disabled={
                    page <= 1 ||
                    isChangingPageSize
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        Math.max(
                          1,
                          current - 1,
                        ),
                    )
                  }
                >
                  <ChevronLeft className="size-4" />
                </Button>

                <span className="min-w-[70px] text-center">
                  Page {page} of{' '}
                  {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  disabled={
                    page >= totalPages ||
                    isChangingPageSize
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        Math.min(
                          totalPages,
                          current + 1,
                        ),
                    )
                  }
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}