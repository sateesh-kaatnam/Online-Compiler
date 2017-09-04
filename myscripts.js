//Making AJAX call to the server
$(document).ready(function () {
$("#Run").click(function(){
	var editor = ace.edit("editor");
	var srcCode=(editor.getValue());
	var lang=getLanguage();
	var inputs=getInputs();
	if(srcCode!=""){
	$.ajax({
		    url: 'server.php',
    		type: "POST",
    		dataType: "json",
    		data: {
      			code: srcCode,
      			lang: lang,
      			input: inputs 
        		},
    		success: function (response) {

    			displayOutput(response);
    			
        	},
    		 error: function(error){
         		console.log("Something went wrong", error);
    		 }
		});
	}
	else{
		alert("Please Provide Source Code");
	}

});
});

//Displays the output to the user.
function displayOutput(response){
	
	if(response.result.compilemessage=="")
		$("#stdout").text(response.result.stdout[0]);
	else{
		var output="";
		output=decodeURIComponent(escape(response.result.compilemessage));	
		$("#stdout").text(output);
			
	}
}

//Return the integer as per selected language
function getLanguage(){
	var lang=document.getElementById("language").value;
	switch(lang){
		case "C":
			lang=1;
			break;
		case "C++":
			lang=2;
			break;
		case "Java":
			lang=3;
			break;
		case "Python":
			lang=5;
			break;
	}
	return lang;
}

//Returns the inputs of user
function getInputs(){
	var testCases=[]
	testCases[0]=document.getElementById("input").value;
	if(testCases.length==-1)
		testCases.push(" ");
	return JSON.stringify(testCases)
}

function selectLanguage(){

	var language=document.getElementById("language").value;
	switch(language){
		case "C":
			language="c_cpp";
			break;
		case "C++":
			language="c_cpp";
			break;
		case "Java":
			language="java";
			break;
		case "Python":
			language="python";
			break;
	}
	editorThemeChange(language);
}

//Change editor mode as per selected language
function editorThemeChange(lang){
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/"+lang);
}

// Display text during ajax call
$(document).ready(function () {
    $(document).ajaxStart(function () {
        $("#stdout").text("Compiling Please Wait..!");
    });
});


$(function(){
    $('#save').click(function() {
        saveTextAsFile();
    });
});

//Returns extension for file as per selected language
function getExtension(){
var language=document.getElementById("language").value;
switch(language){
	case "C":language=".c"
		 break;
	case "C++":language=".cpp"
		 break;
	case "Java":language=".java"
		 break;	 	 
	case "Python":language=".py"
		 break;	
	}
return language;
}

//To save the code written.
function saveTextAsFile()
{
    var editor = ace.edit("editor");
    var textToWrite = (editor.getValue());;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = "srccode"+getExtension();

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.URL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}