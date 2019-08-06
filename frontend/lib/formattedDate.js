import format from 'date-fns/format';

const formatDate = dateString => {
  const split = dateString.split('T');
  const time = split[1].slice(0, 5);
  const date = format(split[0], 'ddd Do MMMM YYYY');
  return { date, time };
};

export default formatDate;
