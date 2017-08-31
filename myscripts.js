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
	
	if(response.result.compilemessage=="" && response.result.message[0]=="Success")
		$("#stdout").text(response.result.stdout[0]);
	else{
		var output="";
		if(response.result.message){
			output=response.result.message[0]+"\n"+response.result.stderr[0];
			$("#stdout").text(output);
		}
		else{
			output=decodeURIComponent(escape(response.result.compilemessage));	
			$("#stdout").text(output);
			}
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
//Returns the language selected to the ACE editor mode function.
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
