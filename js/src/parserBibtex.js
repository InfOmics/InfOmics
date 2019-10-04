var entryList = [];

function download(filename, text) {
	
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function refer (idEntry) {

	var url = null;
	var text = entryList[idEntry];
	
	makeTextFile = function (text) {
  
		var blob = new Blob([text], {type: 'text/plain'});

    	// If we are replacing a previously generated file we need to
   		// manually revoke the object URL to avoid memory leaks.
		if (url !== null) {
			window.URL.revokeObjectURL(textFile);
		}
	
		url = window.URL.createObjectURL(blob);
		
		return url;
  	};

	var link = makeTextFile(text);
	window.open(link, '_blank');
	var filename = 'pubReference-' + idEntry + '.bib'
	download(filename, text) 
}

function addIds() {

    var nodes = document.body.querySelectorAll('p4.references');
    var id = 0; 
    for( var i = 0; i < nodes.length; i++ ) {
        nodes[i].id = 'unique' + id++
    }
}

function composeArticle (entryId, entryValues) {

	var template = "";
	var journalInfo = "";
	var journalValues = [entryValues.year, entryValues.volume, entryValues.pages];
	for (var k=0; k<journalValues.length; k++) {
		if (journalValues[k] !== undefined && journalValues[k] !== "") {
			journalInfo += journalValues[k];
			if (k==0) {
				journalInfo += ";";
			} else if (k==1) {
				journalInfo += ":";
			}
		}
	}

	if (entryValues.url !== undefined && entryValues.url !== "") {
	template += "<li>" + entryValues.author + "</li>" + 
			"<p1>" + entryValues.title + "</p1><br>" + 
			"<p2>" + entryValues.journal + journalInfo + "</p2><br>" + 
			"<p3> <a href=\"" + entryValues.url +  "\">(view online)</a> </p3>	" +
			"<p4>(download reference)</p4>" ;

	} else {
		template += "<li>" + entryValues.author + "</li>" + 
				"<p1>" + entryValues.title + "</p1><br>" + 
				"<p2>" + entryValues.journal + journalInfo + "</p2><br>" +
				"<p4>(download reference)</p4>" ;
	}

	return template;
}

function composeBook (entryId, entryValues) {
	
	var template = "";
	/*if (entryValues.editors != "") {
		entryValues.editors = "In: " + entryValues.editors;
	}*/
	if (entryValues.pages != "") {
		entryValues.pages = " p. " + entryValues.pages;
	}

	var journalInfo = "";
	var journalValues = [entryValues.edition, entryValues.year, entryValues.volume, entryValues.pages, entryValues.number];
	for (var k=0; k<journalValues.length; k++) {
		if (journalValues[k] !== undefined && journalValues[k] !== "") {
			/*if (journalValues[k] == entryValues.edition) {
				if (entryValues.edition != "1") {
					journalInfo += "Edition: " + journalValues[k] + ",";
				}
			} else {
				journalInfo += journalValues[k] + ",";
			}*/
			journalInfo += journalValues[k] + ",";
		}
	}
	journalInfo = journalInfo.substring(0, journalInfo.length-1);

	if (entryValues.url !== undefined && entryValues.url !== "") {
	template += "<li>" + entryValues.author + "</li>" + 
			"<p1>" + entryValues.title + "</p1><br>" + 
			"<p2>" + entryValues.journal + journalInfo + "</p2><br>" + 
			"<p3> <a href=\"" + entryValues.url +  "\">(view online)</a> </p3>	" +
			"<p4>(download reference)</p4>" ;
	} else {
		template += "<li>" + entryValues.author + "</li>" + 
				"<p1>" + entryValues.title + "</p1><br>" + 
				"<p2>" + entryValues.journal + journalInfo + "</p2><br>	" +
				"<p4>(download reference)</p4>" ;
	}

	return template;
}

function composeConference (entryId, entryValues) {
	
	var template = "";
	/*if (entryValues.editors != "") {
		entryValues.editors = "In: " + entryValues.editors;
	}*/
	if (entryValues.pages != "") {
		entryValues.pages = " p. " + entryValues.pages;
	}
	if (entryValues.journal != "") {
		entryValues.journal = "Proceedings of the " + entryValues.journal;
	}
	
	var journalInfo = "";
	var journalValues = [entryValues.publisher, entryValues.year, entryValues.pages];
	for (var k=0; k<journalValues.length; k++) {
		if (journalValues[k] !== undefined && journalValues[k] !== "") {
			journalInfo += journalValues[k] + ",";
		}
	}
	journalInfo = journalInfo.substring(0, journalInfo.length-1);

	if (entryValues.url !== undefined && entryValues.url !== "") {
	template += "<li>" + entryValues.author + "</li>" + 
			"<p1>" + entryValues.title + "</p1><br>" + 
			"<p2>" + entryValues.journal + entryValues.date + ", " + entryValues.location + ". " + journalInfo + "</p2><br>" + 
			"<p3> <a href=\"" + entryValues.url +  "\">(view online)</a> </p3>	" +
			"<p4>(download reference)</p4>" ;
	} else {
		template += "<li>" + entryValues.author + "</li>" + 
				"<p1>" + entryValues.title + "</p1><br>" + 
				"<p2>" + entryValues.journal + entryValues.date + ", " + entryValues.location + ". " + journalInfo + "</p2><br>	" +
				"<p4>(download reference)</p4>" ;
	}

	return template;
}

function readAuthor (line) {

	line = line.split(" and ");
	var author = "";
	var re = new RegExp(",");

	for (var i=0; i<line.length; i++) {
		if (re.test(line[i])) {
			var value = line[i];
			value = value.split(",");
			for (var j=1; j<value.length; j++) {
				author += value[j][1];
			}
			author = author + " " + value[0];
			author = author.trim();
			author += ", ";
		} else {
			author += line[i].trim() + ", ";
		}
		if (i == line.length -2) {
			author = author.trim();
			author = author.substring(0, author.length -1);
			author += " and ";
		}
	}
	author = author.trim();
	author = author.substring(0, author.length -1);

	return author;
}

function readField (line) {

	line = line.trim()

	var regex = /\\\{/g;
	line = line.replace(regex, "{");
	regex = /\\\}/g;
	line = line.replace(regex, "}");
	regex = /\\\&/g;
	line = line.replace(regex, "&");

	regex = /\{\\\"a\}/g;
	line = line.replace(regex, "&#228");
	regex = /\{\\\"e\}/g;
	line = line.replace(regex, "&#235");
	regex = /\{\\\"i\}/g;
	line = line.replace(regex, "&#239");
	regex = /\{\\\"o\}/g;
	line = line.replace(regex, "&#246");
	regex = /\{\\\"u\}/g;
	line = line.replace(regex, "&#252");

	regex = /\{\\\'a\}/g;
	line = line.replace(regex, "&#225");
	regex = /\{\\\`a\}/g;
	line = line.replace(regex, "à");
	regex = /\{\\\'e\}/g;
	line = line.replace(regex, "&#233");
	regex = /\{\\\`e\}/g;
	line = line.replace(regex, "è");
	regex = /\{\\\'i\}/g;
	line = line.replace(regex, "&#237");
	regex = /\{\\\`i\}/g;
	line = line.replace(regex, "ì");
	regex = /\{\\\'o\}/g;
	line = line.replace(regex, "&#243");
	regex = /\{\\\`o\}/g;
	line = line.replace(regex, "ò");
	regex = /\{\\\'u\}/g;
	line = line.replace(regex, "&#250");
	regex = /\{\\\`u\}/g;
	line = line.replace(regex, "ù");

		
	var field = {"name": "", "value": ""};
	line = line.split(" ");
	var re = new RegExp("=");
	if (re.test(line[0])) {
		if (line[0].slice(-1) == "=") { // xxx= {}
			line[0] = (line[0].slice(0, -1)).trim();
			name = line[0];
			value = (line.slice(1, line.length).join(" ")).trim();
			if (value.slice(-1) == ",") {
				value = value.slice(1, value.length -1);
				value = value.trim();
				value = value.slice(0, value.length -1);
			} else {
				value = value.slice(1, value.length -1);
			}
		} else { // xxx={}
			var string = line[0].split("=");
			var value = string[1] + " ";
			for (var i=1; i<line.length; i++) {
				value += line[i] + " ";
			}
			value = value.trim();
			if (value.slice(-1) == ",") {
				value = value.slice(1, value.length -1);
				value = value.trim();
				value = value.slice(0, value.length -1);
			} else {
				value = value.slice(1, value.length -1);
			}
			name = string[0];
		}
	} else { // xxx = {} or xxx ={}
		name = line[0];
		if (line[1] == "=") { // xxx = {}
			value = (line.slice(2, line.length).join(" ")).trim();
			if (value.slice(-1) == ",") {
				value = value.slice(1, value.length -1);
				value = value.trim();
				value = value.slice(0, value.length -1);
			} else {
				value = value.slice(1, value.length -1);
			}
		} else { // xxx ={}
			value = (line.slice(1, line.length).join(" ")).trim();
			if (value.slice(-1) == ",") {
				value = value.slice(2, value.length -1);
				value = value.trim();
				value = value.slice(0, value.length -1);
			} else {
				value = value.slice(2, value.length -1);
			}
		}
	}

	field.name = name;
	if (field.name == "author") {
		value = readAuthor(value);
	}
	field.value = value.trim();

	value = value.trim();
	if (field.name == "journal" && value.slice(-1) != ".") {
		value = value + ". "
	}

	field.value = value;
	return field;
}

function readEntry (entry) {
	
	entryList.push(entry + "}");

	if (entry.match(/^@article/m)) {
		var entryValues = { "type": "article","title": "", "author": "", "url": "", "doi": "", "issn": "", "year": "", "date": "", "journal": "", "volume": "", "number": "", "pages": "", "publisher": "", "keywords": "", "pubstate": "", "tppubtype": "" }; 
	} else if (entry.match(/^@book/m)) {
		var entryValues = { "type": "book", "title": "", "author": "", "edition": "","url": "", "doi": "", "isbn": "", "year": "", "date": "", "journal": "", "volume": "", "pages": "", "publisher": "", "keywords": "", "pubstate": "", "tppubtype": "" }; 
	} else if (entry.match(/^@inproceedings/m)) {
		var entryValues = { "type": "inproceedings", "title": "", "author": "", "year": "", "journal": "", "organization": "", "location": "", "pages": "", "publisher": ""}; 
	} else if (entry.match(/^@conference/m)) {
		var entryValues = { "type": "conference", "title": "", "author": "", "url": "", "doi": "", "isbn": "", "year": "", "date": "", "location": "", "journal": "", "volume": "", "pages": "", "publisher": "", "keywords": "", "pubstate": "", "tppubtype": "" }; 
	} else if (entry.match(/^@incollection/m)) {
		var entryValues = { "type": "incollection", "title": "", "author": "", "year": "", "journal": "", "pages": "", "publisher": ""}; 
	} else if (entry.match(/^@misc/m)) {
		var entryValues = { "type": "misc", "title": "", "author": "", "year": "", "journal": "", "pages": "", "publisher": ""}; 
	}
	
	var lines = entry.split(/\n/);
	for (var i=1; i<lines.length; i++) {
		field = readField(lines[i]);
		entryValues[field.name] = field.value;
	}
	
	return entryValues;
}

function readBibFile (data) {
	//var fs = require('fs'); 
	//var data = fs.readFileSync(data, 'utf8')

	var lines = data.split(/\n/);
	var count = (data.match(/^@/gm) || []).length;
	var template = "";
	var i=0;
	var entry = [];
	for (var j=0; j<count; j++) {
		var newEntry = "";
    	while (lines[i].trim() !== "}") {
    		if (lines[i].trim() !== "") {
    			newEntry += lines[i] + "\n";
    		}
    		i++; 
		}
		i++;

    	entry.push(newEntry);
		entryValues = readEntry(entry[j]);
		var entryId = entry[j].split(/\n/);
		entryId = entryId[0];

		if (entryValues.type == "article" || entryValues.type == "incollection" || entryValues.type == "misc") {
			template += composeArticle(entryId, entryValues);
		}
		else if (entryValues.type == "book") {
			template += composeBook(entryId, entryValues);
		}
		else if (entryValues.type == "conference" || entryValues.type == "inproceedings") {
			template += composeConference(entryId, entryValues);

		}
	}

	return template;
}

function showResult(filename) {
    
    var result = null;
    $.ajax({
    	url: filename,
        type: 'get',
        dataType: 'text',
        async: false,
        success: function(data) {
			result = readBibFile(data);
        } 
    });
    
    return result;
}

$(document).ready(function(){
	$("div.bibtex").each(function(){
		var filename = this.getAttribute("src")
		$(this).append($.parseHTML(showResult(filename)))
		$("li").addClass("author")
		$("p1").addClass("title")
		$("p2").addClass("journal")
		$("p3").addClass("pub_url")
		$("p4").addClass("references")
	})
	addIds()
	$("p4.references").click(function() {
		var idEntry = this.getAttribute("id")
		idEntry = idEntry.substring(6)
		refer(idEntry)
	})
})