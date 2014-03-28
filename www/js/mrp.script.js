/***************
Change history
Version	Date			Description
0.4.1	24 Mar 2014		Corrected spelling in T&Cs link description.
0.5.0   26 Mar 2014     Major change to mrp.script.js and addition of fastclick.js
0.5.1   28 Mar 2014     Move jQuery script tags back to head to eliminate legacy tag rendering
0.5.2   28 Mar 2014     Add Phonegap deviceready event handler
***************/
var app = {

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    initFromStorage: function () {
        if (window.localStorage) {
	        if (localStorage.length) {
			    var username=JSON.parse(localStorage.getItem('settings')).username;
			    $('#textUsername').val(username);

			    var accepted=JSON.parse(localStorage.getItem('settings')).tandcaccepted;
			    $('#checkboxTandC').prop('checked',accepted);
	        }
	    }
    },

	buildLogonURI: function () {
        //TODO: validate username 
        var username = $('#textUsername').val(),
            uri = this.urlLogonwUN + username;
        return uri;
    },

    buildAppVersion: function () {
	    var html = "<li>" + "Version: " + this.version + "</li>";
	    $("#ulAppVersion").html(html);
    },

    buildDeviceProperties: function () {
	    var html = "";
	    alert(window.device);
	    if (window.device) {
  	  	    html += "<li>" + 'Device Name: ' + device.name + "</li>";
  	  	    html += "<li>" + 'Device Cordova: ' + device.cordova + "</li>";
  	  	    html += "<li>" + 'Device Platform: ' + device.platform + "</li>";
  	  	    html += "<li>" + 'Device UUID: ' + device.uuid + "</li>";
	    } else {
  	  	    html += "<li>Device properties not available.</li>";
	    }
	    $("#deviceProperties").html(html);
    },

    registerEvents: function() {
		var appThis = this;
		
		document.addEventListener("deviceready", onDeviceReady, false);
		function onDeviceReady() {
			this.buildDeviceProperties();
		    //console.log(device.cordova);
		}
		
		$('#buttonLogon').on( "click", function( event ) {
			event.preventDefault();
			window.open(encodeURI(appThis.buildLogonURI()),'_self');
		});

		$('#textUsername').on( "change", function( event ) {
			event.preventDefault();
			var username=$('#textUsername').val();
			localStorage.setItem('settings', JSON.stringify({username: username}));
		});

		$('#checkboxTandC').on( "change", function( event ) {
			event.preventDefault();
			var accepted=this.checked;
			localStorage.setItem('settings', JSON.stringify({tandcaccepted: accepted}));
		});

		$('#formRegistration').submit(function( event ) {
			event.preventDefault();
			appThis.sendEmail();
		});
		
		FastClick.attach(document.body);
    },

    sendEmail: function () {
	    var subject = "NHLS TrakCare Lab Webview User Registration";
	    var title = $("#optionTitle").val();
	    var firstname = $("#textFirstname").val();	
	    var surname = $("#textSurname").val();	
	    var gender = $("#optionGender").val();	
	    var mobile = $("#telMobile").val();	
	    var email = $("#emailEmail").val();	
	    //var natId=$("#natid").val();	
	
	    var body = "Title:" + title + "\r\n";
	    body += "First name:" + firstname + "\r\n";
	    body += "Surname:" + surname + "\r\n";
        body += "Gender:" + gender + "\r\n";
        body += "Mobile:" + mobile + "\r\n";
        body += "Email:" + email + "\r\n";

        var uri = this.urlMailTo;
	    uri += "?subject=" + encodeURIComponent(subject);
	    uri += "&body=" + encodeURIComponent(body);
	
	    window.location.href = uri;
    },
				
	initialize: function() {
		//var self = this;
  		this.initFromStorage();

		this.version = "0.5.2",
		this.urlWRV = "https://trakcarelabwebview.nhls.ac.za/trakcarelab/";
		this.urlDefault = this.urlWRV + "default.htm";
		this.urlLogon = this.urlWRV + "csp/logon.csp?LANGID=1";
		this.urlLogonwUN = this.urlLogon + "&USERNAME=";
		this.urlMailTo = "mailto:support@iscpoc.co.za";
		this.urlTandC = "https://trakcarelabwebview.nhls.ac.za/trakcarelab/WWW NHLS Terms and conditions Ver 1 0.htm";

		$('#buttonDefault').prop('href',encodeURI(this.urlDefault));
		$('#buttonLogon').prop('href',encodeURI(this.buildLogonURI()));
		$('#buttonTandC').prop('href',encodeURI(this.urlTandC));
	
		this.buildAppVersion();

        this.registerEvents();
	}


};

app.initialize();
