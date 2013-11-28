var lang = getUrlVars()['lang'];
var age = getUrlVars()['age'];
var cat = getUrlVars()['cat'];
var output = "";
var buttons = "";
var category = ""

// A function that displays question&answers so if needed you don't repeat the code
function displayQA(node, text) {
	if (node == "question") {
		output += "<h3><a href='#'>" + text + "</a></h3>";
	} else if (node == "answer") {
		output += "<div><p>" + text + "</p></div>";
	}
}

function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}

	return vars;
}

// Open the xml file
$.get("data.xml", {}, function (xml) {

	// Run the function for each category tag in the XML file
	$(lang, xml).children().children(age).each(function (i) {

	// Loops for each questions and answers for the first categories
	$(this).children().each(function (i) {

	if (age != "general_advice") {
		displayQA((this).nodeName, $(this).text());
	} else {
		// Loops for each questions and answers for the second categories which are the generel advices
		category = (this).nodeName;
		buttons += '<a class="button" href="output.html?age=general_advice"  onclick="location.href=this.href+\'&lang=\'+getUrlVars()[\'lang\']+\'&cat=' + category + '\';return false;">' + $(this).attr("id") + '</a><br>'

		if (!(cat == undefined) && (this).nodeName == cat) {
			$(this).children().each(function (i) {
				displayQA((this).nodeName, $(this).text());
			});
		}
	}
});


		$(function () {
			$("#accordion").append(output);
			$("#get_xml").append(buttons);
			$("#accordion").accordion({
				header: "h3",
				collapsible: true,
				active: false,
				autoHide: true,
				autoHeight: false
			});
		});
	});
});