/* jshint browser: true */
/*globals $:false */
/* jshint -W097 */
'use strict';

/* Function makes copy of student list and creates empty div which will be used to show pagination numbers */

function Pagination(studentsNumberOnPage, className) {
	this.studentsNumberOnPage = studentsNumberOnPage;
	this.studentsListLi = document.getElementsByClassName(className);
	this.displayListLi = [];
	for (var i = 0; i < this.studentsListLi.length; i++) {
		this.displayListLi.push(i);
	}
	this.index = 0;
	var pagination = document.createElement('div');
	pagination.className = 'pagination';
	this.unorderedList = document.createElement('ul');
	var container = document.getElementsByClassName('page')[0];

	container.appendChild(pagination);
	pagination.appendChild(this.unorderedList);
}

/* Function prints pagination numbers  */

Pagination.prototype.printPagination = function() {
	var printNumbers = '';
	var studentsNumber = this.displayListLi.length;
	var pages = studentsNumber / this.studentsNumberOnPage;
	var lastPage = studentsNumber % this.studentsNumberOnPage;
	if (lastPage > 0) {
		pages += 1;
	}
	for (var i = 1; i <= pages; i++) {
		printNumbers += '<li><a href="#">';
		printNumbers += i + '</a></li>';
	}
	this.unorderedList.innerHTML = printNumbers;
};

/* Function displays disired number of students on a page */

Pagination.prototype.showStudents = function(pageValue) {
	this.index = this.studentsNumberOnPage * pageValue;
	for (var i = 0; i < this.studentsListLi.length; i++) {
		this.studentsListLi[i].style.display = 'none';
	}
	for (i = 0; i < this.displayListLi.length; i++) {
		if (i >= this.index - this.studentsNumberOnPage && i < this.index) {
			this.studentsListLi[this.displayListLi[i]].style.display = 'block';
		}
	}
};

var newPagination = new Pagination(10, 'student-item');
newPagination.printPagination();

Pagination.prototype.createAnchorList = function() {
	var anchorList = document.getElementsByTagName('a');
	var anchorList2 = [];
	for (var i = 0; i < anchorList.length; i++) {
		anchorList2.push(anchorList[i]);
	}
	return anchorList2;
};

/* Function makes fade effect on unordered list */

Pagination.prototype.ulFadeIn = function() {
	var mainUl = document.getElementsByTagName('ul')[0];
	mainUl.style.display = 'none';
	$( mainUl ).fadeIn();
};


/* Function runs animation and showStudents function on click */

Pagination.prototype.paginationClickHandler = function (element, elementValue) {
	element.onclick = function (event) {
		event.preventDefault();
		newPagination.showStudents(elementValue + 1);
		newPagination.ulFadeIn();
	};
};


newPagination.showStudents(1);
newPagination.createAnchorList().forEach(newPagination.paginationClickHandler, newPagination);
