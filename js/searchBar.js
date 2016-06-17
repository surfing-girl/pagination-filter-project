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
	for (var i = 0; i < this.studentsNamesList.length; i++) {
		if (this.studentsNamesList[i].toLowerCase().indexOf(this.searchValue.toLowerCase()) >= 0) {
			this.searchList.push(newPagination.studentsListLi[i]);
			index++;
		}
	};
	newPagination.displayListLi = this.searchList;
	if (index == 0) {
		var studentListContainer = document.getElementsByClassName('student-list')[0];
		studentListContainer.innerHTML = '<h1>There is no <span class="alert">' + this.searchValue + '</span> in our databse.';
	};
	console.log(newPagination.displayListLi);
}

/*SearchBar.prototype.showSearchedStudents = function () {
	for (var i = 0; i < this.studentsNamesList.length; i++) {
		newPagination.studentsListLi[i].style.display = 'none';
	};
	for (var i = 0; i < this.searchList.length; i++) {
		this.searchList[i].style.display = 'block';
	};
	this.searchList = [];
	console.log('Cleared list: ' + this.searchList);
}*/

var newSearchBar = new SearchBar('h3');

SearchBar.prototype.clickHandler = function () {
	newSearchBar.submission();
}

button.addEventListener("click", newSearchBar.clickHandler, false);


