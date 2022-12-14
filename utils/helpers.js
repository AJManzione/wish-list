module.exports = {
  getDate(input) {
    let date = new Date(input);
    return (
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  },

  getFullDate(input) {
    let date = new Date(input);
    return date.toDateString();
  },

  displayLink(input) {
    return input != null ? input.toString().length > 0 : false;
  },
};
