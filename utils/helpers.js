
module.exports = {

getDate(input) {
  let date = new Date(input);
  let newDate = date.toDateString()
  return newDate;

}

}
