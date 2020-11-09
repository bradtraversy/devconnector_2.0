function formatDate(date) {
  return new Intl.DateTimeFormat().format(new Date(date));
}

export default formatDate;
