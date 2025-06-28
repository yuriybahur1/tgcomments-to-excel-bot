export const getEditedStatus = (
  editDate: number | undefined,
  editHide: boolean | undefined,
) => {
  if (!editDate || editHide === undefined) return '';

  return editHide ? '' : 'Так';
};
