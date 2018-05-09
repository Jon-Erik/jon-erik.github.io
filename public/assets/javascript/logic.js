var showLinks = false;

$(".dropbtn").on("click", function() {
	if (showLinks === false) {
		$(".dropdown-content").css("display", "block")
		showLinks = true;
	} else if (showLinks === true) {
		$(".dropdown-content").css("display", "none")
		showLinks = false;
	}
});

$(".links").on("click", function() {
	$(".dropdown-content").css("display", "none")
	showLinks = false;
});

$("#contact-form").submit(function () {
	event.preventDefault();

	var name = $("#name-input").val().trim();
	var email = $("#email-input").val().trim();
	var message = $("#messagebox").val();
	var captcha = $("#g-recaptcha-response").val();

	var newMessage =  {
		name: name,
		email: email,
		message: message,
		captcha: captcha
	}
	console.log(newMessage)
	if ($.trim(name).length > 0 && 
		$.trim(email).length > 0 && 
		$.trim(message).length > 0 && email.includes("@")) {
		
		$.ajax("/newmessage", {
				type: "POST",
				data: newMessage
			}).then(
				function(data) {
					//console.log(data);
					if(data === "Captcha passed and email submitted") {
						$(".modal-title").text("Success!")
						$(".modal-text").text("Thank you for submitting. I will be in contact with you soon.");
						$('#contact-modal').modal({});
					} else {
						$(".modal-title").text("Something went wrong...")
						$(".modal-text").text("Sorry, your email didn't go through. Please ensure you have checked the reCAPTCHA verification and that you've entered a valid email address." +
							" You may need to refresh your browser.");
						$('#contact-modal').modal({});
					}
					$("#name-input").val("");
					$("#email-input").val("");
					$("#messagebox").val("");
				}
			);		
	} else {
		$(".modal-title").text("Something is missing...")
		$(".modal-text").text("Please ensure all fields are properly filled.");
		$('#contact-modal').modal({});
	};
});