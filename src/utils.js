export const date = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  return `${year}/${month + 1}/${day}`
}

export const year = () => {
  const today = new Date();
  return today.getFullYear();
}
