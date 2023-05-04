class Game{	
	acceleration = [2, 2];
	autoIncrement = [0, 0];
	alua = [0, 0];
	assigning = null;
	automation = null;
	buttons = [0, 1];	
	increment = [1, 1];
	namedAlua = [];
	pics = [];
	rank = [1, 1];
	recipes = [];
	selected = [];
	special = null;
	prototypePic = null;
	template = null;
	uiga = [];
  constructor(){	
	  let dark = [], light = [];
    for (let x = 0; x< 4; x++){		
		let lightArr = [], darkArr = [];
		for (let y = 0; y < 4; y++){
			
			lightArr[y]=0;
			darkArr[y]=1;
		}
		light[x] =  lightArr.slice();
		dark[x] = darkArr.slice();
	}
	this.template = JSON.parse(JSON.stringify(light));
	this.prototypePic = JSON.parse(JSON.stringify(light));
	this.pics.push(JSON.parse(JSON.stringify(light)));
	this.pics.push(dark.slice());
	this.automation = setInterval (this.automate, 1000);
  }
 

	automate(){		
		let go = false;
		for (let i in game.alua){
			if (game.autoIncrement[i] > 0){
				for (let n =0; n < game.autoIncrement[i]; n++){
					game.make(i, true);
					go = true;
				}	
			}
		}
		if (go){
			ui.refresh();
		}
	}
  createAlua(){
	  let selected = this.selected;
	  
	  let recipeSearch = this.searchRecipes(selected);
	  if (recipeSearch != null){
		  this.special = namedAlua[recipeSearch];
	  } else {
		  //add a sound prompt
		  this.createNewAlua();
		 this.recipes.push(selected);
			$("#game").addClass('d-none');	
			$("#aluaDraw").removeClass('d-none');
		ui.drawCanvas();

	  }	  
	  for (let i of selected){
		  this.uiga.splice(this.uiga.indexOf(i), 1);
	  }
		this.selected = [];
  }
	createNewAlua(){
		 this.alua.push(0);
		 this.rank.push(1);
		this.increment.push(1);
		this.autoIncrement.push(0);
		this.acceleration.push(2);
	}
	
	doesThePrototypeMatchPics(){
		let allMatching = true, match = null;
		for (let i in this.pics){
			match = true;
			for (let x = 0; x < 4; x ++){
				for (let y = 0; y < 4; y ++){
					if (this.prototypePic[x][y] != this.pics[i][x][y]){

						match = false;
						break;
					}
				}
				if (!match){
					break;
				}

			}
			if (match){
				return true;
			}
		}
		return false;
	}
  make(id, auto){
		if (auto){
			this.alua[id]++;
		} else {				
			this.alua[id] += this.increment[id];
		}
	  if (this.alua[id] >= Math.pow(10, this.rank[id])){
		for (let i = 0; i < this.rank[id]; i++){
			this.uiga.push(id);  

		}		
		this.rank[id]++;

	  }
  }
  
	prestige(){
		for (let i in game.alua){
			game.alua[i] = 0;
		}
		for (let i in game.increment){
			game.increment[i]  = Math.round(game.increment[i] * .1 * 10) / 10;
		}
		for (let i in game.rank){		
			game.rank[i] = 1;			
		}
		for (let i in game.prestige){
			game.prestige[i] = 2;
		}
		//remove all uiga that are not part of the two buttons
	}
  
  searchRecipes(ingredients){
	let ingredient = null, match = false;
	for (let i in this.recipes){
		match = true;
		for (let ingredientPos of ingredients){
			ingredient = this.uiga[ingredientPos];
			match = ingredient == this.recipes[i];
			if (!match){
				continue;
			}
		}
		if (match){
			return i;
		}		
	}
	return null;
  }
  
  start(id){	 
		this.increment[this.uiga[id]]++;
		if(this.autoIncrement[this.uiga[id]] == 0){
			this.autoIncrement[this.uiga[id]] = 1;
		} else {
			this.autoIncrement[this.uiga[id]] *= this.acceleration[this.uiga[id]];
			this.acceleration[id] *= .95;
			
		}
		
		this.uiga.splice(this.uiga.indexOf(id), 1);
  }
}
