import XLSX from 'xlsx';
import type { Comment } from './types';

export const getExcelBuffer = (comments: Comment[]): Buffer => {
  const worksheet = XLSX.utils.json_to_sheet(comments);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Comments');

  const headings = ["Ім'я", 'Username', 'Коментар', 'Дата', 'Відредаговано'];

  worksheet['!cols'] = headings.map((str) => ({
    wch: str.length + 25,
  }));

  XLSX.utils.sheet_add_aoa(worksheet, [headings], { origin: 'A1' });

  return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }) as Buffer;
};
