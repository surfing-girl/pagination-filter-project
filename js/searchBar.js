/* jshint browser: true */
/*globals $:false */
/* jshint -W097 */
'use strict';

/* Function prints form into html file */

function initSearchBarElement() {
	var formContainer = document.getElementsByClassName('page-header')[0];
	var createForm = document.createElement('form');
	var createInput = document.createElement('input');
	var createButton = document.createElement('button');
	formContainer.appendChild(createForm);
	createForm.className = "student-search";
	createForm.appendChild(createInput);
	createForm.appendChild(createButton);
	createInput.setAttribute("id", "search");
	createInput.setAttribute("placeholder", "Search for students...");
	createButton.setAttribute("id", "button");
	createButton.setAttribute("type", "button");
	createButton.innerText= "Search";
}
initSearchBarElement();

/* Function selects elements and creates lists with students info and empty div for successful student search */

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
	}
	for (i = 0; i < studentsEmailsClasses.length; i++) {
		this.studentsEmailsList.push(studentsEmailsClasses[i].innerText);
	}
}

/* Function checks searching results and adds a no students message or students info, prints adequate numbers in pagination  */

SearchBar.prototype.submission = function () {
	this.searchValue = this.inputSearch.value;
	var index = 0;
	this.pagination.displayListLi = [];
	for (var i = 0; i < this.studentsNamesList.length; i++) {
		if (this.studentsNamesList[i].toLowerCase().indexOf(this.searchValue.toLowerCase()) >= 0 || this.studentsEmailsList[i].toLowerCase().indexOf(this.searchValue.toLowerCase()) >= 0) {
			this.pagination.displayListLi.push(i);
			index++;
		}
	}
	if (index === 0) {
		this.noStudentMessage.innerHTML = '<h1>There is no <span class="alert">' + this.searchValue + '</span> in our databse.';
	} else {
		this.noStudentMessage.innerHTML = '';
	}
	this.pagination.printPagination();
};

SearchBar.prototype.eventHandler = function () {
	this.submission();
	this.pagination.showStudents(1);
	this.pagination.createAnchorList().forEach(this.pagination.paginationClickHandler, this.pagination);
	this.pagination.ulFadeIn();
};

var newSearchBar = new SearchBar(newPagination);
if (document.getElementById('button').addEventListener) {
    document.getElementById('button').addEventListener("click", function() { newSearchBar.eventHandler(); }, false);
}
else {
    document.getElementById('button').attachEvent("onclick", newSearchBar.eventHandler);
}

/* Search results updates in real time as the user types */

$(document).ready(function() {
	$('#search').keyup(function () {
		newSearchBar.eventHandler();
	});
});
