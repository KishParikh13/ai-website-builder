
export const getOpenAICompletion = (requestData) => {
  return new Promise((resolve, reject) => {
    var url = "https://api.openai.com/v1/completions";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      });
    };
    xhr.send(JSON.stringify(requestData));
  })
}

export function getOpenAIImage (requestData) {
  return new Promise((resolve, reject) => {
    var url = "https://api.openai.com/v1/images/generations";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      });
    };
    xhr.send(JSON.stringify(requestData));
  })
}

export const getOpenAIImages = (requestData, setProperty) => {

  return new Promise((resolve, reject) => {
    var url = "https://api.openai.com/v1/images/generations";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      });
    };
    xhr.send(JSON.stringify(requestData));
  })
}