
$(document).ready(function() 
{
	
	function Cart(price, amount) 
	{
  		this.price = price;
  		this.amount = amount;
	}

	var shirt = new Cart(10, 0);
	var game = new Cart(25, 0);
	var agraph = new Cart(50, 0);
	var meet = new Cart(100, 0);
	var sex = new Cart(-10, 0);
	
	var realfeed = [];
	var fakefeed = [];
	var praise = ["Awesome.", "8-pack.", "God.", "Faker.", "Handsome."];
	var sentence = ["K1llerk1d is definitely ", "He does indeed have a ", "Well, some people call him ",
	 "There is a rumour that he teaches ", "He is indeed super ", "Thank you, We received the feedback: "]
	var index = 0;

	$("button").mouseenter(function() 
	{
    	$(this).css({"border-radius":"20px 20px 20px 20px"});
	});

	$("button").mouseleave(function() 
	{
		$(this).css({"border-radius":"20px 20px 0px 0px"});
	});

	$("aside > section").mouseenter(function() 
	{
		if($(this).is("#shop-cart"))
    	{
    		$(this).css({"border-radius":"20px 20px 20px 20px"});
    	}
    	else
    	{
    		//$(this).animate({margin:"-=2.5", height: "+=5px", width: "+=5px" }, 50);
    		$(this).css({"border-radius":"20px 20px 20px 20px"});
    	}

    	if($(this).is("#feed-text"))
    	{
    		document.getElementById("addfeed").value = realfeed.join("");
    	}
	});

	$("aside > section").mouseleave(function() 
	{	
		if($(this).is("#shop-cart"))
    	{
			$(this).css({"border-radius":"20px 20px 0px 0px"});
		}
		else
		{
			//$(this).animate({margin:"+=2.5", height: "-=5px", width: "-=5px" }, 50);
			$(this).css({"border-radius":"20px 20px 0px 0px"});
		}

		if($(this).is("#feed-text"))
    	{
    		document.getElementById("addfeed").value = fakefeed.join("");
    	}
	});

	$("header").click(function(){
		if($("#home-article").css("display") == "none")
		{
			checkLeftDisplayedMenu();
			$("#home").hide(2000);
			hideArticle();
			$("#home-article").show(2000);
			checkRightDisplayedMenu(0);
		}
	});

	$("#rightbar > section").click(function() 
	{
		if(!$(this).is("#feed-text") && !$(this).is("#shop-cart"))
		{
			hideArticle();
			$("#rightbar > section").hide(2000);
			if($(this).is("#shopright"))
			{
				$("#shop-article").show(2000);
				$("#shop-cart").show(2000);
				$("#feedleft").show(2000);
			}
			else
			{
				$("#feed-article").show(2000);
				$("#feed-text").show(2000);
				$("#shopleft").show(2000);
			}
			checkLeftDisplayedMenu();
		}
	});

	$("#leftbar > section").click(function() 
	{
		checkLeftDisplayedMenu();
		$(this).hide(2000);
		hideArticle();
		if($(this).is("#about"))
		{
			$("#about-article").show(2000);
			checkRightDisplayedMenu(0);
		}
		else if($(this).is("#video"))
		{
			$("#video-article").show(2000);
			checkRightDisplayedMenu(0);
		}
		else if($(this).is("#home"))
		{
			$("#home-article").show(2000);
			checkRightDisplayedMenu(0);
		}
		else if($(this).is("#feedleft"))
		{
			$("#feed-article").show(2000);
			checkRightDisplayedMenu(1);
			$("#feed-text").show(2000);
		}
		else if($(this).is("#shopleft"))
		{
			$("#shop-article").show(2000);
			checkRightDisplayedMenu(2);
			$("#shop-cart").show(2000);
		}
	});
	function checkLeftDisplayedMenu()	
	{
		hideVFrame();
		if($("#home").css("display") == "none")
		{
			$("#home").show(2000);
		}
		if($("#video").css("display") == "none")
		{
			$("#video").show(2000);
		}
		if($("#about").css("display") == "none")
		{
			$("#about").show(2000);
		}
	}
	function checkRightDisplayedMenu(art)
	{
		this.art = art;
		if(art === 1)
		{
			$("#rightbar > section").hide(2000);
			$("#feedleft").hide(2000);
			$("#shopleft").show(2000);
		}
		else if(art === 2)
		{
			$("#rightbar > section").hide(2000);
			$("#shopleft").hide(2000);
			$("#feedleft").show(2000);
		}
		else
		{
			$("#feedright").show(2000);
			$("#shopright").show(2000);
			$("#feed-text").hide(2000);
			$("#shop-cart").hide(2000);
			$("#shopleft").hide(2000);
			$("#feedleft").hide(2000);
		}
	}
	function hideArticle()	
	{
		$("#about-article").hide(2000);
		$("#home-article").hide(2000);
		$("#video-article").hide(2000);
		$("#feed-article").hide(2000);
		$("#shop-article").hide(2000);
	}

	$("#feed-form").on("submit", function( event)
	{
		event.preventDefault();

		var newfeedback = document.getElementById("feedback").value;

		if(newfeedback != "")
		{
			$("#feed-p").html(sentence[5] + praise[index] + "<br>" + sentence[index] + praise[index]);
			fakefeed.push(praise[index] + "\n");
			document.getElementById("addfeed").value = fakefeed.join("");
			realfeed.push(newfeedback + "\n");
			$("#feedback", "#feed-form").val("");
			index++;
			if(index === 5)
			{
				index = 0;
			}
		}
	});

	$("button").click(function()
	{
		if($(this).is("#shirt"))
		{
			shirt.amount += 1;
			
		}
		else if($(this).is("#game"))
		{
			game.amount += 1;
		}
		else if($(this).is("#agraph"))
		{
			agraph.amount += 1;
		}
		else if($(this).is("#meet"))
		{
			meet.amount += 1;
		}
		else if($(this).is("#sex"))
		{
			sex.amount += 1;
		}
		else if($(this).is("#pentakid"))
		{
			hideVFrame();
			$("#penta-frame").show(2000);
		}
		else if($(this).is("#penta-back"))
		{
			hideVFrame();
			$("#pentaback-frame").show(2000);
		}
		else if($(this).is("#penta-return"))
		{
			hideVFrame();
			$("#pentareturn-frame").show(2000);
		}
		updateCart()
	});
	
	function hideVFrame()	
	{
		$("#penta-frame").hide();
		$("#pentareturn-frame").hide();
		$("#pentaback-frame").hide();
	}

	$(".tdButton").click(function()
	{
		if($(this).is("#td--shirt"))
		{
			shirt.amount += 1;
		}
		else if($(this).is("#td-shirt"))
		{
			shirt.amount -= 1;
		}
		else if($(this).is("#td--game"))
		{
			game.amount += 1;
		}
		else if($(this).is("#td-game"))
		{
			game.amount -= 1;
		}
		else if($(this).is("#td--graph"))
		{
			agraph.amount += 1;
		}
		else if($(this).is("#td-graph"))
		{
			agraph.amount -= 1;
		}
		else if($(this).is("#td--meet"))
		{
			meet.amount += 1;
		}
		else if($(this).is("#td-meet"))
		{
			meet.amount -= 1;
			
		}
		else if($(this).is("#td--sex"))
		{
			sex.amount += 1;
		}
		else if($(this).is("#td-sex"))
		{
			sex.amount -= 1;	
		}
		updateCart();
	});

	function updateCart()	
	{
		$("#cart-shirt-a").text("" + shirt.amount);
		$("#var-shirt").text("" + (shirt.price * shirt.amount));

		$("#cart-game-a").text("" + game.amount);
		$("#var-game").text("" + (game.price * game.amount));

		$("#cart-graph-a").text("" + agraph.amount);
		$("#var-graph").text("" + (agraph.price * agraph.amount));

		$("#cart-meet-a").text("" + meet.amount);
		$("#var-meet").text("" + (meet.price * meet.amount));

		$("#cart-sex-a").text("" + sex.amount);
		$("#var-sex").text("" + (sex.price * sex.amount));

		var totalprice = (shirt.price * shirt.amount) + (game.price * game.amount) +
		(agraph.price * agraph.amount) + (meet.price * meet.amount) + (sex.price * sex.amount);
		$("#var-total").text("" + totalprice);

		if(shirt.amount >= 1)
		{
			$("#cart-shirt").show();
		}
		else
		{
			$("#cart-shirt").hide();
		}

		if(game.amount >= 1)
		{
			$("#cart-game").show();
		}
		else
		{
			$("#cart-game").hide();
		}
		if(agraph.amount >= 1)
		{
			$("#cart-graph").show();
		}
		else
		{
			$("#cart-graph").hide();
		}
		if(meet.amount >= 1)
		{
			$("#cart-meet").show();
		}
		else
		{
			$("#cart-meet").hide();
		}
		if(sex.amount >= 1)
		{
			$("#cart-sex").show();
		}
		else
		{
			$("#cart-sex").hide();
		}
	}

});