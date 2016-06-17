function Pagination(studentsNumberOnPage, className) {
	this.studentsNumberOnPage = studentsNumberOnPage;
	this.studentsListLi = document.getElementsByClassName(className);
	this.displayListLi = this.studentsListLi;
	this.index = 0;
	var pagination = document.createElement('div');
	pagination.className = 'pagination';
	this.unorderedList = document.createElement('ul');
	var container = document.getElementsByClassName('page')[0]; 

	container.appendChild(pagination);
	pagination.appendChild(this.unorderedList);
	for (var i = 0; i < this.studentsListLi.length; i++) {
		var span = document.createElement('span');
		span.innerText = i + 1;
		this.studentsListLi[i].appendChild(span);
		//this.studentsListLi[i].style.display = 'none';
	}
	console.log(typeof this.displayListLi);

}

Pagination.prototype.printPagination = function() {
	var printNumbers = '';
	var studentsNumber = this.studentsListLi.length;
	var pages = studentsNumber / this.studentsNumberOnPage;
	var lastPage = studentsNumber % this.studentsNumberOnPage;
	if (lastPage > 0) {
		pages += 1;
	};
	console.log(lastPage + ' ' + pages);
	for (var i = 1; i <= pages; i++) {
		printNumbers += '<li><a href="#">';
		printNumbers += i + '</a></li>';
		
	};
	this.unorderedList.innerHTML = printNumbers;
};

Pagination.prototype.showStudents = function(pageValue) {
	this.index = this.studentsNumberOnPage * pageValue;
	for (var i = 0; i < this.studentsListLi.length; i++) {
		if (i >= this.index - this.studentsNumberOnPage && i < this.index) {
			this.studentsListLi[i].style.display = 'block';
			//this.displayListLi.push(this.studentsListLi[i]);
		} else {
			this.studentsListLi[i].style.display = 'none';
		};
		/*for (var i = 0; i < this.displayListLi.length; i++) {
			this.displayListLi[i].style.display = 'block';
		};*/
		console.log('hi');
	};
	
	console.log('Index: '+ this.index);
	console.log('StudentsNumberOnPage: '+ this.studentsNumberOnPage + ' ,pageValue: ' + pageValue);
};

var newPagination = new Pagination(10, 'student-item');
newPagination.printPagination(newPagination.studentsListLi);

var anchorList = document.getElementsByTagName('a');
var anchorList2 = [];
for (var i = 0; i < anchorList.length; i++) {
	anchorList2.push(anchorList[i]);
};

Pagination.prototype.paginationClickHandler = function (element, elementValue) {
	element.onclick = function (event) {
		event.preventDefault();
		console.log('Element Value: ' + parseInt(elementValue + 1));
		newPagination.showStudents(elementValue + 1);
	};
};


newPagination.showStudents(1);
anchorList2.forEach(newPagination.paginationClickHandler, newPagination);


