// alert("This is The javaScript File for our Memory Game Challenge!");

const gameContainer = document.getElementById("game");

const COLORS = [
	"red",
	"blue",
	"green",
	"orange",
	"purple",
	"red",
	"blue",
	"green",
	"orange",
	"purple",
];

/**
 * Here is a helper function to shuffle an array
 * It returns the same array with values shuffled
 * It is based on an algorithm called Fisher Yates if you want to research more
 */
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
/**
 * This function loops over the array of colors
 * It creates a new div and gives it a class with the value of the color
 * It also adds an event listener for a click for each card
 */
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement("div");

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener("click", handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
/**
 * Clicking a card should change the background color to be the color of the class it has.
 *
 * Users should only be able to change at most two cards at a time.
 *
 * Clicking on two matching cards should be a “match” — those cards should stay face up.
 *
 * When clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again. You should make sure to use a setTimeout so that you can execute code after one second.
 */

// todo: add a way so that no more than two cards can be flipped at a time.

// using an array to keep track of cards that have been flipped
let cardsFlipped = [];
// TODO: use this variable to limit the functionality of clicking more than 2 cards at a time, can probably use an if conditional.
let areWeClicking = false;
function handleCardClick(event) {
	if (areWeClicking) return;
	// you can use event.target to see which element was clicked
	console.log("you just clicked", event.target);
	// changing background color for cards clicked
	event.target.style.backgroundColor = event.target.getAttribute("class");
	// if cards flipped lenght growns bigger than 2 we take out first element and add the new card that was flipped to the end
	console.log("Checking which cards we have flipped");
	if (cardsFlipped.length > 1) {
		cardsFlipped.shift();
		cardsFlipped.push(event.target);
		console.log("Cards Flipped:", cardsFlipped);
	} else {
		cardsFlipped.push(event.target);
		console.log("Cards Flipped:", cardsFlipped);
	}
	// check if cards are a match,

	if (
		cardsFlipped.length > 1 &&
		cardsFlipped[0].getAttribute("class") ===
			cardsFlipped[1].getAttribute("class")
	) {
		let card0 = cardsFlipped[0];
		let card1 = cardsFlipped[1];
		console.log("MATCHING card 0:", card0);
		console.log("MATCHING card 1:", card1);
		console.log("Removing....");

		// let cards stay just remove the event listener from them
		for (let card of cardsFlipped) {
			card.removeEventListener("click", handleCardClick);
		}

		// im just removing them i dont need em anymore
		// HAHA taking this chunk out as a comment made the cards remain on play until its compared again against a card that is not its match.
		// setTimeout(function () {
		// 	card0.remove();
		// 	card1.remove();
		// 	cardsFlipped.pop();
		// 	cardsFlipped.pop();
		// }, 1000);
	} else if (
		cardsFlipped.length > 1 &&
		cardsFlipped[0].getAttribute("class") !==
			cardsFlipped[1].getAttribute("class")
	) {
		// flip cards after a second if they are not a match
		// change the background to white
		let card0 = cardsFlipped[0];
		let card1 = cardsFlipped[1];
		setTimeout(function () {
			card0.style.backgroundColor = "white";
			card1.style.backgroundColor = "white";
		}, 1000);
	}
	// now in the end of move reset cards flipped
	if (cardsFlipped.length > 1) {
		cardsFlipped = [];
	}
}

// when the DOM loads
createDivsForColors(shuffledColors);
