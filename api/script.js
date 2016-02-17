
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
	 "There is a rumour that he teaches ", "He is indeed super ", "Thank you, We received the feedback: "];
	var index = 0;

	var games = [];

	$("#sum-form").on("submit", function( event)
	{
		event.preventDefault();

		var newSumName = document.getElementById("sum-name").value;

		if(newSumName != "")
		{
			$.getJSON("https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/" +
				newSumName + "?api_key="
			, function(name) {
				$.each(name, function(i, summoner) {
					$.getJSON("https://euw.api.pvp.net/api/lol/euw/v1.3/stats/by-summoner/"
						+ summoner.id +
						"/ranked?season=SEASON2015&api_key="
					, function(data) {
						$("#you-name").text("loading..");
						$.each(data.champions, function(j, object) {
							if(object.id === 0)
							{
								$("#you-name").text(newSumName);
								var wp = object.stats.totalSessionsWon/object.stats.totalSessionsPlayed;
								var kill = object.stats.totalChampionKills/object.stats.totalSessionsPlayed;
								var death = object.stats.totalDeathsPerSession/object.stats.totalSessionsPlayed;
								var assist = object.stats.totalAssists/object.stats.totalSessionsPlayed;
								var kda = (kill + assist) / death;

								$("#you-gp").text(object.stats.totalSessionsPlayed);
								$("#you-gw").text(object.stats.totalSessionsWon);
								$("#you-wp").text(wp.toString().substring(2, 4) + "%");
								$("#you-kill").text(kill.toString().substring(0, 3));
								$("#you-death").text(death.toString().substring(0, 3));
								$("#you-a").text(assist.toString().substring(0, 3));
								$("#you-kda").text(kda.toString().substring(0, 3));
								$("#you-pk").text(object.stats.totalPentaKills);
							}
						});
					});
				});
			});
			$("#api-table").show();
		}
	});

	$.getJSON("https://euw.api.pvp.net/api/lol/euw/v1.3/stats/by-summoner/23939878/ranked?season=SEASON2015&api_key="
	, function(data) {
		$.each(data.champions, function(j, object) {
			if(object.id === 0)
			{
				var wp = object.stats.totalSessionsWon/object.stats.totalSessionsPlayed;
				var kill = object.stats.totalChampionKills/object.stats.totalSessionsPlayed;
				var death = object.stats.totalDeathsPerSession/object.stats.totalSessionsPlayed;
				var assist = object.stats.totalAssists/object.stats.totalSessionsPlayed;
				var kda = (kill + assist) / death;

				$("#ki-gp").text(object.stats.totalSessionsPlayed);
				$("#ki-gw").text(object.stats.totalSessionsWon);
				$("#ki-wp").text(wp.toString().substring(2, 4) + "%");
				$("#ki-kill").text(kill.toString().substring(0, 3));
				$("#ki-death").text(death.toString().substring(0, 3));
				$("#ki-a").text(assist.toString().substring(0, 3));
				$("#ki-kda").text(kda.toString().substring(0, 3));
				$("#ki-pk").text(object.stats.totalPentaKills);
			}
		});
	});

	function getMatchHistory()	
	{
		$("#api-body").text(" ");
		$("#api-body").append('<div class="game-404">'
				+ '<img id="champ0-img" class="champ-img"' + 
				'src="http://ddragon.leagueoflegends.com/cdn/6.2.1/img/champion/Ekko.png">' + 
				'<div class="spell1-img-div">' + '<img class="spell-img" ' + 
				'src="http://ddragon.leagueoflegends.com/cdn/6.3.1/img/spell/SummonerSnowball.png">' +
				'<img class="spell-img" ' + 
				'src="http://ddragon.leagueoflegends.com/cdn/6.3.1/img/spell/SummonerSnowball.png">' + 
				"</div><strong> " + 404 + " • " + 404 + 404 + " min " +
				404 + " s. • " + 404 + '</strong><br><h1 id="game-h1"> KDA: ' 
				+ 404 + " / " + '<font color="red">' + 404 + "</font>" + " / " + 404 
				+ ' • Gold: <font color="gold">' + 404 + "</font>" 
				 + "</h1>" +  "</div>");

		$.getJSON("https://euw.api.pvp.net/api/lol/euw/v1.3/game/by-summoner/23939878/recent?api_key="
		, function(data) {
			$("#api-body").hide();
			$("#api-article").append('<div id="loading-img"><img id"loading-image" src="loader-2.gif">'
			+ "</div>");
			
			$.each(data.games, function(i, object) {

				var time = object.stats.timePlayed / 60;
				var subTime = time.toString().split('.');

				games.push(object.gameId);
				
				if(subTime[1].length === 1)
					subTime[1] = subTime[1] * 10;
				else if(subTime[1].length >= 2)
					subTime[1] = subTime[1].substring(0, 2);

				if(object.stats.win)
					var result = '<font color="green"><strong>' + "Win</strong></font> in ";
				else
					var result = '<font color="red"><strong>' + "Lost</strong></font> in ";

				var day = new Date(object.createDate);

				var kills = object.stats.championsKilled;
				var deaths = object.stats.numDeaths;
				var assists = object.stats.assists;

				if(kills === undefined)
					kills = 0;
				if(deaths === undefined)
					deaths = 0;
				if(assists === undefined)
					assists = 0;

				var itmLink = ['<img class="item-img" '+
				'src="http://ddragon.leagueoflegends.com/cdn/6.3.1/img/item/', '.png">'];

				var itms = [object.stats.item0, object.stats.item1, object.stats.item2,
				object.stats.item3, object.stats.item4, object.stats.item5, object.stats.item6]

				var itmImg = [];

				for (var e = itms.length - 1; e >= 0; e--) {
					if(itms[e] != undefined)
					{
						if(e === itms.length - 1)
						{
							itmImg.push('<img id="item-img1" class="item-img" '+
								'src="http://ddragon.leagueoflegends.com/cdn/6.3.1/img/item/' 
								+ itms[e] + itmLink[1]);
						}
						else
						{
							itmImg.push(itmLink[0] + itms[e] + itmLink[1]);
						}
					}
				}

				$("#api-body").append('<div id="game-' + i + '" class="game">'
				+ '<img id="champ' + i + '-img" class="champ-img"' + 
				'src="http://ddragon.leagueoflegends.com/cdn/6.2.1/img/champion/Ekko.png">' + 
				'<div class="spell1-img-div">' + '<img id="spell' + i + '1-img" class="spell-img" ' + 
				'src="http://ddragon.leagueoflegends.com/cdn/6.3.1/img/spell/SummonerSnowball.png">' +
				'<img id="spell' + i + '2-img" class="spell-img" ' + 
				'src="http://ddragon.leagueoflegends.com/cdn/6.3.1/img/spell/SummonerSnowball.png">' + 
				"</div><strong> " + object.subType + " • " + result + subTime[0] + " min " +
				subTime[1] + " s. • " + day.toDateString() + '</strong><br><h1 id="game-h1"> KDA: ' 
				+ kills + " / " + '<font color="red">' + deaths + "</font>" + " / " + assists 
				+ ' • Gold: <font color="gold">' + object.stats.goldEarned + "</font>" 
				+ itmImg.join("")  + "</h1>" +  "</div>");

				$.getJSON("http://ddragon.leagueoflegends.com/cdn/6.2.1/data/en_US/champion.json"
				, function(champ) {
					$.each(champ.data, function(j, obj) {

						if(obj.key == object.championId)
						{
							var champImg = "http://ddragon.leagueoflegends.com/cdn/6.2.1/img/champion/"
							+ obj.id + ".png";
							$("#champ" + i + "-img").attr("src", champImg);
						}
					});
				});

				$.getJSON("http://ddragon.leagueoflegends.com/cdn/6.3.1/data/en_US/summoner.json"
				, function(spell) {
					$.each(spell.data, function(index, spellobj) {
						if(spellobj.key == object.spell1)
						{
							var spell1Img = "http://ddragon.leagueoflegends.com/cdn/6.3.1/img/spell/" 
							+ spellobj.id + ".png";
							$("#spell" + i + "1-img").attr("src", spell1Img);
						}
						if(spellobj.key == object.spell2)
						{
							var spell2Img = "http://ddragon.leagueoflegends.com/cdn/6.3.1/img/spell/" 
							+ spellobj.id + ".png";
							$("#spell" + i + "2-img").attr("src", spell2Img);
						}
					});
				});
			});
			$(".game-404").remove();
			setTimeout(function(){
				$("#api-body").show();
				$("#loading-img").remove();
			}, 3000);
			$(".game").click(function(){
				console.log("hej");
				for (var i = 10; i >= 0; i--) {
					if($(this).is("#game-" + i))
					{
						window.location = "http://matchhistory.euw.leagueoflegends.com/en/#match-details/EUW1/" 
						+ games[i] + "/28145265", "_blank";
					}
				}
			});
		});
	}

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

    	if($(this).is("#apileft"))
    	{
    		$(".api-menu").show(100);
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

    	if($(this).is("#apileft"))
    	{
    		$(".api-menu").hide(100);
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

	$(".api-menu").click(function()
	{
		if($("#api-article").css("display") == "none")
		{
			if($(this).is("#match-h"))
			{
				checkLeftDisplayedMenu();
				hideArticle();
				$("#api-article").show(2000);
				getMatchHistory();
				checkRightDisplayedMenu(0);
			}
		}
		if($("#api2-article").css("display") == "none")
		{
			if($(this).is("#compare-s"))
			{
				checkLeftDisplayedMenu();
				hideArticle();
				$("#api2-article").show(2000);
				checkRightDisplayedMenu(0);
			}
		}
	});

	$("#leftbar > section").click(function() 
	{
		if(!$(this).is("#apileft"))
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
		$("#api-article").hide(2000);
		$("#api2-article").hide(2000);
	}

	$("#feed-form").on("submit", function( event)
	{
		event.preventDefault();

		var newfeedback = document.getElementById("feedback").value;

		if(newfeedback != "")
		{
			$("#feed-p").html(sentence[5] + praise[index] + "<br>" + sentence[index] + 
				praise[index]);
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