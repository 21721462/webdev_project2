
/* This function operates the slideshow */

var index = 1;

function changeslide(val) {
  startslide(index += val);
}

function startslide(val) {
  var slides = document.getElementsByClassName("slideitem");
  if (val < 1) 
  {
    index = slides.length
  }
  if (val > slides.length) 
  {
    index = 1
  }    
  for (var i = 0; i < slides.length; i++) 
  {
    slides[i].style.display = "none";  
  }
  
  slides[index-1].style.display = "block";  
 
}

/* These functions operate the time elements in footer*/
function timefunc()
{
	var time = new Date();
	var period = time.getHours() < 12 ? ' AM' : ' PM';
	var minutes = time.getMinutes() < 10 ? '0' : '';
	var seconds = time.getSeconds() < 10 ? '0' : '';
	
		document.getElementById("time").innerHTML = "Current Time:" + (time.getHours()-12) + ":"+ minutes + time.getMinutes() + ":"+ seconds + time.getSeconds() + period;

		var temptime = setTimeout(timefunc, 500);
}

function modtimefunc() 
{
	var mtime = new Date(document.lastModified)

	var mperiod = mtime.getHours() < 12 ? ' AM' : ' PM';
	var mminutes = mtime.getMinutes() < 10 ? '0' : '';
	var mseconds = mtime.getSeconds() < 10 ? '0' : '';

	document.getElementById("modtime").innerHTML = "Last Modification Time:" + mtime.getDate() + "/" + mtime.getMonth() + "/" + mtime.getFullYear() + " " + (mtime.getHours()-12) + ":"+ mminutes + mtime.getMinutes() + ":"+ mseconds + mtime.getSeconds() + mperiod;
}

function initime()
{
	timefunc();
	modtimefunc();
  startslide(index);
}

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

/*Checks the registration form */
function formcheck()
{

  var utemp = document.getElementsByName("uname")[0].value;
  var ptemp = document.getElementsByName("pword")[0].value;
  var cptemp = document.getElementsByName("pword")[1].value;
  var etemp = document.getElementsByName("email")[0].value;
  var cetemp = document.getElementsByName("email")[1].value;
  var atemp = document.getElementsByName("age")[0].value;

  if (/^\w{3,10}$/.test(utemp) == false)
  {
    document.getElementsByName("uname")[0].value = "Invalid Username.";
    document.getElementsByName("uname")[0].style.backgroundColor = "red";
  }

  if(/^\w{6,12}$/.test(ptemp) == false)
  {
    alert("Invalid Password.");
    document.getElementsByName("pword")[0].style.backgroundColor = "red";
  }


  if (ptemp != cptemp) 
  {
    alert("Passwords do not match.");
    document.getElementsByName("pword")[1].style.backgroundColor = "red";

  }

  if (etemp != cetemp)
  {
    document.getElementsByName("email")[1].value = "The email's do not match.";
    document.getElementsByName("email")[1].style.backgroundColor = "red";
  }

  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(atemp) == false)
  {
    alert("Please enter valid birthdate.")
    atemp.style.backgroundColor = "red";
  }

  if (inspectbox() != true)
  {
    alert("You must select at least one game.")
  }

  return false; 
} 

/*Inspects if at least one box is selected*/
function inspectbox() 
{
  var cboxtemp = document.getElementsByClassName("cbox");
  for (var j = 0; j < cboxtemp.length; j++)
  {
    if (cboxtemp[j].checked == true)
    return true;
     else
    {
       return false;
    }
  }
}

/*Shows/Hides password*/
var visible = 0;
function showpass() {
    if (visible == 0)
    {
      document.getElementsByName("pword")[0].setAttribute('type','text');
      visible = 1;
    }
    else 
    {
      document.getElementsByName("pword")[0].setAttribute('type','password');
      visible = 0;
    }
  }