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

// Show Alert 
UI.prototype.showAlert = function (message, className) {
  // Create the div 
  const div = document.createElement('div');
  // Add class name 
  div.className = `alert ${className}`;
  // add text 
  div.appendChild(document.createTextNode(message));
  // Get Parent El 
  const container = document.querySelector('.container');
  const form = document.querySelector('#meal-form');
  // Insert alert before the form 
  container.insertBefore(div, form);
  // Time out 
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete Meal 
UI.prototype.deleteMeal = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
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

  // Validate 
  if (name === '' || calories === "" || mealNum === "") {
    // Show Alert 
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list 
    ui.addMealToList(meal);

    // Clear Fields 
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for deleting 
document.getElementById('meal-list').addEventListener('click', function (e) {
  // Instantiate UI 
  const ui = new UI();

  ui.deleteMeal(e.target);

  // Show Message 
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
})