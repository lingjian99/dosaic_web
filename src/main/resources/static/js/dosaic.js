///////////////////////////select a file///////////////////////////////////
//the choose file btn is clicked
function chooseFile(){

    document.getElementById("progressor").innerHTML = "0%";
    document.getElementById("files").click();          
}

//read basic the file information when a file is selected
function fileChanged(){

    let currFile = document.getElementById('files').files[0];
    if (currFile) {    
        var size;
        if(currFile.size<2048*1024){

            if (currFile.size > 1024 * 1024){
                size = (Math.round(currFile.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';   
        
            }else {  
                size = (Math.round(currFile.size * 100 / 1024) / 100).toString() + 'KB';   
            }

            let str = getObjectURL(currFile);
    
            document.getElementById("dosaic_image").setAttribute("src", str);
            document.getElementById("upload").removeAttribute("disabled");
            let strFileInfo = "<p style='font-size: 16px; color: yellow;'>File Infomation:</p>File: " + currFile.name;
            strFileInfo += "<br>File Size: " + size;        
            //document.getElementById("fileInfo").innerHTML=strFileInfo;
            startUploading();
        } else{
            alert("Image file need to be less than 2 MB!");
        }
    } 

}


function startUploading() {

    
    if(document.getElementById('files').files.length==0){
        alert("Please choose at least one file and try!!");
        return;
    }

    document.getElementById("proDiv").style.display="inline-block";
    uploadFile();

}
function getObjectURL(file) {  
    var url = null ;   
    if (window.URL!=undefined) {   
        url = window.URL.createObjectURL(file) ;  
    } else if (window.webkitURL!=undefined) {  
        url = window.webkitURL.createObjectURL(file) ;  
    }  
    return url ;  
}  

var fileSize;
function uploadFile() {
    
    let file = document.getElementById('files').files[0];
    fileSize = file.size;
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    fd.append("multipartFile", file);
    xhr.upload.addEventListener("progress", onUploadProgress, false);
    xhr.addEventListener("load", onUploadComplete, false);
    xhr.addEventListener("error", onUploadError, false);
    xhr.open("POST", "fileupload");
    xhr.send(fd);

        
}
function loadImage(){
    var imgDiv=document.getElementById("imageDiv");
    var rHeight=document.getElementById("rowHeight");
    rHeight.style.height = imgDiv.clientHeight.toString()+"px";
}

    /* This function will call when upload is completed */
function onUploadComplete(e, error) {
    if(error){
      // TODO document why this block is empty
        system.out.print(e.error);

    }else{
        document.getElementById("upload").setAttribute("disabled", false);
        document.getElementById("go_dosaic").removeAttribute("disabled");
        document.getElementById("proDiv").style.display="none";
        getExif();
    }
}
 /* This function will continueously update the progress bar */
 function onUploadProgress(e) {
    if (e.lengthComputable) {
        var percentComplete = parseInt((e.loaded) * 100 / fileSize);
        document.getElementById("progressor").innerHTML = percentComplete.toString()+"%";
    } else {
        document.getElementById("upload").setAttribute("disabled", false);
        document.getElementById("go_dosaic").setAttribute("disabled", false);
        alert('upload failed! error 0101:');
    }
}

/* This function will call when an error come while uploading */
function onUploadError(e) {
    console.error("Something went wrong! error: 0102");
    onUploadComplete(e,true);
}
  
function getExif()
{

	
	let xmlhttp = new XMLHttpRequest();
	//if(document.getElementById(dosaic_image).getAttribute("src") = "images/uplaod_image.jpg") { getExif();}
	
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{

			let str = xmlhttp.getResponseHeader("meta_data");
            setExif(str);
            
            str = xmlhttp.getResponseHeader("result_image");
            setDosaicImage(str);

		} else if(xmlhttp.readyState==3){
          // TODO document why this block is empty
           
        }
	}

	xmlhttp.open("POST","exif",true);
    xmlhttp.send();

}

function setDosaicImage(file){
    document.getElementById("dosaic_image").setAttribute("src", file);
}

function setExif(exif){
    document.getElementById("fileInfo").innerHTML += exif;
}

//to display information in HTML
function htmlExif()
{
    let str=document.getElementById("dosaic_image").src;
    let ind=str.indexOf("uplaod_image.jpg");

    if(ind>=0){
        //document.write("<p>No image picked!</p>")
    }
    else{
        document.write(strFileInfo);
    }
}

function showOriginal()
{
	let str = document.getElementById("dosaic_image").src;
	window.location.href = str;
}

function topBar()
{

	document.write(
		'<div class="navbar fixed-top navbar-expand-lg navbar-light bg-warning">'+
		'<a><i class="fa-solid fa-burger" style="font-size: 24px; color: rgb(200, 100, 20); text-align: left;"></i> &nbsp;<i class="fa-solid fa-mug-hot" style="font-size: 20px; color: rgb(34, 104, 110); align-self: left;"></i></a>'+
			'<a class="navbar-brand" href="#">&nbsp &nbsp无处安放的猪</a>'+
			'<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">'+
				'<span class="navbar-toggler-icon"></span></button>'+
			'<div class="collapse navbar-collapse" id="navbarSupportedContent">'+
				'<ul class="navbar-nav ml-auto topnav"><li class="nav-item active">'+
						'<a class="nav-link" href="index.html"><i class="fa-solid fa-house-chimney-window"></i> Home </a></li><li class="nav-item">'+
						'<a class="nav-link" href="aboutme.html"><i class="fa-regular fa-envelope"></i> Contact</a>'+
					'</li></ul></div></div>'
	)
}

function go_dosaic(){
    document.getElementById("go_dosaic").setAttribute("disable", "false");
    window.open("/go_dosaic"); //, "xxxx","toolbar=no,location=no,directories=no,menubar=no, scrollbars=no,resizable=yes,status=no,top=0,left=0")
}