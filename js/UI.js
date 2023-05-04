class UI{

  constructor(){

  }
  
  
  refresh(){
	let html = '';
	for (let i of game.buttons){
		html += this.drawAlua(i);
	}
	$("#header").html(html);
	if (game.special != null){
		$("#special").removeClass('d-none');
		$("#special").html(this.drawAlua(game.special));
	}
	let txt = '';
	for (let i in game.alua){
		let increment = '';
		if (game.autoIncrement[i] > 0){
			increment += " [+" + game.autoIncrement[i] + "]";
		}
		if (game.increment[i] > 0 || game.alua[i] > 0){
			txt += "<div>" + this.drawSmall(i)  + "  " + game.alua[i].toLocaleString() 
				+ " / " + Math.pow(10, game.rank[i]).toLocaleString() + increment + "</div>";
		}
	}
	$("#aluaResources").html(txt);
	$("#createAluaDiv").addClass('d-none');
	$("#resetDiv").addClass('d-none');
	if (game.selected.length > 1){
		$("#createAluaDiv").removeClass('d-none');
	} 
	if (game.selected.length > 0){
		$("#resetDiv").removeClass('d-none');
	}
	txt = "";

	for (let i in game.uiga){		
		txt += this.drawUiga(i);
	}
	$("#uigaResources").html(txt);
	this.populateAluaMaker();
	
  }
  
  back(){
	  $("#game").removeClass('d-none');
	$("#lastPrestige").addClass('d-none');
  }

  drawAlua(id){
	  let selectedClass ='';
	if (game.assigning != null){
		selectedClass = ' selected ';
	}
	  let darkClass='', html = "<div id='alua-" + id + "' class='alua" + selectedClass + "'>";
	  for (let y = 0; y < 4; y ++){
		  html += "<div>";
		  for (let x = 0; x < 4; x ++){
			  darkClass = '';
			  if (game.pics[id][x][y] == 1){
				  darkClass = ' dark ';
			  }
			  html += "<div class='big" + darkClass + "'>&nbsp;</div>";
		  }
		  html += "</div>";
	  }
	  html += "</div>";
	  return html;
		  
  }

	drawCanvas(){
		let html = '';
		for (let y = 0; y < 4; y ++){
			html += "<div class='y'>"
			for (let x = 0; x < 4; x++){
				html += "<div id='cell-" + x + "-" + y + "' class='cell'>&nbsp;</div>";			
			}
			html += "</div>";
		}
		html += "<button id='ready' class='btn btn-outline-dark form-control mt-3 d-none'>&nbsp;</button>";
		$("#aluaDraw").html(html);
	}
  
    drawUiga(id){	  
		let selectedClass = '';
		if (game.selected.includes(id)){
			selectedClass = ' selected ';
		}
	  let darkClass='', html = "<div id='uiga-" + id + "' class='uiga " + selectedClass + "' >";
	  
	  for (let y = 0; y < 4; y ++){
		  html += "<div >";
		  for (let x = 0; x < 4; x ++){
			  darkClass = ' ';
			  if (game.pics[game.uiga[id]][x][y] == 1){
				  darkClass = ' dark ';
			  }
			  html += "<div class='small" + darkClass + "'  ></div>";
		  }
		  html += "</div>";
	  }
	  html += "</div>";
	  return html;
		  
  }

drawSmall(id){
	  let darkClass='', html = "<div class='icon'>";
	  if (game.pics[id] == undefined){
		  echo ('error');
		  return;
	  }
	  for (let y = 0; y < 4; y ++){
		  html += "<div >";
		  for (let x = 0; x < 4; x ++){
			  darkClass = ' ';
			  
			  if (game.pics[id][x][y] == 1){
				  darkClass = ' dark ';
			  }
			  html += "<div class='small" + darkClass + "'  ></div>";
		  }
		  html += "</div>";
	  }
	  html += "</div>";
	  return html;
}	
  
  populateAluaMaker(){	
	let selectHTML = "", selected=[];
	

	for (let slotNum = 1; slotNum < 5; slotNum++){		
		selectHTML = "<option></option>";
		selected [slotNum] = null;
		if ($("#slot" + slotNum).val() != ""){
			selected[slotNum] = $("#slot"+slotNum).val();
		}
		for (let i in game.uiga){
			if (!selected.includes(i) && slotNum != selected.indexOf(i)){
				selectHTML += "<option val='" + i + "'>" + game.uiga[i] + "</option>";
			} else if (selected.includes(i) && slotNum == selected.indexOf(i)){
				selectHTML += "<option val='" + i + "' selected>" + game.uiga[i] + "</option>";
			}
		}	
		$("#slot" + slotNum ).html(selectHTML);
	}
	
	

  }
}
