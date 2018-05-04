//var credentials = require("../../../mailgun-credentials/mailgun-credentials.js")

var showLinks = false;

$(".dropbtn").on("click", function() {
	if (showLinks === false) {
		$(".dropdown-content").css("display", "block")
		showLinks = true;
	} else if (showLinks === true) {
		$(".dropdown-content").css("display", "none")
		showLinks = false;
	}
})

$(".links").on("click", function() {
	$(".dropdown-content").css("display", "none")
	showLinks = false;
})

$("#contact-form").submit(function () {
	event.preventDefault();
	

	var name = $("#name-input").val().trim();
	var email = $("#email-input").val().trim();
	var message = $("#messagebox").val();

	var newMessage =  {
		name: name,
		email: email,
		message: message
	}

	if ($.trim(name).length > 0 && 
		$.trim(email).length > 0 && 
		$.trim(message).length > 0 && email.includes("@")) {
		
		$.ajax("/newmessage", {
				type: "POST",
				data: newMessage
			}).then(
				function(data) {
					console.log(data);
					$("#name-input").val("");
					$("#email-input").val("");
					$("#messagebox").val("");
					
					$(".modal-title").text("Success!")
					$(".modal-text").text("Thank you for submitting. I will be contact soon.");
					$('#contact-modal').modal({});
				}
			);		
		$.post("/newMessage", newMessage).then(function(data) {
			console.log(data);
		})
	} else {
		$(".modal-title").text("Something is missing...")
		$(".modal-text").text("Please ensure all fields are properly filled.");
		$('#contact-modal').modal({});
	};
});