function createSlug(str){
  const re = /\s+/;
  return str.replace(re, '');
}

module.exports = {
  createSlug
}
