module.exports = {

  numberWithCommas: function(x){

    var commaformatted_value = numberWithCommas(x);

    return commaformatted_value;

  },

  replaceAll: function(str, find, replace){

    var new_str = replaceAll(str, find, replace);

    return new_str;

  }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}
