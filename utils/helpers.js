module.exports = {
  getDate(input) {
    let date = new Date(input);
    console.log(date.toDateString());
    return (
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  },

  getFullDate(input) {
    let date = new Date(input);
    return date.toDateString();
  },
};
