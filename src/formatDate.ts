export const formatDate = (
  timeStamp: number,
  locales?: Intl.LocalesArgument,
): string =>
  new Date(timeStamp * 1000).toLocaleString(locales, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
