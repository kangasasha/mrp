/* Change history
Version	Date			Description
0.4.1	24 Mar 2014		Corrected spelling in T&Cs link description.
*/
//TODO: Complete config design and implementation
var config=new Object();
config.version="0.4.2"
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
	var uri=encodeURI(urllogonwun+username);
	
	return uri;
}

function initFromStorage(){
	if (window.localStorage) {
	    if (localStorage.length) {
			var username=JSON.parse(localStorage.getItem('settings')).username;
			$('#username').val(username);

			var accepted=JSON.parse(localStorage.getItem('settings')).tandcaccepted;
			$('#checkboxtandc').prop('checked',accepted);
	    }
	}
}

function buildAppVersion(){
	var html = "";
	html+="<li>"+"Version: "+config.version+"</li>";
	$("#appVersion").html(html);
}

function buildDeviceProperties(){
	var html = "";
	alert(window.device);
	if (window.device) {
  	  	html = html + "<li>" + 'Device Name: ' + device.name + "</li>";
  	  	html = html + "<li>" + 'Device Cordova: ' + device.cordova + "</li>";
  	  	html = html + "<li>" + 'Device Platform: ' + device.platform + "</li>";
  	  	html = html + "<li>" + 'Device UUID: ' + device.uuid + "</li>";
	}else{
  	  	html = html + "<li>Device properties not available.</li>";
	}
	$("#deviceProperties").html(html);
}

function sendEmail(){
	var subject="NHLS TrakCare Lab Webview User Registration";
	var title=$("#title").val();
	var firstname=$("#firstname").val();	
	var surname=$("#surname").val();	
	var gender=$("#gender").val();	
	var mobile=$("#mobile").val();	
	var email=$("#email").val();	
	//var natId=$("#natid").val();	
	
	var body="Title:"+title+"\r\n";
	body+="First name:"+firstname+"\r\n";
	body+="Surname:"+surname+"\r\n";
	body+="Gender:"+gender+"\r\n";
	body+="Mobile:"+mobile+"\r\n";
	body+="Email:"+email+"\r\n";

    var uri="mailto:support@iscpoc.co.za";
	uri+="?subject="+encodeURIComponent(subject);
	uri+="&body="+encodeURIComponent(body);
	
	window.location.href=uri;
}
				
$(document).ready(function() {
	// Stuff to do as soon as the DOM is ready;
	//alert("Pre initFromStorage");
	initFromStorage();
	
	//Init the default button href
	var uri=encodeURI(urldefault);
	$('#buttondefault').prop('href',uri);

	var uri=encodeURI("https://trakcarelabwebview.nhls.ac.za/trakcarelab/WWW NHLS Terms and conditions Ver 1 0.htm");
	$('#buttontandc').prop('href',uri);

	//Init the logon button href
	var uri=buildLogonURI();
	$('#buttonlogon').prop('href',uri);
	
	//$('#buttonlogon').click(function(event) {
	$('#buttonlogon').on( "click", function( event ) {
	 	// Prevent the usual navigation behavior
		event.preventDefault();
	  	
		var uri=buildLogonURI();
		window.open(uri,'_self');
	});

	buildAppVersion();
	buildDeviceProperties();

	$('#username').on( "change", function( event ) {
	 	// Prevent the usual navigation behavior
		event.preventDefault();

		var username=$('#username').val();
		// Store an object using JSON
		localStorage.setItem('settings', JSON.stringify({username: username}));
	});

	//$('#checkboxtandc').on( "change", 'input[type=checkbox]', function( event ) {
	$('#checkboxtandc').on( "change", function( event ) {
	  	// Prevent the usual navigation behavior
		event.preventDefault();
		
		var accepted=this.checked;
		// Store an object using JSON
		localStorage.setItem('settings', JSON.stringify({tandcaccepted: accepted}));
	});

	$('#formRegistration').submit(function( event ) {
	    event.preventDefault();
		sendEmail();
    });

});


