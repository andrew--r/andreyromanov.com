const formatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function formatDate(date) {
  return formatter.format(date);
}

module.exports = { formatDate };
