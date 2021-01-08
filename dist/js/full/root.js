function getCookie(name) {
  var cookie = " " + document.cookie;
  var search = " " + name + "=";
  var setStr = null;
  var offset = 0,
    end = 0;
  if (cookie.length > 0) {
    offset = cookie.indexOf(search);
    if (offset != -1) {
      offset += search.length;
      end = cookie.indexOf(";", offset);
      if (end == -1) {
        end = cookie.length;
      }
      setStr = unescape(cookie.substring(offset, end));
    }
  }
  return setStr;
}
function httpPost(url) {
  return new Promise(function(resolve, reject) {
    let xhr =
      typeof XMLHttpRequest != "undefined"
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open("POST", url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
}
getJSON = function(url, sendingData, successHandler, errorHandler = null) {
  let xhr =
    typeof XMLHttpRequest != "undefined"
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open("POST", url, true);
  xhr.onreadystatechange = function() {
    let status;
    let data;
    if (xhr.readyState == 4) {
      // `DONE`
      status = xhr.status;
      if (status == 200) {
        data = JSON.parse(xhr.responseText);
        successHandler && successHandler(data);
      } else {
        errorHandler && errorHandler(status);
      }
    }
  };
  xhr.send(sendingData);
};

function remove(el) {
  let toRemove = document.querySelector(el);
  if (toRemove) toRemove.parentNode.removeChild(toRemove);
}
/**
 * Render
 */
function cEl(element, attribute, inner) {
  if (typeof element === "undefined") {
    return false;
  }
  if (typeof inner === "undefined") {
    inner = "";
  }
  let el = document.createElement(element);

  if (!Array.isArray(attribute)) {
    attribute = [attribute];
  }
  for (var k = 0; k < attribute.length; k++) {
    if (typeof attribute[k] === "object") {
      for (var key in attribute[k]) {
        el.setAttribute(key, attribute[k][key]);
      }
    }
  }
  if (!Array.isArray(inner)) {
    inner = [inner];
  }
  for (var k = 0; k < inner.length; k++) {
    if (inner[k].tagName) {
      el.appendChild(inner[k]);
    } else {
      el.appendChild(document.createTextNode(inner[k]));
    }
  }
  return el;
}

/**
 * RenderDIV
 */
function cDiv(attribute, inner) {
  return cEl("div", attribute, inner);
}
/**
 * RenderSPAN
 */
function cSpan(attribute, inner) {
  return cEl("span", attribute, inner);
}
