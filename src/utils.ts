const formatDate = (str: string, withoutHour?: boolean) => {
  const date = new Date(str);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hour = date.getHours().toString();
  const minute = date.getMinutes().toString();
  return withoutHour
    ? `${day}.${month}.${year}`
    : `${day}.${month}.${year} - ${hour}:${minute}`;
};

export {formatDate};
