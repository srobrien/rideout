const createExcerpt = (text, length) => {
  const arr = text.split(' ');
  const tails = arr.length - 1 > length;
  const spliced = arr.splice(0, length);
  if (tails) {
    spliced.push('...');
  }
  return spliced.join(' ');
};

export default createExcerpt;
