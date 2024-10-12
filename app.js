const searchBox             =document.querySelector(".searchBox");
const searchBtn             =document.querySelector(".searchBtn");
const recipeContainer       =document.querySelector(".recipe-container");
const recipeDetailsContent  =document.querySelector(".recipe-details-content");
const recipeCloseBtn        =document.querySelector(".recipe-close-btn");

//Function to get recipe 

const fetchRecipes=async (query)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>";
    try {
    const Data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=  await Data.json();
    recipeContainer.innerHTML="";
    response.meals.forEach(meal =>{
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish </p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>`

        const button=document.createElement('button');
        button.textContent="view Recipe";
        recipeDiv.appendChild(button);
        
        //adding eventListener to recipe button
        
        button.addEventListener("click",()=>{
            openRecipePopUp(meal);
        });
        recipeContainer.appendChild(recipeDiv);
    });
} catch (error) {
    recipeContainer.innerHTML="<h2>Error in Fetching Recipes...</h2>";
}
    // console.log(response);    
}

//function for popup
const openRecipePopUp=(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstruction">
    <h3>Instructions:</h3>
    <p >${ meal.strInstructions}</p>
</div>
    `
    recipeDetailsContent.parentElement.style.display="block";
}
//function for close the popUp

recipeCloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display="none";

});
//function to get Ingredients and Measurements

const fetchIngredients=(meal)=>{
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measurement=meal[`strMeasure${i}`];
            ingredientsList+=`<li>${measurement}${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchQuery = searchBox.value.trim();
    if(!searchQuery){
        recipeContainer.innerHTML=`<h2>Type the meal  in the search  box</h2>`;
        return;
    }
    fetchRecipes(searchQuery);
});
