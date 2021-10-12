function onClick(e) {
  e.preventDefault();
  // get form values
  let string = document.getElementById('inputString').value;
  let s = document.getElementById('selector');
  let type = s.options[s.selectedIndex].value;
  let urlEnd = "";

  // check if number is empty
  if (string === "" || type === "random") {
    urlEnd = "random.php";
  }
  else if (type === "name") {
    urlEnd = "search.php?s=" + string;
  }
  else if (type === "letter"){
    urlEnd = "search.php?f" + string;
  }

  // setup URL
  let url = "https://www.themealdb.com/api/json/v1/1/" + urlEnd;
  // call API
  fetch(url)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the Numbers API service: " + response.statusText
        }
      }
      return response.text();
    }).then(function(text) {
      // update DOM with response
      updateResult(text);
    });
}

function updateResult(info) {
  document.getElementById('result').innerHTML = info;
}

document.getElementById('Submit').addEventListener('click', onClick);
