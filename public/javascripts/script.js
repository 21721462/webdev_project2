/*Adds specified friend name to friends list */
function seachfriend() 
{
    var list = document.getElementById("friendslist");
    document.getElementById("friendadd").style.backgroundColor = "white";
    if (document.getElementById("friendadd").value == "")
    {
    	alert("You must input friend username.");
    	document.getElementById("friendadd").style.backgroundColor = "red";
    	return false;
    }

  	
    var currcol1 = genRandColor();

  	var element = document.createElement("li");
    element.style.backgroundColor = currcol1;
    element.setAttribute("class","grow");
  	var text = document.createElement("p");
  	var slideitem = document.createElement("img");
  	slideitem.setAttribute("src","users.png");
  	var uname = document.createTextNode(document.getElementById("friendadd").value);
  	text.appendChild(uname);
  	element.appendChild(slideitem);
  	element.appendChild(text);
  	list.appendChild(element);

    
    
    return false; 
}	

/*Matches a random friend */
function matchfriend() 
{
    var list2 = document.getElementById("friendslist");
    
   

    var a = ["Cool", "Dragon", "Blue", "Cow", "Meme"];
	var b = ["Bear", "Dog", "Banana", "Dude", "Ship"];

	var rA = Math.floor(Math.random()*a.length);
	var rB = Math.floor(Math.random()*b.length);
	var name = a[rA] + b[rB];
  	
  var currcol2 = genRandColor();

  	var element = document.createElement("li");
    element.style.backgroundColor = currcol2;
    element.setAttribute("class","grow");
    var text = document.createElement("p");
  	var slideitem = document.createElement("img");
  	slideitem.setAttribute("src","users.png");
  	var uname = document.createTextNode(name);
    text.appendChild(uname);
  	element.appendChild(slideitem);
  	element.appendChild(text);
  	list2.appendChild(element);

}

/*Generates a random color for friends list*/
function genRandColor(){
  var col = ["rgb(135,206,250)", "rgb(240,248,255)", "rgb(25,25,112)", "lightblue"];
  var k = Math.floor(Math.random()*col.length);
  var rcol = col[k];
  return rcol;
}