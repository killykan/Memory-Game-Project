	
	/*Declaration of the variables*/
	
	const landingMessage = $(".landing");
	const gameTitle = $("#game-title");
	const deck = $(".deck");
	const headerTitle = $(".container header h1");
	const scorePanel = $(".score-panel");
	const startEmo = $(".start");
	const clickMe = $(".start span");
	let evaluateCard = [];               /*Array to store the opened cards*/
	const board = $(".deck");
	let firstClick = "";
	let secondClick = "";
	let count = 0;
	let imgs = $(".visible");
	let moves = 0;
	let movePanel = $(".score-panel .moves");
	const restartBtn = $(".restart");
	let matchedCard = [];				/*Array to store the matched cards*/
	const congratsDeck = $(".congrats");
	const btnReplay = $("#play-again");
	const starOne = $(".stars li:first-child");
	const starTwo = $(".stars li:lt(2)");
	const starThree = $(".stars").children();

	/*Array of all cards*/

	const cardArray = [
		"https://i.imgur.com/FIwHyv2.png",
		"https://i.imgur.com/a6h4lXj.png",
		"https://i.imgur.com/FIwHyv2.png",
		"https://i.imgur.com/a6h4lXj.png",
		"https://i.imgur.com/erS3t7P.png",
		"https://i.imgur.com/erS3t7P.png",
		"https://i.imgur.com/u7rmv5g.png",
		"https://i.imgur.com/u7rmv5g.png",
		"https://i.imgur.com/s0eRyDW.png",
		"https://i.imgur.com/s0eRyDW.png",
		"https://i.imgur.com/jZKLQdJ.png",
		"https://i.imgur.com/jZKLQdJ.png",
		"https://i.imgur.com/Prz7fkd.png",
		"https://i.imgur.com/Prz7fkd.png",
		"https://i.imgur.com/qWKFdq3.png",
		"https://i.imgur.com/qWKFdq3.png",
		"https://i.imgur.com/z53tmSH.png",
		"https://i.imgur.com/z53tmSH.png",
		"https://i.imgur.com/FsiwbRU.png",
		"https://i.imgur.com/FsiwbRU.png",
	]


	
	
	/*setting the behavior of the landing page*/

	deck.hide("fast");
	headerTitle.hide("fast");
	scorePanel.hide("fast");
	congratsDeck.hide("fast");
	landingMessage.hide("fast").delay(400).slideDown(3200);
	clickMe.hide("fast").delay(400).slideDown(3200);

	

	startEmo.on("click", function(e){
		e.preventDefault();
		landingMessage.fadeOut(400);      /*landing page fades and game page shows on click*/
		startEmo.fadeOut(400);
		deck.fadeIn(8000);
		headerTitle.fadeIn(3000).delay(2000).slideToggle(3000);
		scorePanel.fadeIn(3000);
	})

		/*logic of the matching game */

	$("document").ready(function(){

		prepareDeck();
				
		    	
		/*eventlistener's function to set the behavior of the cards when opened */

		function showCard(e){
			e.preventDefault();
			$(this).toggleClass("open");
			$(this).children().toggleClass("hidden visible");
			evaluateCard.push($(this).children());
			console.log(evaluateCard);
			
			count++;
			console.log(count);
			moves++;
			console.log(moves);
			movePanel.html("<span>"+ moves + " moves</span>");
			stars();
			
			
			if (count === 1){
				firstClick = $("#" + $(this).children().attr("id")).attr("src");
				console.log(firstClick);
			}
			else if(count === 2){
				secondClick = $("#" + $(this).children().attr("id")).attr("src");
				
				console.log(secondClick);
				$(".card").unbind("click", showCard);
				match();
				setTimeout(function(){
				$(".card").not(".matched").bind("click", showCard);
				count = 0;
				firstClick, secondClick = "";
				},1500);
			}
		}

			/*function to set behavior of cards if they match/unmatch*/
		
		function match(){
			
			if(firstClick === secondClick){
				console.log("matched");
				$(".deck").children(".open").delay(2000).addClass("matched");

				$(".matched").children().addClass("locked");
				matchedCard.push(secondClick, firstClick);
				console.log(matchedCard);
				if(matchedCard.length === cardArray.length){
					congrats();
					btnReplay.click(replay);
				}
			}
			else if(firstClick !== secondClick){
				console.log("not matched");
				setTimeout(function(){
					$(".card.open").not(".matched").toggleClass("open");
					$(".visible").not(".locked").toggleClass("hidden visible");
				},1000);
			}
		}
			
			/*function to reset the game if needed*/

		function reset(){
			
			const card = $(".card");
			if( card.hasClass("open matched") && card.children().hasClass("visible locked")){
				card.removeClass("open matched");
				card.children().removeClass("visible locked").addClass("hidden");
			}
			$(".stars").children().removeClass("score-s");
			evaluateCard = [];
			matchedCard = [];
			console.log(evaluateCard);
			count = 0;
			moves = 0;
			movePanel.html("<span>"+ moves + " moves</span>");

		}

			/*function to set the behavior of the congrats page*/

		function congrats(){
			deck.delay(1000).hide("fast");
			scorePanel.fadeOut(1000);
			congratsDeck.fadeIn(5000);
		}

		function replay(){
			let divDetach = $(".deck").children();
			congratsDeck.hide("fast");
			deck.fadeIn(4000);
			scorePanel.fadeIn(4000);
			divDetach.detach();
			reset();
			prepareDeck();		
		}
		
			/*function to set the score*/

		function stars(){
			if(moves > 50 && matchedCard.lentgh < 10){
				starOne.addClass("score-s");
			}
			else if((moves > 20 && moves < 50) && matchedCard.length >= 10){
				starTwo.addClass("score-s");
			}
			else if((moves > 20 && moves < 35) && matchedCard.lentgh >= 16){
				starThree.addClass("score-s");
			}
		}

			/*function to append all cards to the deck and call the eventlistener's function*/

		function prepareDeck(){
			shuffle(cardArray);
			cardArray.forEach(function( value, index ) {
				board.append("<div class=card><img id=img" + index + " class=hidden src=" + value + "/>");
			});
			$(".card").click(showCard);
			restartBtn.click(reset);
			
		}	

			/*Shuffle function from http://stackoverflow.com/a/2450976*/

		function shuffle(array) {
    		var currentIndex = array.length, temporaryValue, randomIndex;

    		while (currentIndex !== 0) {
        		randomIndex = Math.floor(Math.random() * currentIndex);
        		currentIndex -= 1;
        		temporaryValue = array[currentIndex];
        		array[currentIndex] = array[randomIndex];
        		array[randomIndex] = temporaryValue;
    	}

    		return array;
}


            /***********************comments***********************/

/*function shuffle(array) {
	for (let i = array.length -1; i > 0; i--){
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}*/










})