import { Api } from 'telegram';

export const getFullName = (user: Api.User): string => {
  if (user.deleted) {
    return 'Deleted account';
  }

  return [user.firstName, user.lastName].filter(Boolean).join(' ');
};
