import format from 'date-fns/format';

// helper function which takes a database date/time string and formats accordingly.
const formatDate = (dateString, formatString) => {
  const split = dateString.split('T');
  const time = split[1].slice(0, 5);
  const date = format(split[0], formatString);
  return { date, time };
};

export default formatDate;
