export interface TimesheetPaginationProps {
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize?: number) => void;
  onPageSizeChange: (size: number) => void;
}
