
/// <reference types="../@types/jquery"/>

 //main loading screen 
       $(document).ready(()=>{
              searchByName(" ").then(()=>{
               $('.loadingScrean').fadeOut(400)
              })
       })
                  //sidebar
$(".opnCloseBtn").on('click',function(){
    $(".navContent").animate({ width:'toggle' , padding:'toggle'},500)
    $(".opnCloseBtn").toggleClass('fa-x').toggleClass("open-close-icon")
    
})
function closeSidebar(){         
  $(".opnCloseBtn").removeClass('fa-x').addClass("open-close-icon")
  $(".navContent").animate({ width:'toggle' , padding:'toggle'},500)
  

}   
              ///view of allll
              var view=document.getElementById("dataView");
              //----------------------------------

   //search section 
   function displayMeal(mealsContainer){
    let cartona=``;
for(var i=0;i<mealsContainer.length;i++){
    cartona+=`
    
    <div class="col-md-3 courser-pointer">
        <div onclick="mealView('${mealsContainer[i].idMeal}')" class="mealImage rounded-2 position-relative overflow-hidden cursor-pointer">
          <img src="${mealsContainer[i].strMealThumb}" alt="mealPhoto" class=" w-100 rounded-2">
          <div class="layer position-absolute d-flex align-items-center p-2 text-black">
             <h3>${mealsContainer[i].strMeal}</h3></div>
        </div>
        </div>
        

          `
        }
         view.innerHTML=cartona;

}   
              // <==== search by Name  ====>
     async function searchByName (meal) {
    
      view.innerHTML=" "
       $('.SectionsLoading').fadeIn(500)
      let https = await fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
      let response= await https.json();
        if(response.meals){
          displayMeal(response.meals)
        }else{
          displayMeal([]);
        }
         $('.SectionsLoading').fadeOut(500)
     }
        // <==== search by frist letter ====>
        async function searchByFLetter (meal) {
      
          view.innerHTML=" "
           $('.SectionsLoading').fadeIn(500)
          if (meal==""){
            meal="a";
          }
          let https = await fetch(`https:www.themealdb.com/api/json/v1/1/search.php?f=${meal}`)
          let response= await https.json();
            if(response.meals){
              displayMeal(response.meals)
            }else{
              displayMeal([]);
            }
              $('.SectionsLoading').fadeOut(500)
         }
              //search view
     let searchContainer=document.getElementById("search")
    function searchView()  {
      
      searchContainer.innerHTML = `
      <div class="inputs container w-75">
                    <div class="row">
                      <div class="col-md-6 "> <input oninput="searchByName(this.value)" type="text" placeholder="Search By Name" id="nameSearch" class=" rounded-2 text-white "></div>
                        <div class="col-md-6"><input oninput="searchByFLetter(this.value)" maxlength="1" type="text" placeholder="Search By First" id="letterSearch" class=" rounded-2 text-white "></div>
                   </div></div> 
  `
      view.innerHTML = " "
      
    }  
               //search click
       $('.sideNav ul .searchLink').on('click' , function(){
        searchView()
       })
    //------------------------------------------------------------------------------------------------------   
    
    //categories section
             //category click
             $('.sideNav ul .categoryLink').on('click',function() {
                         cetegoryView()
                      
             })

           //category view
        async  function cetegoryView() {
          view.innerHTML=" "
          $('.SectionsLoading').fadeIn(300)
     let https= await fetch('https:www.themealdb.com/api/json/v1/1/categories.php');
     let response= await https.json();
                      displayCat(response.categories);
                      $('.SectionsLoading').fadeOut(300)              
        }
        //display categories
           function displayCat(arr){
          view.innerHTML=" "
     let cartona=``;
     for(var i=0;i<(arr).length;i++){
         cartona+=`
         <div class="col-md-3 courser-pointer">
             <div onclick="mealCategory('${arr[i].strCategory}')" class="mealImage rounded-2 position-relative overflow-hidden cursor-pointer rounded-2">
               <img src="${arr[i].strCategoryThumb}" alt="mealPhoto" class=" w-100 "></img>
               <div class="layer position-absolute  text-center text-black p-2">
                  <h3>${arr[i].strCategory}</h3>
                  <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                  </div>
             </div>
             </div>
               `
             }
              view.innerHTML=cartona;
              searchContainer.innerHTML=" "
           }
           // display mealCategory 
        async   function mealCategory(category){
      
          view.innerHTML=" "
           $('.SectionsLoading').fadeIn(500)
            let https= await fetch(`https:www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            let response= await https.json();
            displayMeal(response.meals.slice(0,20))
            $('.SectionsLoading').fadeOut(500)
           }

//Area section
$('.areaLink').on('click',function(){
          areaView();

})
 async function areaView() {
    
     $('.SectionsLoading').fadeIn(500)
    view.innerHTML=" ";
         let https=await fetch('https:www.themealdb.com/api/json/v1/1/list.php?a=list');
          let response = await https.json();
          displayMealArae(response.meals);
          $('.SectionsLoading').fadeOut(500)
}

function displayMealArae(arr){
  view.innerHTML=" "
  let cartona=``;
  for(var i=0;i<(arr).length;i++){
      cartona+=`
      <div class="col-md-3 courser-pointer">
          <div onclick="mealArea('${arr[i].strArea}')" class=" text-center rounded-2 text-white  cursor-pointer">
          <i class="fa-solid fa-house-laptop fa-4x "></i>
               <h3>${arr[i].strArea}</h3>
          </div>
          </div>
            `
          }
           view.innerHTML=cartona;
           searchContainer.innerHTML=" "
}

async function  mealArea(area){

  view.innerHTML=" "
  / $('.SectionsLoading').fadeIn(500)
    let https= await fetch(`https:www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let response= await https.json();
    displayMeal(response.meals.slice(0,20))
    // console.log("hello")
     $('.SectionsLoading').fadeOut(500)
       


}


//Ingredients section

$('.ingredientsLink').on('click',function(){
  ingredientView();

})
async function ingredientView() {

 $('.SectionsLoading').fadeIn(500)
view.innerHTML=" ";
 let https=await fetch('https:www.themealdb.com/api/json/v1/1/list.php?i=list');
  let response = await https.json();
  displayMealingredient(response.meals);
   $('.SectionsLoading').fadeOut(500)
}

function displayMealingredient(arr){
view.innerHTML=" "
let cartona=``;
for(var i=0;i<(arr).length;i++){
cartona+=`
<div class="col-md-3 courser-pointer">
  <div onclick="mealIngredient('${arr[i].strIngredient}')" class=" text-center rounded-2 text-white  cursor-pointer">
  <i class="fa-solid fa-drumstick-bite fa-4x"></i>
       <h2>${arr[i].strIngredient}</h2>
       <p>${(arr[i].strDescription?.split(" ").slice(0,20).join(" "))}</p>
  </div>
  </div>
    `
  
  }
   view.innerHTML=cartona;
   searchContainer.innerHTML=" "
}

async function  mealIngredient(ingredient){

view.innerHTML=" "
 $('.SectionsLoading').fadeIn(500)
let https= await fetch(`https:www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
let response= await https.json();
displayMeal(response.meals.slice(0,20))
// console.log("hello")
 $('.SectionsLoading').fadeOut(500)



}
  // meal details 

  async function mealView(id) {
  
    $('.SectionsLoading').fadeIn(500)
    view.innerHTML=" ";
     let https=await fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      let response = await https.json();
      mealDetails(response.meals[0]);
      console.log(response.meals[0])
       $('.SectionsLoading').fadeOut(500)
    }
    
  function mealDetails(meal){
       let ingredientArr=``;
       for (let i = 1; i<20 ;i++) {
        if (meal[`strIngredient${i}`]) {
          ingredientArr+= `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
      }
       }

      let tagArr=meal.strTags?.split(",")
      if (!tagArr){
      tagArr=[];
      }
      let strTagArr=``
      for(let i=0 ; i<tagArr.length;i++){
        strTagArr+= `
        <li class="alert alert-danger m-2 p-1">${tagArr[i]}</li>`
      }
     let cartona;
      cartona=`
      <div class="col-md-4 text-white">
                <img class="w-100 rounded-2 mb-2" src="${meal.strMealThumb}"
                    alt="mealPhoto">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p class="line">${meal.strInstructions}</p>
                <h3>Area : ${meal.strArea}</h3>
                <h3>Category : ${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredientArr}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${strTagArr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success me-2">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>

      `
              view.innerHTML=cartona
             
  }



