function onClick(e) {
  e.preventDefault();
  // get form values
  let string = document.getElementById('inputString').value;
  let s = document.getElementById('selector');
  let type = s.options[s.selectedIndex].value;
  let urlEnd = "";
  let firstLetter = string.charAt(0); //"letter" only accepts one letter

  // check what the type is
  if (string === "" || type === "random") {
    urlEnd = "random.php";
  }
  else if (type === "name") {
    urlEnd = "search.php?s=" + string;
  }
  else if (type === "letter"){
    urlEnd = "search.php?f=" + firstLetter;
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
      return response.json();
      //return response.text();
    //}).then(function(text) {
    }).then(function(json) {
      console.log(json); //For informational purposes

      if (string === "" || type === "random") {
        // update DOM with response
        //information of interest:
        //same as with name. I think the output should be the same. Always outputs meal array with one element
      }
      else if (type === "name") {
        // update DOM with response
        //information of interest:
        //json.meals[i].strMeal  is the name of the dish
        //If there is one element (meals[0] only) it returns only that recipe. If not, it returns a list of them. We could either check for this and if there are more than one meal, we could output a list or just output the first entry every time.
        //json.meals[i].strMealThumb  is a picture of the dish
        //json.meals[i].strIngredient1  is the begining of the ingredient list. There seems to always be 20 ingredients (strIngredient1, strIngredient2, .., strIngredient20)
        //json.meals[i].strMeasure1 is the measurements of the ingredients. It seems to be tied to the ingreditent list (also goes to 20) and should be outputted with the ingredients
        //json.meals[i].strInstructions is one string full of the instructions
        //Perphaps add json.meals[i].strYoutube which links to youtube
      }
      else if (type === "letter"){
        //same as name. I would only put in json.meals[i].strMeal in an unordered list
        //Other properties of interest
        //strArea: "American" location where food came from
        //strCategory: "Beef" category
        //Is interesting to note, that the search letter doesn't always mean all of the meals start with that search letter
      }
      // update DOM with response
    //  updateResult(text);
      updateResult("temp");
    });
}

function updateResult(info) {
  document.getElementById('result').innerHTML = info;
}

document.getElementById('Submit').addEventListener('click', onClick);
