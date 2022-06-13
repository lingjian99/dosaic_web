
var strExif;

function getExif()
{

	document.write(strExif);
}
function loadPage()
{
	//var xmlhttp;
	let xmlhttp = new XMLHttpRequest();
	//if(document.getElementById(dosaic_image).getAttribute("src") = "images/uplaod_image.jpg") { getExif();}
	
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			let str = xmlhttp.getResponseHeader("result_image");
			document.getElementById("dosaic_image").setAttribute("src", str);
			str = xmlhttp.getResponseHeader("meta_data");
			strExif= "<div calss=\"row\"> <div class=\"col-sm-12\">" + str + "</div></div>"
			
		}
		else if(xmlhttp.readyState==3){
            
        }
	}

	xmlhttp.open("POST","exif",true);
	
    xmlhttp.send();

}
function showOriginal()
{
	let str = document.getElementById("dosaic_image").src;
	window.location.href = str;
	
}

function displayImage()
{
	let str = "<img id=\"dosaic_image\" style=\" max-width: 100%; height: auto; width: auto; \" src = \"" + localStorage.getItem("result_image") + "\" alt = \"images/uplaod_image.jpg\" onclick=\"showOriginal()\"/>" 
	str = "<div class=\"row\"> <div class=\"col-sm-12\">" + str + "</div></div><div class=\"row\"><div class=\"col-sm-12\">" + localStorage.getItem("meta_data") + "</div></div>";
    document.write(str);
}
function showOriginal()
{
	let str = document.getElementById("dosaic_image").src;
	window.location.href = str;
}

function topBar()
{

	document.write(
		'<div class="navbar fixed-top navbar-expand-lg navbar-light bg-warning">\
		<a><i class="fa-solid fa-burger" style="font-size: 24px; color: rgb(200, 100, 20); text-align: left;"></i> &nbsp;<i class="fa-solid fa-mug-hot" style="font-size: 20px; color: rgb(34, 104, 110); align-self: left;"></i></a>\
			<a class="navbar-brand" href="#">&nbsp &nbsp无处安放的猪</a>\
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\
				<span class="navbar-toggler-icon"></span>\
			</button>\
			<div class="collapse navbar-collapse" id="navbarSupportedContent">\
				<ul class="navbar-nav ml-auto topnav">\
					<li class="nav-item active">\
						<a class="nav-link" href="index.html"><i class="fa-solid fa-house-chimney-window"></i> Home </a>\
					</li>\
					<li class="nav-item">\
						<a class="nav-link" href="aboutme.html"><i class="fa-regular fa-envelope"></i> Contact</a>\
					</li>\
				</ul>\
			</div>\
		</div>'
	)
}