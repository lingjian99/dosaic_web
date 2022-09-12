/* Globle variables */
var fileSize, fileType;


function startUploading() {

    var files = document.getElementById('files').files[0];
    if(files.length==0){
        alert("Please choose at least one file and try!!");
        return;
    }

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


function uploadFile() {
    
    let file = document.getElementById('files').files[0];
    fileSize = file.size;
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    fd.append("multipartFile", file);
    xhr.upload.addEventListener("progress", onUploadProgress, false);
    xhr.addEventListener("load", onUploadComplete, false);
    xhr.addEventListener("error", onUploadError, false);
    xhr.open("POST", "/fileupload");
    xhr.send(fd);
        
}

    /* This function will call when upload is completed */
function onUploadComplete(e, error) {
    if(error){

        }
    else{
            getExif();

        }

}
 /* This function will continueously update the progress bar */
 function onUploadProgress(e) {
    if (e.lengthComputable) {
        var loaded = e.loaded;
        var percentComplete = parseInt((loaded) * 100 / fileSize);

        
        if(percentComplete <= 100){
            
            document.getElementById("progress_bar").style.width = percentComplete.toString()+"%";
        }
    } else {
        alert('unable to compute, error 0101:');
    }
}

/* This function will call when an error come while uploading */
function onUploadError(e) {
    console.error("Something went wrong! error: 0102");
    onUploadComplete(e,true);
}
  


///////////////////////////select a file///////////////////////////////////
//the choose file btn is clicked
function chooseFile(){

    var bar = document.getElementById("progress_bar");
    bar.style.width="0%";

    document.getElementById("files").click();          
}

//a file is selected
function fileChange(){

    let file = document.getElementById('files').files[0];
    if (file) {    

        let fileSize = 0;
        if (file.size > 1024 * 1024){
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';   
            if(fileSize>=5){
                alert("File size can not great than 5MB");
                document.getElementById("do_dosaic").removeAttribute("disabled");
                return;
            }
        }
        else {  
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';   
        }
        let str = getObjectURL(file);
        document.getElementById("original_image").setAttribute("src", str);
        document.getElementById("do_dosaic").removeAttribute("disabled");
    } 
    else{
        document.getElementById("do_dosaic").removeAttribute("disabled");
        alert("Can't open the file!");
    }
}


function getExif()
{

	//var xmlhttp;
	let xmlhttp = new XMLHttpRequest();
	//if(document.getElementById(original_image).getAttribute("src") = "images/uplaod_image.jpg") { getExif();}
	
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            localStorage.clear();
			let str = xmlhttp.getResponseHeader("meta_data");
            localStorage.setItem("meta_data", str); 			
            str = xmlhttp.getResponseHeader("result_image");
            
            localStorage.setItem("result_image", str);

			window.location.href = "dosaic"; 
		}
		else if(xmlhttp.readyState==3){
            
        }
	}

	xmlhttp.open("POST","exif",true);
	
    xmlhttp.send();

}