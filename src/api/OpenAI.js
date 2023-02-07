


  export const getOpenAICompletion = (requestData, setProperty) => {

    var url = "https://api.openai.com/v1/completions";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var open_ai_response = JSON.parse(xhr.response);
        console.log("Completion Response", open_ai_response)

        if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
          var response = open_ai_response.choices[0].text
          if (response) {
            setProperty(response);
          }
        } else {
          setProperty("")
        }
      }
    };

    console.log("Completion Request", requestData)
    let data = JSON.stringify(requestData)
    xhr.send(data);
  }

  export const getOpenAIImage = (requestData, setProperty) => {

    var url = "https://api.openai.com/v1/images/generations";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var open_ai_response = JSON.parse(xhr.response);
        console.log("Image Response", open_ai_response)

        if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
          var response = open_ai_response.data[0].url
          if (response) {
            setProperty(response);
          }
        } else {
          setProperty("")
        }
      }
    };

    console.log("Image Request", requestData)
    let data = JSON.stringify(requestData)
    xhr.send(data);
  }

  export const getOpenAIImages = (requestData, setProperty) => {

    var url = "https://api.openai.com/v1/images/generations";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var open_ai_response = JSON.parse(xhr.response);
        console.log("Image Response", open_ai_response)

        if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
          var response = open_ai_response.data
          if (response) {
            setProperty(response);
          }
        } else {
          setProperty("")
        }
      }
    };

    console.log("Images Request", requestData)
    let data = JSON.stringify(requestData)
    xhr.send(data);
  }