//contact section
  $('.contactLink').on('click',function(){
         contactView();
        
  })

  function contactView() {
  
    view.innerHTML=`
<div class="w-75 container d-flex flex-nowrap justify-content-center align-items-center min-vh-100">
<div class="row " >
      <div class="col-md-6 left">
        <input id="namevalue"  onkeyup="Validation() , nameValidation()" type="text" placeholder="Enter Your Name" class=" ps-2 border-0 py-1 w-100 bg-light rounded-2 mb-2 ">
        <div id="nameAlert" class="alert alert-danger mt-2 d-none"><p class="text-center">Special characters and numbers not allowed</p></div>
        <input id="phonevalue" onkeyup="Validation() , phoneValidation()" type="text" placeholder="Enter Your Phone"  class=" mt-2 ps-2 border-0 py-1 w-100 bg-light rounded-2 mb-2  ">
        <div id="phoneAlert" class="alert alert-danger mt-2  d-none"><p class="text-center">Enter valid Phone Number</p></div>
        <input id="passvalue" onkeyup="Validation() , passwordValidation()" type="password" placeholder="Enter Your Password"  class=" mt-2 ps-2 border-0 py-1 w-100 bg-light rounded-2 mb-2  ">
        <div id="passAlert"  class="alert alert-danger mt-2  d-none"><p class="text-center">Enter valid password *Minimum eight characters, at least one letter and one number:*</p></div>
      </div>
      <div class="col-md-6 right">
        <input id="emailvalue" onkeyup="Validation() , emailValidation()" type="text" placeholder="Enter Your Email"  class=" ps-2 border-0 py-1 w-100 bg-light rounded-2 mb-2  ">
        <div id="emailAlert" class="alert alert-danger mt-2  d-none"><p class="text-center">Email not valid *exemple@yyy.zzz</p></div>
        <input id="agevalue" onkeyup="Validation() , ageValidation()" type="number" placeholder="Enter Your Age"  class=" mt-2 ps-2 border-0 py-1 w-100 bg-light rounded-2 mb-2  ">
        <div id="ageAlert" class="alert alert-danger mt-2  d-none"><p class=" text-center">Enter valid age</p></div>
        <input id="rapassvalue" onkeyup="Validation() , repassValidation()" type="password" placeholder="Enter Your RePassword"  class=" mt-2 ps-2 border-0 py-1 w-100 bg-light rounded-2   ">
        <div id="rePassAlert" class="alert alert-danger mt-2  d-none"><p class="text-center">Enter valid password</p></div>
      </div>
      <div class="text-center"> <button id="sub" disabled class="btn btn-outline-danger mt-2">Submit</button></div>
    </div>
  
  `
  
   searchContainer.innerHTML=" "
  }
           //name validation
   
  
  function nameValidation() { 
       let text= document.getElementById("namevalue").value
        let regex= /^[A-z]+$/
      if(regex.test(text)){
        document.getElementById("nameAlert").classList.add("d-none")
      document.getElementById("nameAlert").classList.remove("d-block")
        return true;
      }else{
      document.getElementById("nameAlert").classList.remove("d-none")
      document.getElementById("nameAlert").classList.add("d-block")
      return false;
      }
    
   }

   function phoneValidation() { 
    let text= document.getElementById("phonevalue").value
    let regex= /^01[0125][0-9]{8}$/
  if(regex.test(text)){
    document.getElementById("phoneAlert").classList.add("d-none")
  document.getElementById("phoneAlert").classList.remove("d-block")
    return true;
  }else{
  document.getElementById("phoneAlert").classList.remove("d-none")
  document.getElementById("phoneAlert").classList.add("d-block")
  return false;
  }
 }
 function  passwordValidation(){
  let text= document.getElementById("passvalue").value
    let regex= /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/
  if(regex.test(text)){
    document.getElementById("passAlert").classList.add("d-none")
  document.getElementById("passAlert").classList.remove("d-block")
    return true;
  }else{
  document.getElementById("passAlert").classList.remove("d-none")
  document.getElementById("passAlert").classList.add("d-block")
  return false;
  }


 }

 function  emailValidation(){
  let text= document.getElementById("emailvalue").value
    let regex= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  if(regex.test(text)){
    document.getElementById("emailAlert").classList.add("d-none")
  document.getElementById("emailAlert").classList.remove("d-block")
    return true;
  }else{
  document.getElementById("emailAlert").classList.remove("d-none")
  document.getElementById("emailAlert").classList.add("d-block")
  return false;
  }


 }

 function repassValidation(){
       if(document.getElementById("rapassvalue").value==document.getElementById("passvalue").value){
        document.getElementById("rePassAlert").classList.add("d-none")
        document.getElementById("rePassAlert").classList.remove("d-block")
        return true;
       }else{
        document.getElementById("rePassAlert").classList.remove("d-none")
        document.getElementById("rePassAlert").classList.add("d-block")
        return false;
       }
 }
 

 function  ageValidation(){
  let text= document.getElementById("agevalue").value
    let regex= /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
  if(regex.test(text)){
    document.getElementById("ageAlert").classList.add("d-none")
  document.getElementById("ageAlert").classList.remove("d-block")
    return true;
  }else{
  document.getElementById("ageAlert").classList.remove("d-none")
  document.getElementById("ageAlert").classList.add("d-block")
  return false;
  }


 }
  

 function  Validation(){
  if(nameValidation() && passwordValidation() && repassValidation() && emailValidation() && ageValidation() && phoneValidation()){
       
    document.getElementById("sub").removeAttribute("disabled")
  }else{
    document.getElementById("sub").setAttribute("disabled" , true)
  }
 }
 
 
           
   
  




    
   









           
           


          
           




            
