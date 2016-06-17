'use strict';

function SearchBar (tag) {
	this.studentsNamesTags = document.getElementsByTagName(tag);
	this.studentsNamesList = [];
	this.inputSearch = document.getElementsByTagName('input')[0];
	this.button = document.getElementById('button');
	this.searchValue = '';
	this.searchList = [];

	for (var i = 0; i < this.studentsNamesTags.length; i++) {
		this.studentsNamesList.push(this.studentsNamesTags[i].innerText);
	};
}

SearchBar.prototype.submission = function () {
	this.searchValue = this.inputSearch.value;
	var index = 0;
	newPagination.displayListLi = [];
	for (var i = 0; i < this.studentsNamesList.length; i++) {
		if (this.studentsNamesList[i].toLowerCase().indexOf(this.searchValue.toLowerCase()) >= 0) {
			newPagination.displayListLi.push(i);
			index++;
		}
	};
	if (index == 0) {
		var studentListContainer = document.getElementsByClassName('student-list')[0];
		studentListContainer.innerHTML = '<h1>There is no <span class="alert">' + this.searchValue + '</span> in our databse.';
	};
	newPagination.printPagination();
	console.log('displayListLi LENGHT: ' + newPagination.displayListLi.length);
}

var newSearchBar = new SearchBar('h3');

SearchBar.prototype.clickHandler = function () {
	newSearchBar.submission();
	newPagination.showStudents(1);
	newPagination.createAnchorList().forEach(newPagination.paginationClickHandler, newPagination);
}

button.addEventListener("click", newSearchBar.clickHandler, false);


