
var strExif;

function getExif()
{

	document.write(strExif);
}
function loadPage()
{
	//var xmlhttp;
	let xmlhttp = new XMLHttpRequest();
	//if(document.getElementById(original_image).getAttribute("src") = "images/uplaod_image.jpg") { getExif();}
	
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			let str = xmlhttp.getResponseHeader("result_image");
			document.getElementById("original_image").setAttribute("src", str);
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
	let str = document.getElementById("original_image").src;
	window.location.href = str;
	
}

function displayImage()
{
	let str = "<img id=\"original_image\" style=\"height=100%\" src = \"" + localStorage.getItem("result_image") + "\" alt = \"images/uplaod_image.jpg\" hieght=100% onclick=\"showOriginal()\"/>" 
	str = "<div class=\"row\"> <div class=\"col-sm-12\">" + str + "</div></div><div class=\"row\"><div class=\"col-sm-12\">" + localStorage.getItem("meta_data") + "</div></div>";
    document.write(str);
}
function showOriginal()
{
	let str = document.getElementById("original_image").src;
	window.location.href = str;
}