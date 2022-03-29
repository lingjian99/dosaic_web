var xmlhttp;
function load()
{
    getImageMeta();

}

function getImageMeta()
{
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			let str = xmlhttp.responseText;
			

			let json = JSON.parse(str);
			document.getElementById("file_meta").innerHTML = json.MetaDate;
			str = json.File;
			document.getElementById("original_image").setAttribute("src", str);
			
			//showOriginal();
           
		}else if(xmlhttp.readyState==3){
            
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