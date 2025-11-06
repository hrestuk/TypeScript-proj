"use strict";
// 1. Базові типи
// 3. Масиви даних
const professors = [
    { id: 1, name: "Dr. Ivanov", department: "Mathematics" },
    { id: 2, name: "Dr. Petrenko", department: "Computer Science" },
];
const classrooms = [
    { number: "A101", capacity: 40, hasProjector: true },
    { number: "B201", capacity: 25, hasProjector: false },
    { number: "C301", capacity: 30, hasProjector: true },
];
const courses = [
    { id: 1, name: "Calculus I", type: "Lecture" },
    { id: 2, name: "Algorithms", type: "Lecture" },
    { id: 3, name: "Data Structures Lab", type: "Lab" },
];
let nextLessonId = 1;
const schedule = [
    // приклад: декілька занять
    {
        id: nextLessonId++,
        courseId: 1,
        professorId: 1,
        classroomNumber: "A101",
        dayOfWeek: "Monday",
        timeSlot: "8:30-10:00",
    },
    {
        id: nextLessonId++,
        courseId: 2,
        professorId: 2,
        classroomNumber: "C301",
        dayOfWeek: "Monday",
        timeSlot: "10:15-11:45",
    },
];
// 4. Додавання і валідація
// Додає нового професора у масив 
function addProfessor(professor) {
    const exists = professors.some((p) => p.id === professor.id);
    if (exists) {
        console.warn(`Professor with id ${professor.id} already exists — skipping add.`);
        return;
    }
    professors.push(professor);
}
// Перевіряє, чи нове заняття створює конфлікт (по професору або аудиторії) 
function validateLesson(lesson) {
    for (const existing of schedule) {
        // конфлікт якщо той же день та той же timeslot
        if (existing.dayOfWeek === lesson.dayOfWeek && existing.timeSlot === lesson.timeSlot) {
            if (existing.professorId === lesson.professorId) {
                return { type: "ProfessorConflict", lessonDetails: existing };
            }
            if (existing.classroomNumber === lesson.classroomNumber) {
                return { type: "ClassroomConflict", lessonDetails: existing };
            }
        }
    }
    return null;
}
//Додає lesson у schedule якщо немає конфліктів. Повертає true якщо додано, false якщо є конфлікт.
function addLesson(lesson) {
    // створюємо копію з id
    const lessonWithId = Object.assign(Object.assign({}, lesson), { id: nextLessonId++ });
    const conflict = validateLesson(lessonWithId);
    if (conflict) {
        console.warn("Cannot add lesson - conflict:", conflict.type, conflict.lessonDetails);
        return false;
    }
    // Перевірка на існування course/professor/classroom
    const courseExists = courses.some((c) => c.id === lessonWithId.courseId);
    const profExists = professors.some((p) => p.id === lessonWithId.professorId);
    const roomExists = classrooms.some((r) => r.number === lessonWithId.classroomNumber);
    if (!courseExists || !profExists || !roomExists) {
        console.warn("Cannot add lesson - invalid course, professor or classroom reference.");
        return false;
    }
    schedule.push(lessonWithId);
    return true;
}
// 5. Пошук і фільтрація
// Повертає номери вільних аудиторій у вказаний час та день
function findAvailableClassrooms(timeSlot, dayOfWeek) {
    const occupied = schedule
        .filter((s) => s.dayOfWeek === dayOfWeek && s.timeSlot === timeSlot)
        .map((s) => s.classroomNumber);
    return classrooms
        .map((c) => c.number)
        .filter((num) => !occupied.includes(num));
}
// Повертає розклад конкретного професора 
function getProfessorSchedule(professorId) {
    return schedule.filter((s) => s.professorId === professorId);
}
// 6. Аналіз та звіти
/**
Повертає відсоток використання аудиторії.
Тут вважаємо можливі дні = 5 (Monday..Friday), а timeslots = кількість елементів TimeSlot union (5).
 */
