'use strict';

function SearchBar (tag, pagination) {
	this.studentsNamesTags = document.getElementsByTagName(tag);
	this.studentsNamesList = [];
	this.inputSearch = document.getElementsByTagName('input')[0];
	this.button = document.getElementById('button');
	this.searchValue = '';
	this.searchList = [];
	this.pagination = pagination;

	for (var i = 0; i < this.studentsNamesTags.length; i++) {
		this.studentsNamesList.push(this.studentsNamesTags[i].innerText);
	};
}

SearchBar.prototype.submission = function () {
	this.searchValue = this.inputSearch.value;
	var index = 0;
	this.pagination.displayListLi = [];
	for (var i = 0; i < this.studentsNamesList.length; i++) {
		if (this.studentsNamesList[i].toLowerCase().indexOf(this.searchValue.toLowerCase()) >= 0) {
			this.pagination.displayListLi.push(i);
			index++;
		}
	};
	if (index == 0) {
		var studentListContainer = document.getElementsByClassName('student-list')[0];
		studentListContainer.innerHTML = '<h1>There is no <span class="alert">' + this.searchValue + '</span> in our databse.';
	};
	this.pagination.printPagination();
	console.log('displayListLi LENGHT: ' + this.pagination.displayListLi.length);
}

SearchBar.prototype.clickHandler = function () {
	this.submission();
	this.pagination.showStudents(1);
	this.pagination.createAnchorList().forEach(this.pagination.paginationClickHandler, this.pagination);
	this.pagination.ulFadeIn();
}

var newSearchBar = new SearchBar('h3', newPagination);
button.addEventListener("click", function() { newSearchBar.clickHandler(); }, false);


