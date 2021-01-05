class Meal {
  constructor(name, calories, mealNum) {
    this.name = name;
    this.calories = calories;
    this.mealNum = mealNum;
  }
}

class UI {
  addMealToList(meal) {
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

  showAlert(message, className) {
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

  deleteMeal(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('name').value = '';
    document.getElementById('calories').value = '';
    document.getElementById('meal-num').value = '';
  }
}

// Local Storage 
class Store {
  static getMeals() {
    let meals;
    if (localStorage.getItem('meals') === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem('meals'));
    }

    return meals;
  }

  static displayMeals() {
    const meals = Store.getMeals();
    
    meals.forEach(function (meal) {
      const ui = new UI;

      // Add meal to UI 
      ui.addMealToList(meal);
    });
  }

  static addMeal(meal) {
    const meals = Store.getMeals();

    meals.push(meal);

    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static removeMeal(mealNum) {
    const meals = Store.getMeals();
    
    meals.forEach(function (meal, index) {
      if (meal.mealNum === mealNum) {
        meals.splice(index, 1);
      }
    });
    localStorage.setItem('meals', JSON.stringify(meals));
  }
}

// DOM LOAD Event 
document.addEventListener('DOMContentLoaded', Store.displayMeals);

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

    // Add to local storage 
    Store.addMeal(meal);

    // Clear Fields 
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for deleting 
document.getElementById('meal-list').addEventListener('click', function (e) {
  // Instantiate UI 
  const ui = new UI();

  // Delete meal
  ui.deleteMeal(e.target);

  // Remove from LS 
  Store.removeMeal(e.target.parentElement.previousElementSibling.textContent)

  // Show Message 
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
});
