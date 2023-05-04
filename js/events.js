$(document).on('click', '#createAlua', function(e){
	game.createAlua();
});



$(document).on('click', '#back', function(e){
	ui.back();
});

$(document).on('click', '.cell', function(e){
	let x = e.target.id.split('-')[1], y = e.target.id.split('-')[2];
	if (!$(this).hasClass('dark')){
		$(this).addClass('dark');
		game.prototypePic[x][y] = 1;
	} else {
		$(this).removeClass('dark');
		game.prototypePic[x][y] = 0;
	}
	console.log(game.doesThePrototypeMatchPics(), game.prototypePic, game.pics);
	$("#ready").addClass('d-none');
	if (!game.doesThePrototypeMatchPics()){
		$("#ready").removeClass('d-none');
	}
});

$(document).on('click', '.alua.selected', function(e){
	let oldID = Number(e.currentTarget.id.split('-')[1]);
	console.log(oldID, game.buttons, game.buttons.indexOf(oldID));
	game.buttons.splice(game.buttons.indexOf(oldID), 1);
	console.log(oldID, game.buttons);
	game.buttons.push(game.assigning);
	game.assigning = null;
	$("#body").removeClass('d-none');
	ui.refresh();
});

$(document).on('click', '.alua:not(.selected)', function(e){
	let aluaName = e.currentTarget.id.split('-')[1];
	game.make(aluaName, false);
	ui.refresh();
})

$(document).on('click', '.uiga', function(e){
	let uigaID = e.currentTarget.id.split('-')[1];
	if (!game.selected.includes(uigaID)){
		game.selected.push(uigaID);
		ui.refresh();
		return;
	}	
	game.selected = [];
	game.start(uigaID);
	ui.refresh();
});

$(document).on('click', '#prestige', function(e){
	$("#game").addClass('d-none');
	$("#lastPrestige").removeClass('d-none');

});

$(document).on('click', '#prestigeConfirmed', function(e){
	console.log('hello');
	game.prestige();
	ui.back();
});

$(document).on('click', '#ready', function(e){
	game.pics.push(game.prototypePic.slice());
	game.prototypePic = null;
	console.log(game.prototypePic);
	game.prototypePic = game.template.slice();
	console.log(game.prototypePic);
	game.assigning = game.alua.length - 1;
	$("#aluaDraw").addClass('d-none');
	$("#game").removeClass('d-none');
	$("#body").addClass('d-none');
});


$(document).on('click', '#reset', function(e){
	game.selected = [];

});


$(document).on('click', 'button:not(#createAlua)', function(e){
  ui.refresh()
})
