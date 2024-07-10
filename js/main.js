/* ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ DOM */

const modal = document.getElementById('student-modal');
const addStudentButton = document.getElementById('add-student');
const span = document.getElementsByClassName('close')[0];
const addButton = document.getElementById('add');
const cancelButton = document.getElementById('cancel');
const studentNameInput = document.getElementById('student-name');
const successMessage = document.getElementById('success-message');
const studentList = document.querySelector('ul');
const pickStudentButton = document.getElementById('pick-student');

/* ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА */

function openModal() {
	modal.style.display = 'block';
}

/* ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА */

function closeModal() {
	modal.style.display = 'none';
	clearModal();
}

/* ФУНКЦИЯ ОЧИСТКИ МОДАЛЬНОГО ОКНА */

function clearModal() {
	studentNameInput.value = '';
	successMessage.style.display = 'none';
}

/* ФУНКЦИЯ ОТОБРАЖЕНИЯ СООБЩЕНИЯ */

function showMessage(message, isError = false) {
	successMessage.textContent = message;
	successMessage.className = `success ${isError ? 'error-message' : 'success-message'}`;
	successMessage.style.display = 'block';

	setTimeout(() => {
		successMessage.style.display = 'none';
		clearModal();
	}, 750);
}

/* ОБРАБОТЧИКИ СОБЫТИЯ */

addStudentButton.onclick = openModal;
span.onclick = closeModal;
cancelButton.onclick = closeModal;

window.onclick = function (event) {
	if (event.target === modal) {
		closeModal();
	}
};

addButton.onclick = function () {
	const studentName = studentNameInput.value.trim();

	if (studentName === '') {
		showMessage('Введите имя студента', true);
	} else {
		const li = document.createElement('li');
		li.textContent = studentName;
		studentList.appendChild(li);
		showMessage('Студент успешно добавлен');
		studentList.classList.add('show-list');
	}
};

/* ФУНКЦИЯ ВЫБОРА СЛУЧАЙНОГО СТУДЕНТА */

function getRandomStudentIndex(max) {
	return Math.floor(Math.random() * max);
}

pickStudentButton.onclick = function () {
	const students = document.querySelectorAll('ul > li');
	const studentCount = students.length;

	if (studentCount === 0) {
		return;
	}

	let currentIndex = 0;
	const intervalDuration = 150;
	const totalDuration = 4000;

	const interval = setInterval(() => {
		students.forEach(student => {
			student.classList.remove('blue-background', 'purple-background');
		});

		students[currentIndex].classList.add('blue-background');

		currentIndex = (currentIndex + 1) % studentCount;
	}, intervalDuration);

	setTimeout(() => {
		clearInterval(interval);

		const randomIndex = getRandomStudentIndex(studentCount);
		students.forEach(student => {
			student.classList.remove('blue-background');
		});

		students[randomIndex].classList.add('purple-background');
	}, totalDuration);
};