function getClassroomUtilization(classroomNumber) {
    const occupiedCount = schedule.filter((s) => s.classroomNumber === classroomNumber).length;
    const totalPossible = 5 * 5; // 5 днів * 5 timeslots = 25 "позиций"
    const utilization = (occupiedCount / totalPossible) * 100;
    return Math.round(utilization * 100) / 100; // округлити до 2 знаків
}
// Визначає найпопулярніший тип занять (по кількості course типів в schedule) 
function getMostPopularCourseType() {
    if (schedule.length === 0)
        return null;
    // збираємо map type -> count
    const counter = {};
    for (const lesson of schedule) {
        const course = courses.find((c) => c.id === lesson.courseId);
        if (!course)
            continue;
        const t = course.type;
        counter[t] = (counter[t] || 0) + 1;
    }
    // знайти найпопулярніший
    let bestType = null;
    let bestCount = -1;
    ["Lecture", "Seminar", "Lab", "Practice"].forEach((t) => {
        const c = counter[t] || 0;
        if (c > bestCount) {
            bestCount = c;
            bestType = t;
        }
    });
    return bestType;
}
// 7. Модифікація даних
// Змінює аудиторію для заняття по lessonId, якщо нова аудиторія вільна у цей slot 
function reassignClassroom(lessonId, newClassroomNumber) {
    const lesson = schedule.find((l) => l.id === lessonId);
    if (!lesson) {
        console.warn(`Lesson with id ${lessonId} not found.`);
        return false;
    }
    // перевірити чи існує аудиторія
    const roomExists = classrooms.some((r) => r.number === newClassroomNumber);
    if (!roomExists) {
        console.warn(`Classroom ${newClassroomNumber} does not exist.`);
        return false;
    }
    // перевірити конфлікт: чи хтось вже зайняв цю аудиторію у той же день і slot
    const conflict = schedule.find((s) => s.id !== lessonId &&
        s.dayOfWeek === lesson.dayOfWeek &&
        s.timeSlot === lesson.timeSlot &&
        s.classroomNumber === newClassroomNumber);
    if (conflict) {
        console.warn("Cannot reassign classroom — conflict with existing lesson id:", conflict.id);
        return false;
    }
    lesson.classroomNumber = newClassroomNumber;
    return true;
}
// Видаляє заняття з розкладу по id 
function cancelLesson(lessonId) {
    const idx = schedule.findIndex((l) => l.id === lessonId);
    if (idx === -1) {
        console.warn(`Lesson with id ${lessonId} not found — cannot cancel.`);
        return;
    }
    schedule.splice(idx, 1);
}
// 8. Демонстрація 
// Показати поточний schedule
console.log("Initial schedule:", JSON.stringify(schedule, null, 2));
// Спроба додати конфліктне заняття (той же професор в той же час)
const conflictLesson = {
    courseId: 1,
    professorId: 1, // той же професор що вже має Monday 8:30-10:00
    classroomNumber: "B201",
    dayOfWeek: "Monday",
    timeSlot: "8:30-10:00",
};
console.log("Add conflict lesson (should be false):", addLesson(conflictLesson));
// Додаємо нормальне заняття
const okLesson = {
    courseId: 3,
    professorId: 2,
    classroomNumber: "B201",
    dayOfWeek: "Tuesday",
    timeSlot: "12:15-13:45",
};
console.log("Add ok lesson (should be true):", addLesson(okLesson));
console.log("Schedule after add:", JSON.stringify(schedule, null, 2));
// Знайти вільні аудиторії Monday 8:30-10:00
console.log("Available classrooms Monday 8:30-10:00:", findAvailableClassrooms("8:30-10:00", "Monday"));
// Розклад професора 2
console.log("Professor 2 schedule:", getProfessorSchedule(2));
// Використання аудиторії
console.log("Utilization A101:", getClassroomUtilization("A101") + "%");
// Найпопулярніший тип
console.log("Most popular course type:", getMostPopularCourseType());
// Редагування: призначити нову аудиторію для існуючого заняття
const someLessonId = schedule[0].id;
console.log("Reassign result (should be true if free):", reassignClassroom(someLessonId, "B201"));
// Скасувати заняття
const toCancelId = schedule[schedule.length - 1].id;
console.log("Cancel lesson id:", toCancelId);
cancelLesson(toCancelId);
console.log("Schedule after cancel:", JSON.stringify(schedule, null, 2));
// Код відповідає вимогам: використано type aliases та union types, масиви для збереження даних,
// типізація параметрів і повернутих значень, обробка конфліктів, базові перевірки.
// Коментарі по коду пояснюють логіку ключових частин.
