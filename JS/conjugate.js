
//======================================  Section for CONJUGATION


// later check -   904 (te) (se) (nos) 2695 (os)

// Onload function for Conjugation and verbos

async function verbos(){

    let random_number = Math.floor(Math.random() * 3715);  // generate random no.
  
    //  var conjugation_question_infinitivo = document.getElementById("conjugation_question");  // HTML tag where 
  
    try {
  
  
      var conjugate_raw= await fetch(`../Datos/API_conjugation_presente.json`);  // English Dictionary API
      var conjugate_json = await conjugate_raw.json();
  
  
      var conjugation = conjugate_json[random_number].conjugation;
      var infinitivo = conjugate_json[random_number].infinitivo;
      var infinitive_english = conjugate_json[random_number].infinitive_english;
      var form = conjugate_json[random_number].form;
  
  
      const firstTwoChars = conjugation.slice(0, 2);  // this will check teh first 2 character to avoid verbos reflexivo. (te) (se) (nos) 2695 (os)
      const firstThreeChars = conjugation.slice(0, 3);  // this will check teh first 2 character to avoid verbos reflexivo. (te) (se) (nos) 2695 (os)
  
      // COndition to check if it's verbos reflexivos
      if (firstTwoChars === "me" || firstTwoChars === "te" || firstTwoChars === "se" || firstThreeChars === "nos" || firstTwoChars === "os" ) {
        //    console.log('Working ang filter');
           window.location.reload(); // reload page if condition is met
      } else {
         
        document.getElementById("conjugation_question").innerHTML = infinitivo + " ";
        document.getElementById("english_meaning_conjugation").innerHTML = "-" + infinitive_english + ".";
        document.getElementById("conjugate_forma").innerHTML = form;
        document.getElementById("correct_conjugation").innerHTML = conjugation;  // to be embeded via HTML this is the correct answer (invisible)
        document.getElementById("form_conjugation").innerHTML = form;  // to be embeded via HTML this is the correct answer (invisible)  
         
      }
  
  
  
  
    //   console.log(firstTwoChars); // Co
    //   console.log(conjugate_json);
    //   console.log(random_number);
    //   console.log(conjugation);
    //   console.log(conjugate_json[random_number]);
  
  
      
      
    } catch (error) {
      console.log(error);
    }  // end of Catch phrase
  
  } // end of Verbos function 
  

//====== Section for Conjugation Submit Button 

function checkAnswer(){
    event.preventDefault();
    var answer_value = latinize(document.getElementById("inputAnswer_conj").value).toLowerCase();
    var correct_conjugation = document.getElementById("correct_conjugation").textContent;  // fetch the answer fro the invisible div

    if (answer_value == correct_conjugation) {
        Swal.fire({
            title: 'Good Job !',   
            icon: 'success',  
            html:
            `<p id="swal_correctAnswer">
            <span id="important">${(answer_value[0].toUpperCase() + answer_value.slice(1).toLowerCase())}</span> is correct.  
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
    } else if(answer_value == ""){
        Swal.fire({
            title: 'Answer cannot be set as empty!',   
            icon: 'error',  
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },    
            confirmButtonColor: '#3085d6',  
            confirmButtonText: 'Try Again',
            allowOutsideClick: false
          })  // end of SWAL
      // end of Else if block
    }else {
        Swal.fire({
            title: 'Incorrect !',   
            icon: 'error',  
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },    
            confirmButtonColor: '#3085d6',  
            confirmButtonText: 'Try Again',
            allowOutsideClick: false
          })  // end of SWAL
    }  // end of Else
     
  }  // end of checkAnswer function
  
  
  //====== End of Section for Conjugation Submit Button 
  


  //====== Section for Conjugation Reset Button 

  function resetBTNconjugate(){
    event.preventDefault();
    var answer_value = latinize(document.getElementById("inputAnswer_conj").value).toLowerCase();
    var correct_conjugation = document.getElementById("correct_conjugation").textContent;  // fetch the answer fro the invisible div

    Swal.fire({   
        icon: 'info',  
        html:
        `<p id="swal_correctAnswer">
        Correct answer is <br><span id="important">${(correct_conjugation[0].toUpperCase() + correct_conjugation.slice(1).toLowerCase())}</span>
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

    
  }  // end of resetBTNconjugate() function

  //====== End of Reset Button for Conjugation 




  // ======================Intro JS function 

  document.getElementById("instructBTNconjugate").addEventListener('click', function(){

    introJs().start();

  }) // ======================end of Intro.JS function 