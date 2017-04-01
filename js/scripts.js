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
var namePattern    = /^\S$|[A-Za-z ]{3,99}$/;
var addressPattern = /^\d+\s[A-z]+\s[A-z]+/;
var cityPattern    = /^[a-zA-Z]+(?: [\s-][a-zA-Z]+)*$/;
var otherPattern   = /^[a-zA-Z]+(?: [\s-][a-zA-Z]+)*$/;
var statePattern   = /^\S$|(?:A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$/;
var zipPattern     = /^\S$|(^\d{5}$)|(^\d{5}-\d{4}$)/;
var phonePattern   = /^\S$|\d{3}-\d{3}-\d{4}$/;
var emailPattern   = /^\S+@\S+\.\S+$/;

//define function
function validateInput(e) {
    var input = e.target;
    if (input.id == 'name' && !namePattern.test(input.value)) {
        input.classList.add('danger');
    } else if (input.id == 'street' && !addressPattern.test(input.value)) {
        input.classList.add('danger');
    } else if (input.id == 'city' && !cityPattern.test(input.value)) {
        input.classList.add('danger');
    } else if (input.id == 'other-input' && !otherPattern.test(input.value)) {
        input.classList.add('danger');
    } else if (input.id == 'state' && !statePattern.test(input.value)) {
        input.classList.add('danger');
    } else if (input.id == 'zip' && !zipPattern.test(input.value)) {
        input.classList.add('danger');
    } else if (input.id == 'phone' && !phonePattern.test(input.value)) {
        input.classList.add('danger');
    } else if (input.id == 'email' && !emailPattern.test(input.value)) {
        input.classList.add('danger');
    } else {
        input.classList.remove('danger'); 
    }
}

//add event listener
deliveryInfo.addEventListener('focusout', validateInput);

// =========================== pizza object
var menu = {
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

// =========================== dough total 
//grab all variables needed 
var dough;
var dropDown = document.querySelector('#dough-price');
var elements = document.querySelectorAll('#dough-options > input');

//define function
function populateDoughOptions() {  
    dropDown.options.length = 0;
    dough = menu._dough[this.id];  

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
    cheeseTotal = menu._cheese._price[cheeseSelect.selectedIndex - 1]; 

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
    sauceTotal = menu._sauce._price[sauceOption.selectedIndex - 1]; 

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
            toppingsTotal += menu._toppings._price[i];
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