const gameContainer = document.getElementById("gameBoard");
const COLORS = [];
let gameContinue;

let customCardBackground =
	"radial-gradient(circle at 50%,#000000 25%,#ff0000 50%,#000000 75%,#000000 75%)";
//function that creates colors array
function createCOLORS() {
	console.log("Creating colors");
	let arrayColors = [
		"Red",
		"Yellow",
		"Green",
		"Blue",
		"Purple",
		"Orange",
		"Pink",
		"Brown",
		"turquoise",
		"magenta",
		"indigo",
		"teal",
		"beige",
		"maroon",
		"navy",
		"olive",
		"cyan",
		"peachpuff",
		"gold",
		"skyblue",
		"chocolate",
		"black",
		"grey",
		"white",
	];
	let colorCount = prompt(
		`How many color pairs would you like to play with? you can pick any number from 1 to ${arrayColors.length} `
	);
	if (colorCount <= 0) {
		console.log("pick at least 1 bro");
		alert("pick at least 1 bro");
		createCOLORS();
	} else if (colorCount === 1) {
		COLORS = [colorArray[0], colorArray[0]];
	} else if (colorCount > 1 && colorCount <= 24) {
		// TODO: LOGIC TO PLAY THE GAME WILL GO HERE
		for (let i = 0; i < colorCount; i++) {
			console.log("i:", i, arrayColors[i]);
			COLORS.push(arrayColors[i]);
		}
		for (let i = 0; i < colorCount; i++) {
			console.log("i:", i);
			COLORS.push(arrayColors[i]);
		}
	} else {
		alert("Not A valid Input!");
		createCOLORS();
	}
}

// implementing a do while loop for the game, so as to not need to reload page...
do {
	gameContinue = prompt("would you like to play again? yes or no");
} while (gameContinue[0] === "y");

// put game code in here
createCOLORS();

let finalCountDown = COLORS.length;
console.log("finalCountDown:", finalCountDown);

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
// PAM: TODO: ADD MY OWN IMG
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement("div");

		// // create a new img
		// let imgUrl = "https://imgur.com/a/dLBRQyH";
		// const newImg = document.createElement("img");
		// newImg.setAttribute("src", imgUrl);
		// // give newDiv the new img as a child
		// newDiv.append(newImg);

		// give newDiv a class attribute for the value we are looping over
		newDiv.classList.add(color);
		newDiv.style.background = customCardBackground;
		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener("click", handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

//saving cards flipped in an array and keeping track of how many are flipped in a countber variable
let cardsFlipped = [];
let countCardsFlipped = 0;

//check if card that was clicked has already been pushed into our cards flipped array
function isCardAlreadyFlipped(checkCard, cardsFlippedArray) {
	//debuggin
	console.log(
		`Checking if card: ${JSON.stringify(
			checkCard.outerHTML
		)} \nis already in cards flipped array:`,
		cardsFlippedArray
	);
	for (let i = 0; i < cardsFlippedArray.length; i++) {
		if (checkCard === cardsFlippedArray[i]) {
			//if card is already in array return true
			console.log("It is");
			return true;
		}
	}
	// card is not in the array return false
	console.log("It is Not");
	return false;
}

//function to check if cards in card array are a match
function handleFlippedCards() {
	card0 = cardsFlipped[0];
	card1 = cardsFlipped[1];
	console.log("Are these cards a Match?", cardsFlipped);

	if (card0.getAttribute("class") === card1.getAttribute("class")) {
		// its a match remove event listeners
		console.log("Yes its a match! Removing click events...");
		card0.removeEventListener("click", handleCardClick);
		card1.removeEventListener("click", handleCardClick);
		finalCountDown -= 2;
		console.log("finalCountDown:", finalCountDown);
	} else {
		// not a match -> therefore change the style of the cards back to the default
		console.log("No match.");

		cardsFlipped[0].style.backgroundColor = null;
		cardsFlipped[1].style.backgroundColor = null;
		cardsFlipped[0].style.background = customCardBackground;
		cardsFlipped[1].style.background = customCardBackground;
	}
	// whatever happens return my count and array back to defaults
	cardsFlipped = [];
	countCardsFlipped = 0;
}

function handleCardClick(event) {
	// check if we are flipping more than one card
	if (countCardsFlipped === 2) {
		// exit the function
		console.log("You Can't Flip More Than One Card At A Time.");
		return;
	}
	// you can use event.target to see which element was clicked
	let clickedCard = event.target;
	console.log("you clicked", clickedCard); //debuggin
	// check if the card we clicked has already been pushed into our array
	if (isCardAlreadyFlipped(clickedCard, cardsFlipped)) {
		//exit the function
		console.log("This card has already been flipped!");
		return;
	}
	// set the color of card flipped, to reveal its color
	clickedCard.style.background = "rgba(0,0,0,0)";
	clickedCard.style.backgroundColor = clickedCard.getAttribute("class");
	// push the card into our card array
	cardsFlipped.push(clickedCard);
	console.log("Cards Flipped:", cardsFlipped); //debuggin
	// couldnt get card array length when it was zero so instead im using a countber variable
	countCardsFlipped++;

	//FINALLY
	// if this is the second card we are flipping compare the cards using our resolveFlippedCards function
	if (countCardsFlipped === 2) {
		setTimeout(function () {
			handleFlippedCards();
			if (finalCountDown === 0) {
				console.log("GAME OVER");
				alert("Game should be done by now i think....");
			}
		}, 1000);
	}
}

// when the DOM loads
createDivsForColors(shuffledColors);
console.log("Colors Shuffled Ready to start game");
