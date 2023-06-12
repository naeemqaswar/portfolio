const base64Encode = (text) => {
  try {
    return text ? btoa(text) : "";
  } catch (e) {
    return;
  }
};

const base64Decode = (text) => {
  try {
    return text ? atob(text) : "";
  } catch (e) {
    return;
  }
};

function getParameterByName(name, url = window.location.href) {
  if (!name) return;

  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

module.exports = { base64Decode, base64Encode, getParameterByName };
