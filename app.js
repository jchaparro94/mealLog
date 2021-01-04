// Meal constructor
function Meal(name, calories, mealNum) {
  this.name = name;
  this.calories = calories;
  this.mealNum = mealNum;
}
// UI Constructor 
function UI() {
  // Add meal to list
  UI.prototype.addMealToList = function (meal) {
    const list = document.getElementById('meal-list');
    // Create tr element 
    const row = document.createElement('tr');
    // Insert Columns 
    row.innerHTML = `
      <td>${meal.name}</td>
      <td>${meal.calories}</td>
      <td>${meal.mealNum}</td>
      <td><a class="delete">X</a></td>
    `;

    list.appendChild(row);
  }
}

// Clear Fields 
UI.prototype.clearFields = function () {
  document.getElementById('name').value = '';
  document.getElementById('calories').value = '';
  document.getElementById('meal-num').value = '';
}



// Event Listeners 
document.getElementById('meal-form').addEventListener('submit', function (e) {
  // Get Form Values 
  const name = document.getElementById('name').value,
    calories = document.getElementById('calories').value,
    mealNum = document.getElementById('meal-num').value;
  
  // Instantiate the meal
  const meal = new Meal(name, calories, mealNum);
  // Instantiate UI 
  const ui = new UI();

  // Add book to list 
  ui.addMealToList(meal);

  // Clear Fields 
  ui.clearFields();

  e.preventDefault();
})