

// onload for translate
async function translate(){
   
// Generate Random no. from 1 -24217
var random_no = Math.floor(Math.random() * 24217) + 1; // this is for the correct answer 

// this is for the Random No. INCORRECT answer 
var Random_incorrect_answer1 = Math.floor(Math.random() * 24217) + 1;
var Random_incorrect_answer2 = Math.floor(Math.random() * 24217) + 1;
var Random_incorrect_answer3 = Math.floor(Math.random() * 24217) + 1;

// GET API Data  for Spanish   
var raw_dictionary = await fetch('../Datos/Eng_Span.json');
var EngSpan = await raw_dictionary.json();




// this is for multiple Choice aka Radio Button
var corr_answer = EngSpan[random_no].Spanish; // correct Answer
var incorrectAnswer1 = EngSpan[Random_incorrect_answer1].Spanish; // Incorrect answer
var incorrectAnswer2 = EngSpan[Random_incorrect_answer2].Spanish; // Incorrect answer
var incorrectAnswer3 = EngSpan[Random_incorrect_answer3].Spanish; // Incorrect answer

var ArrayofAnswers = [corr_answer,incorrectAnswer1, incorrectAnswer2, incorrectAnswer3]; // array of answer (IN ORDER)

var totalword_correctAnswer = corr_answer.split(" ").length; // Used to count words (if more than 2)

// console.log(EngSpan[Random_incorrect_answer1].Spanish + " is " + EngSpan[Random_incorrect_answer1].English + " in English."); // Incorrect answer);
// console.log(EngSpan[Random_incorrect_answer2].Spanish + " is " + EngSpan[Random_incorrect_answer2].English + " in English."); // Incorrect answer);
// console.log(EngSpan[Random_incorrect_answer3].Spanish + " is " + EngSpan[Random_incorrect_answer3].English + " in English."); // Incorrect answer);

// function to Shuffle Answer Array 
let shuffledanswers = ArrayofAnswers.sort(function (a,b) {
    return Math.random() - 0.5;
  }); //End of  shuffledanswers



// Section in HTML to override
var questionTotranslate = document.getElementById("questionTotranslate");  // section in HTML for question
var correctanswer =  document.getElementById("correctanswer");  // section in HTML for question

// Section for Radio Button and Answer 
var choice1 = document.getElementById("choice1"); // section in HTML for Radio Button
var choice2 = document.getElementById("choice2"); // section in HTML for Radio Button
var choice3 = document.getElementById("choice3"); // section in HTML for Radio Button
var choice4 = document.getElementById("choice4"); // section in HTML for Radio Button


// Value to Show up as Dulicate value inside input Radio button
var input_txt_value1 = document.getElementById("input_txt_value1"); // This will add text value aka Answer to the input since radio button checked function is not working for me.
var input_txt_value2 = document.getElementById("input_txt_value2"); // This will add text value aka Answer to the input since radio button checked function is not working for me.
var input_txt_value3 = document.getElementById("input_txt_value3"); // This will add text value aka Answer to the input since radio button checked function is not working for me.
var input_txt_value4 = document.getElementById("input_txt_value4"); // This will add text value aka Answer to the input since radio button checked function is not working for me.


questionTotranslate.innerHTML = EngSpan[random_no].English;  // this is the Main question (The English)
correctanswer.innerHTML = corr_answer; // correct Answer in Spanish


if (totalword_correctAnswer > 1 ) {

    // ensure that Long and multiple words wont appear 
    document.getElementById("mainBody").style.display = "none"; 
    window.location.reload(); // reload page is word count is more than 2 
} else {
    if (random_no === Random_incorrect_answer1 || random_no === Random_incorrect_answer2 || random_no === Random_incorrect_answer3) {
        // ensure that Long and multiple words wont appear 
        document.getElementById("mainBody").style.display = "none"; 
        window.location.reload(); // reload page is results are identical

    } else {
        
    
        
        // Random \ Shuffled Value na ito 
        // The second section will add value to the Radio Input since I'm having issue getting Its Value 
        
        choice1.innerHTML= shuffledanswers[0]; // to render via Radio Button
        input_txt_value1.value = shuffledanswers[0];  // This is now working

        choice2.innerHTML= shuffledanswers[1]; // to render via Radio Button
        input_txt_value2.value = shuffledanswers[1];  // This is now working

        choice3.innerHTML= shuffledanswers[2]; // to render via Radio Button
        input_txt_value3.value = shuffledanswers[2]; // This is now working

        choice4.innerHTML= shuffledanswers[3]; // to render via Radio Button
        input_txt_value4.value = shuffledanswers[3];  // This is now working
    } 
    

     // GET API Data  for English 
    try {  
        var eng_dictionary = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${EngSpan[random_no].English}`);  // English Dictionary API
        var english_dict = await eng_dictionary.json();


        // To render via main page 
        document.getElementById("english_partOfSpeech").innerHTML = await english_dict[0].meanings[0].partOfSpeech; // parts of Speech
        document.getElementById("english_meaning").innerHTML = await english_dict[0].meanings[0].definitions[0].definition; // Definition and meaning
       

    } catch (error) {
        // To render via main page 
        console.log(english_dict.title);  // Error Title if not Found   
        document.getElementById("english_meaning").innerHTML = "Meaning and Definition not found."; // Error Title if not Found   
      
    }  // end of Catch Block

} // end of IF ELSE for totalword_correctAnswer >= 2 
} // end of translate() function



// ========================================================================================================================================================

// function to GET CORRECT Answer 
function getAnswer(){
 
    var correctanswer = document.getElementById("correctanswer").textContent;  // Correct Answer in Spanish 
    var Answer = document.querySelector('input[name="radio2"]:checked').value; // Radio Button value 
    var questionTotranslate = document.getElementById("questionTotranslate").textContent; // Correct Answer in English 
  
if (correctanswer === Answer) {
   // SWAL for Correct Answer  
Swal.fire({
    title: 'Good Job !',   
    icon: 'success',  
    html:
    `<p id="swal_correctAnswer">
    <span id="camelCase">${correctanswer}</span> is <span id="camelCase2">${questionTotranslate}</span> in English.
    </p>`,
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },    
    confirmButtonColor: '#3085d6',  
    confirmButtonText: 'Next <i class="fa-solid fa-chevron-right"></i>',
    allowOutsideClick: false
  }).then((result) => {
    if (result.isConfirmed) {
        window.location.reload();
    }
  })


} else {
// SWAL for InCorrect Answer  

var incorrect_answer = document.querySelector('input[name="radio2"]:checked').value; // Radio Button value 

var index = data_forIncorrectans.findIndex(span_ => span_.Spanish === incorrect_answer); // this will get the Value from the backup data JS

var english_meaning = (data_forIncorrectans[index].English);  // this will get the Englisg meaning to render if answer is not correct.

Swal.fire({
    title: 'Incorrect Answer !',   
    icon: 'error', 
    html:
    `<p id="swal_correctAnswer">
    <span id="camelCase">${incorrect_answer}</span> is 
    <span id="camelCase">${english_meaning}</span> in English
    </p>`,   
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },    
    confirmButtonColor: '#f0506e',  
    confirmButtonText: 'Try Again  <i class="fa-sharp fa-solid fa-repeat-1"></i>',
    allowOutsideClick: false
  })  
}
} // End of getAnswer() function


//====================  Function for Dragula ======================

function init(){
  dragula([document.querySelector("#maincontainer_for_drag")], {
    direction: 'horizontal',
    slideFactorX: 25,
    slideFactorY: 25
  });

  nouns(); // run verbos function
}  //====================  End of Dragula ======================




//====================  Function for nouns ======================

async function nouns(){

  let random_number = Math.floor(Math.random() * 1987);

  try {

    var noun_api = await fetch(`../Datos/span_noun_with_articles.json`);  // fetch API for Nouns
    var nouns= await noun_api.json();

    
    var english_noun = nouns[random_number].english_noun;
    var spanish_noun = nouns[random_number].spanish_noun;

    
    document.getElementById("another_placeholder").innerHTML = spanish_noun;
    document.getElementById("placeholderparaanswer").innerHTML = spanish_noun.split(/\s/).join('');


  
    // Shuffle method aka Fisher-Yates || https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
    shuffle = spanish_noun =>
      [...spanish_noun]
        .reduceRight((res, _, __, arr) => (
          res.push(...arr.splice(0 | Math.random() * arr.length, 1)),
          res), [])
        .join(''); // shuffle function

        var split_spanish_noun = shuffle(spanish_noun).split(/\s/).join(''); // will split and remove whitespace

        var breakdown_split_spanish_noun = Object.values(split_spanish_noun); // variable needed / required for FOR LOOP 

        // console.log(breakdown_split_spanish_noun);
    
    
     // FOR LOOP Starts HERE 
     breakdown_split_spanish_noun.forEach(async function (spanish_iterated) {   // FOR LOOP

      var for_each_value = await spanish_iterated;  // Iterated / Itemized value of split_romanize_value
      

      document.getElementById("maincontainer_for_drag").innerHTML += `
      <div id="dragparent">
      <div id="data">${for_each_value}</div>
      </div> `;
    })  // End of FOR LOOP



    document.getElementById("english_meaning_forjumble").innerHTML = english_noun;  // will embed the english Value via HTML
 
  
    
  } catch (error) {
    console.log(error);

    Swal.fire({       
      icon: 'error',  
      title: 'An Error Occurred !',   
      showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },    
      confirmButtonColor: '#3085d6',  
      confirmButtonText: 'Try Again',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
          window.location.reload();
      }
    }) // end of SWAL.
    
  }

  
} // end of nouns function


// function for check answer 
document.getElementById("btn_for_answer").addEventListener('click', function(){

 var hidden_ans = document.getElementById("placeholderparaanswer").textContent;  // get data from hidden div
 var hidden_ans2 = document.getElementById("another_placeholder").textContent;  // get data from hidden div || without spaces
 var user_input = document.getElementById("maincontainer_for_drag").textContent.split(/\s/).join(''); // remove white spaces

//  console.log(hidden_ans);
//  console.log(user_input);

 if (hidden_ans === user_input) { // if answer is correct

  Swal.fire({
    title: 'Good Job !',   
    icon: 'success',  
    html:
    `<p id="swal_correctAnswer">
    <span id="important">${(hidden_ans2)}</span> is correct.
    </p>`, 
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },    
    confirmButtonColor: '#3085d6',  
    confirmButtonText: 'Next <i class="fa-solid fa-chevron-right"></i>',
    allowOutsideClick: false
  }).then((result) => {
    if (result.isConfirmed) {
        window.location.reload();
    }
  })
   
  
 } else {
    Swal.fire({
    title: 'Incorrect !',   
    icon: 'error',  
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },    
    confirmButtonColor: '#3085d6',  
    confirmButtonText: 'Try Again',
    allowOutsideClick: false
  })
 }

}) // End of function for check answer 


// function for  Reset
document.getElementById("btn_for_reset").addEventListener('click', function(){

  var hidden_ans = document.getElementById("another_placeholder").textContent;  // get data from hidden div

  Swal.fire({   
    icon: 'info',  
    html:
    `<p id="swal_correctAnswer">
    Correct answer is <br><span id="important">${(hidden_ans)}</span>
    </p>`, 
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },    
    confirmButtonColor: '#3085d6',  
    confirmButtonText: 'Next <i class="fa-solid fa-chevron-right"></i>',
    allowOutsideClick: false
  }).then((result) => {
    if (result.isConfirmed) {
        window.location.reload();
    }
  })
  
 }) // End of function for Reset



 // About DEV info. 


 function about_dev(){

  document.getElementById("about_dev").addEventListener('click', function(){

  
    Swal.fire({
      html: `
      <div class="ui small circular rotate reveal image">
      <img id="dev_img" src="../IMG/profile.png">     
      </div>
      <br>    
      <a id="my_name" href="https://jamespaulespena.netlify.app/" target="_blank"  class="item">
      @James Paul Espeña
      </a>`,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',  
      confirmButtonText: 'I Don\'t Care !',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  
    
   }) 

 }

// End of About DEV info. 


// for instruction using Intro.JS

document.getElementById("instructBTN").addEventListener('click', function(){
  introJs().start();
}) // End of instruction using Intro.JS















//====================  for search function ======================

// document.getElementById("autoComplete_list_1").addEventListener("click", function(){  
//   document.getElementById("fetchInput").click();  // will click the invisble button
// })  // this is the function click the dropdown list



// document.getElementById("fetchInput").addEventListener("click", async function(){
//     var inputValue = document.getElementById("autoComplete").value;  // Get value of Input box

//     let obj_meaning = data_forIncorrectans.find(objectData => objectData.English === inputValue || objectData.Spanish === inputValue); // this will get the JSON value from backup_data.js then will be displayed in a later phase. English or Spanish query will work


//     // variable for pop up 
//     Eng_value = await obj_meaning.English;
//     Span_value = await obj_meaning.Spanish;
    


//     // // this is the API for English Dictionary.
//     // var eng_dictionary = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${Eng_value}`);  // English Dictionary API and will use teh English Parsing data Eng_value
//     // var english_dict = await eng_dictionary.json();

//     // eng_partofspeach = await english_dict[0].meanings[0].partOfSpeech;
//     // eng_synonyms = await english_dict[0].meanings[0].synonyms;
//     // eng_meaning = await english_dict[0].meanings[0].definitions[0].definition;


//     // console.log(inputValue);
//     // console.log(obj_meaning);
//     // console.log(english_dict);
//     // console.log(Eng_value);
//     // console.log(Span_value);
//     // console.log(eng_partofspeach);
//     // console.log(eng_synonyms);
//     // console.log(eng_meaning);

//     try {

//         // this is the API for English Dictionary.
//         var eng_dictionary = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${Eng_value}`);  // English Dictionary API and will use teh English Parsing data Eng_value
//         var english_dict = await eng_dictionary.json();
    
//         // Dictinary value
//         eng_partofspeach = await english_dict[0].meanings[0].partOfSpeech;
//         eng_synonyms = await english_dict[0].meanings[0].synonyms;
//         // eng_meaning = await english_dict[0].meanings[0].definitions[0].definition;
//         eng_meaning = await english_dict[0].meanings;
       

//         console.log(inputValue);
//         console.log(obj_meaning);
//         console.log(english_dict);
//         console.log(Eng_value);
//         console.log(Span_value);
//         console.log(eng_partofspeach);

//         // this is for each meaning || All meaning
//         for (var meaning of eng_meaning) 
//         {
//           console.log( "- " + meaning.definitions[0].definition);
//         }
        

//     // console.log(eng_synonyms);
//     // console.log(eng_meaning);
    
//     } catch (error) {
//     console.log(inputValue);  
//     console.log(Eng_value);
//     console.log(Span_value);
//     }



// }) // end of fetchInput function

//====================  END of search function ======================