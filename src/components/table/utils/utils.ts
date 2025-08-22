// 表格相关工具函数

export const getCellClass = (cellIndex: number, totalCells: number): string => {
  if (cellIndex === 0) return 'text-left';
  if (cellIndex === totalCells - 1) return 'text-right';
  return 'text-center';
};

export const getRowClass = (rowIndex: number): string => {
  return rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50';
};
