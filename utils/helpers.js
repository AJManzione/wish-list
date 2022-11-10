function getDate(input) {
  let date = new Date(input);
  return date.getMonth() + "-" + date.getDay() + "-" + date.getFullYear();
}
