// JavaScript Document
var ourRequest = new XMLHttpRequest();
var clickCounter = 0;

var ourButton = document.getElementById('get-details');
var ourDiv = document.getElementById('results');

ourButton.addEventListener('click', function(){
	ourRequest.open('GET', 'http://femkreations.com/projects/presidents-list-json-ajax/presidents.json');

	ourRequest.onload = function(){

		if (ourRequest.status >=200 && ourRequest.status<400){
			var ourData= JSON.parse(ourRequest.responseText);
			renderHtml(ourData);	
		}
		else {
			console.log('We connected to the server but it returned an error');
		}

	};

	ourRequest.onerror = function(){
		console.log('Connection Error');
	};


	ourRequest.send();

	clickCounter++;

	if (clickCounter >= 1){
		ourButton.setAttribute('disabled', 'disabled');
	}
});


function renderHtml(data){
	var htmlString = '';
	var death_year, left_office;

	htmlString += '<table><tr><th>No</th> <th>Name</th> <th>Birth</th> <th>Death</th> <th>Took Office</th> <th>Left Office</th> <th>Party</th> </tr>';

	for (i=0;i< data.length;i++){
		if(data[i].death_year == null){
			death_year = ' - ';
		}
		else {
			death_year = data[i].death_year;
		}

		if(data[i].left_office == null){
			left_office = ' - ';
		}
		else {
			left_office = data[i].left_office;
		}
		htmlString += '<tr>';
		htmlString += '<td>'+ data[i].number + '</td>';
		htmlString += '<td>'+ data[i].president + '</td>';
		htmlString += '<td>'+ data[i].birth_year + '</td>';
		htmlString += '<td>'+ death_year + '</td>';
		htmlString += '<td>'+ data[i].took_office + '</td>';
		htmlString += '<td>'+ left_office + '</td>';
		htmlString += '<td>'+ data[i].party + '</td>';
		htmlString += '</tr>';	
	}

	htmlString += '</table>';
	ourDiv.insertAdjacentHTML('beforebegin', htmlString);
}



