'use strict';

function SearchBar (pagination) {
	var studentsNamesTags = document.getElementsByTagName('h3');
	var studentsEmailsClasses = document.getElementsByClassName('email');
	var studentListContainer = document.getElementsByClassName('student-list')[0];
	this.studentsNamesList = [];
	this.studentsEmailsList = [];
	this.inputSearch = document.getElementsByTagName('input')[0];
	this.button = document.getElementById('button');
	this.searchValue = '';
	this.pagination = pagination;
	this.noStudentMessage = document.createElement('div');
	studentListContainer.appendChild(this.noStudentMessage);
	this.noStudentMessage.innerHTML = '';

	for (var i = 0; i < studentsNamesTags.length; i++) {
		this.studentsNamesList.push(studentsNamesTags[i].innerText);
	};
	for (var i = 0; i < studentsEmailsClasses.length; i++) {
		this.studentsEmailsList.push(studentsEmailsClasses[i].innerText);
	};
}

SearchBar.prototype.submission = function () {
	this.searchValue = this.inputSearch.value;
	var index = 0;
	this.pagination.displayListLi = [];
	for (var i = 0; i < this.studentsNamesList.length; i++) {
		if (this.studentsNamesList[i].toLowerCase().indexOf(this.searchValue.toLowerCase()) >= 0 || this.studentsEmailsList[i].toLowerCase().indexOf(this.searchValue.toLowerCase()) >= 0) {
			this.pagination.displayListLi.push(i);
			index++;
		}
	};
	if (index == 0) {
		this.noStudentMessage.innerHTML = '<h1>There is no <span class="alert">' + this.searchValue + '</span> in our databse.'
	} else {
		this.noStudentMessage.innerHTML = '';
	};
	this.pagination.printPagination();
}

SearchBar.prototype.eventHandler = function () {
	this.submission();
	this.pagination.showStudents(1);
	this.pagination.createAnchorList().forEach(this.pagination.paginationClickHandler, this.pagination);
	this.pagination.ulFadeIn();
}

var newSearchBar = new SearchBar(newPagination);
//button.addEventListener("click", function() { newSearchBar.eventHandler(); }, false);
if (document.getElementById('button').addEventListener) {
    document.getElementById('button').addEventListener("click", function() { newSearchBar.eventHandler(); }, false);
}
else {
    document.getElementById('button').attachEvent("onclick", newSearchBar.eventHandler);
}

$(document).ready(function() {
	$('#search').keyup(function () {
		newSearchBar.eventHandler();
	});
});
