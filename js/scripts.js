/// =========================== other address type selection
var otherInput  = document.querySelector('.hide-other-box');
var addressType = document.querySelector('#address-type');

function toggleOtherInput() {
    if (addressType.value == 'other') {
        otherInput.className = 'show-other-box';
    } else {
        otherInput.className = 'hide-other-box';
    }
}

addressType.addEventListener('change', toggleOtherInput);

// =========================== form validation

//grab all variables needed
var deliveryInfo   = document.querySelector('.delivery-info');
//regex patterns
//These pattern matchers are constants. I would put them in an object.
const VALIDATOR = {
  name    : /^\S$|[A-Za-z ]{3,99}$/,
  address : /^\d+\s[A-z]+\s[A-z]+/,
  city    : /^[a-zA-Z]+(?: [\s-][a-zA-Z]+)*$/,
  other   : /^[a-zA-Z]+(?: [\s-][a-zA-Z]+)*$/,
  state   : /^\S$|(?:A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$/,
  zip     : /^\S$|(^\d{5}$)|(^\d{5}-\d{4}$)/,
  phone   : /^\S$|\d{3}-\d{3}-\d{4}$/,
  email   : /^\S+@\S+\.\S+$/
}
//define function
//This long list of conditional statement is hard to maintain. What heppens if there is
// another pattern, would you just keep adding to the conditional statement?
// A better to break this up is to have one function that acts as the listener
// dealing with getting the input and chaing the css and second function that
// just validates input.
// The listener listens for a change and then passes the input along with a pattern
// along to the validator which returns true or false.
// This is also a lot easier to test.

function listener(e) {
  let input = e.target
  if (isValidInput(input.value, VALIDATOR[input.id])) {
    input.classList.remove('danger');
  } else {
    input.classList.add('danger');
  }
}

function isValidInput(input, pattern) {
  return pattern.test(input);
}
// function validateInput(e) {
//     var input = e.target;
//     if (input.id == 'name' && !namePattern.test(input.value)) {
//         input.classList.add('danger');
//     } else if (input.id == 'street' && !addressPattern.test(input.value)) {
//         input.classList.add('danger');
//     } else if (input.id == 'city' && !cityPattern.test(input.value)) {
//         input.classList.add('danger');
//     } else if (input.id == 'other-input' && !otherPattern.test(input.value)) {
//         input.classList.add('danger');
//     } else if (input.id == 'state' && !statePattern.test(input.value)) {
//         input.classList.add('danger');
//     } else if (input.id == 'zip' && !zipPattern.test(input.value)) {
//         input.classList.add('danger');
//     } else if (input.id == 'phone' && !phonePattern.test(input.value)) {
//         input.classList.add('danger');
//     } else if (input.id == 'email' && !emailPattern.test(input.value)) {
//         input.classList.add('danger');
//     } else {
//         input.classList.remove('danger');
//     }
// }

//add event listener
deliveryInfo.addEventListener('focusout', listener);

// =========================== pizza object
// same as above, I would make this a constant
// Why do you have the underscore in front of the key names? This is generally
// done to indicate they are private keys, to not be used. You are using these.
const MENU = {
    _dough: {
        _handTossed: {
            _size:  ['small', 'medium', 'large'],
            _price: [9.99, 12.99, 14.99]
        },
        _thinCrust: {
            _size: ['medium', 'large'],
            _price: [11.99, 13.99]
        },
        _newYorkStyle: {
            _size: ['large', 'extra-large'],
            _price: [16.99, 19.99]
        },
        _glutenFree: {
            _size: ['small'],
            _price: [10.99]
        }
    },
    _cheese: {
        _amount: ['light', 'normal', 'extra', 'double'],
        _price: [0, 0, 2.99, 3.99]
    },
    _sauce: {
        _amount: ['regular tomato', 'hearty tomato', 'bbq'],
        _price: [0, .99, 1.99]
    },
    _toppings: {
        _ingredients: ['pepperoni', 'sausage', 'ham', 'bacon', 'salami', 'peppers', 'olives', 'jalapenos', 'mushrooms', 'pineapple', 'onion'],
        _price: [.99, .99, .99, .99, .99, .99, .99, .99, .99, .99, .99]
    }
};


/*
Each part of this form follows a similar pattern
1. User inputs something
2. Do something with that input Validate input/change_form/update_price
3. I would make an update price function to have one thing whose job it is
to update the price.
4. The change form is a little trickier because the change is very dependent but
it can be narrowed down to a dropown list. I would write a function that takes in
the choice made by the user and returns the new options. And then another function
that clears out the the dropdown and refills with the new choice

function populateDoughOptions(e) {
  dropDown.options.length = 0
  let choice = MENU._dough[this.id]
  let choices = createOptions(choice) // choices would return a string of HTML, use outerHtml
  dropDown.innerHTML = choices
}


*/


// =========================== dough total
//grab all variables needed
var dough;
var dropDown = document.querySelector('#dough-price');
var elements = document.querySelectorAll('#dough-options > input');


//define function
function populateDoughOptions() {
    dropDown.options.length = 0; // very good way of clearing out the list!!
    dough = MENU._dough[this.id];// good use of this!!

    for (var i = 0; i < dough._size.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = (dough._size[i] + ": " + dough._price[i]);
        dropDown.appendChild(option);
    }
    getDoughTotal();
}

function getDoughTotal() {
    var doughTotal = dough._price[dropDown.options.selectedIndex];
    if (isNaN(doughTotal)) {
        return (0);
    } else {
        return doughTotal;
    }
}
// add event listener
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('change', populateDoughOptions);
}


// =========================== cheese total
//grab all variables needed
var cheeseSelect = document.querySelector('#cheese-price');

// define function
function getCheeseTotal() {
    var cheeseTotal = 0;
    cheeseTotal = MENU._cheese._price[cheeseSelect.selectedIndex - 1];

    if (isNaN(cheeseTotal)) {
        return (0);
    } else {
        return cheeseTotal;
    }
}

// add event listener
cheeseSelect.addEventListener('change', getCheeseTotal);

// =========================== sauce total
//grab all variables needed
var sauceOption = document.querySelector('#sauce-price');

// define function
function getSauceTotal() {
    var sauceTotal = 0;
    sauceTotal = MENU._sauce._price[sauceOption.selectedIndex - 1];

    if (isNaN(sauceTotal)) {
        return (0);
    } else {
        return sauceTotal;
    }
}

// add event listener
sauceOption.addEventListener('change', getSauceTotal);

// =========================== toppings total
//grab all needed variables

var toppingSelect = document.querySelectorAll('#toppings-price');
var toppingInputs = document.querySelectorAll('#toppings-price > input');

//define functions
function getToppingsTotal() {
    var toppingsTotal = 0;
    for (var i = 0; i < toppingInputs.length; i++) {
        if (toppingInputs[i].checked) {
            toppingsTotal += MENU._toppings._price[i];
        }
    }
    if (isNaN(toppingsTotal)) {
        return (0);
    } else {
        return toppingsTotal;
    }
}

for (var i = 0; i < toppingInputs.length; i++) {
    toppingInputs[i].addEventListener('change', getToppingsTotal);
}


// =========================== order total
// grab variables
var buildPizza = document.querySelector('#build-pizza');

// define functions
function getOrderTotal() {
    var total = getDoughTotal() + getCheeseTotal() + getSauceTotal() + getToppingsTotal();
    var totalText = document.querySelector('#order-total');
    totalText.innerHTML = "Order Total: " + "$" + total.toFixed(2);
}

// event listeners are not needed. function triggered at individual function
buildPizza.addEventListener('change', getOrderTotal);
