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
	var message = $("#messagebox-input").val();

	var newMessage =  {
		name: name,
		email: email,
		message: message
	}

	console.log(newMessage);

	alert("form submitted");
});