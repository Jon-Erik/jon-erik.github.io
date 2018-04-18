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

$(".submitbutton").on("click", function () {
	event.preventDefault();
	//alert("form submitted");
});