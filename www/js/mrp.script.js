var config=new Object();
config.version="0.4"
config.url="https://trakcarelabwebview.nhls.ac.za/trakcarelab/";
config.urldefault=url+"default.htm";

var url="https://trakcarelabwebview.nhls.ac.za/trakcarelab/";
var urldefault=url+"default.htm";
var urllogon=url+"csp/logon.csp?LANGID=1";
var urllogonwun=urllogon+"&USERNAME=";
//var urllogonwunpwd=urllogonwun+'&PASSWORD=';
//var urllogonwunpwd=url+'csp/logon.csp?USERNAME=demo&PASSWORD=demo&LANGID=1&DEPARTMENT=AUSTINED';
var urlemailto="mailto:support@iscpoc.co.za";

function buildLogonURI() {
	//Init the logon button href
	var username=$('#username').val();
	//TODO: validate username 
	//alert(url);
	//alert(urllogonwun+'\n'+username);
	uri=encodeURI(urllogonwun+username);
	
	return uri;
}

function initFromStorage(){
	if (window.localStorage) {
	    if (localStorage.length) {
			var username=JSON.parse(localStorage.getItem('settings')).username;
			$('#username').val(username);

			var accepted=JSON.parse(localStorage.getItem('settings')).tandcaccepted;
			$('#checkboxtandc').prop('checked',accepted);
			//alert($('#checkboxtandc').checked);
	    }
	}
}

function buildAppVersion(){
	var html = "";
	  html = html + "<li>" + 'Version: ' + config.version + "</li>";
	  $("#appVersion").html(html);
}

function buildDeviceProperties(){
	var html = "";
	if (window.device) {
		alert("buildDeviceProperties device object available!");
  	  	html = html + "<li>" + 'Device Name: ' + device.name + "</li>";
  	  	html = html + "<li>" + 'Device Cordova: ' + device.cordova + "</li>";
  	  	html = html + "<li>" + 'Device Platform: ' + device.platform + "</li>";
  	  	html = html + "<li>" + 'Device UUID: ' + device.uuid + "</li>";
	}else{
		//alert("buildDeviceProperties device object NOT available!");
  	  	html = html + "<li>Device properties not available.</li>";
	}
	$("#deviceProperties").html(html);
}

function sendMail(){
	//TODO --------
	//"mailto:support@iscpoc.co.za?subject=NHLS%20TrakCare%20Lab%20Webview%20User%20Registration&body=First name:%0D%0ALast name:">
	
	var subject="NHLS TrakCare Lab Webview User Registration";
	var title=$("#title").val();
	var firstName=$("#firstname").val();	
	var surname=$("#surname").val();	
	var mobile=$("#mobile").val();	
	var gender=$("#gender").val();	
	var email=$("#email").val();	
	var natId=$("#natid").val();	
	
	//var uri=urlemailto+"mailto:support@iscpoc.co.za?subject=NHLS%20TrakCare%20Lab%20Webview%20User%20Registration&body=First name:%0D%0ALast name:">
    /*
				<div style="padding:10px 20px;">
					<label for="title" class="ui-hidden-accessible">Title</label>
						<select name="title" id="title">
							<option value="Dr">Dr</option>
							<option value="Miss">Miss</option>
							<option value="Mr">Mr</option>
							<option value="Mrs">Mrs</option>
							<option value="Ms">Ms</option>
							<option value="Prof.">Prof.</option>
							<option value="Sr">Sr</option>
					</select>
               		<label for="fn" class="ui-hidden-accessible">First name:</label>
            		<input type="text" name="fn" id="fn" value="" placeholder="firstname" data-theme="a">
               		<label for="sn" class="ui-hidden-accessible">Surname:</label>
            		<input type="text" name="sn" id="sn" value="" placeholder="surname" data-theme="a">
            		<label for="mobile" class="ui-hidden-accessible">Mobile:</label>
            		<input type="tel" name="mobile" id="mobile" value="" placeholder="mobile" data-theme="a">
					<label for="gender" class="ui-hidden-accessible">Gender</label>
               		<label for="email" class="ui-hidden-accessible">Email:</label>
            		<input type="email" name="email" id="email" value="" placeholder="email" data-theme="a">
					<label for="gender" class="ui-hidden-accessible">Gender</label>
					<select name="gender" id="gender">
						<option value="female">female</option>
						<option value="male">male</option>
					</select>
            		<b
	*/
}
				
$(document).ready(function() {
	// Stuff to do as soon as the DOM is ready;
	//alert("Pre initFromStorage");
	initFromStorage();
	
	//Init the default button href
	uri=encodeURI(urldefault);
	$('#buttondefault').prop('href',uri);

	uri=encodeURI("https://trakcarelabwebview.nhls.ac.za/trakcarelab/WWW NHLS Terms and conditions Ver 1 0.htm");
	$('#buttontandc').prop('href',uri);

	//Init the logon button href
	uri=buildLogonURI();
	$('#buttonlogon').prop('href',uri);
	
	//$('#buttonlogon').click(function(event) {
	$('#buttonlogon').on( "click", function( event ) {
	 	// Prevent the usual navigation behavior
		event.preventDefault();
	  	
		//alert(event);
 
		uri=buildLogonURI();
		//alert(uri);
		window.open(uri,'_self');
	});

	buildAppVersion();
	buildDeviceProperties();

	$('#username').on( "change", function( event ) {
	 	// Prevent the usual navigation behavior
		event.preventDefault();

		username=$('#username').val();
		
		// Store an object using JSON
		localStorage.setItem('settings', JSON.stringify({username: username}));
		//alert(JSON.parse(localStorage.getItem('settings')).username); // value
		
	});

	//$('#checkboxtandc').on( "change", 'input[type=checkbox]', function( event ) {
	$('#checkboxtandc').on( "change", function( event ) {
	  	// Prevent the usual navigation behavior
		event.preventDefault();
		
		var accepted=this.checked;
		
		// Store an object using JSON
		localStorage.setItem('settings', JSON.stringify({tandcaccepted: accepted}));
		//alert(JSON.parse(localStorage.getItem('settings')).tandcaccepted); // value
	});


});


