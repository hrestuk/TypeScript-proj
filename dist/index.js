"use strict";
// ===================== ENUMS =====================
var StudentStatus;
(function (StudentStatus) {
    StudentStatus[StudentStatus["Active"] = 0] = "Active";
    StudentStatus[StudentStatus["Academic_Leave"] = 1] = "Academic_Leave";
    StudentStatus[StudentStatus["Graduated"] = 2] = "Graduated";
    StudentStatus[StudentStatus["Expelled"] = 3] = "Expelled";
})(StudentStatus || (StudentStatus = {}));
var CourseType;
(function (CourseType) {
    CourseType[CourseType["Mandatory"] = 0] = "Mandatory";
    CourseType[CourseType["Optional"] = 1] = "Optional";
    CourseType[CourseType["Special"] = 2] = "Special";
})(CourseType || (CourseType = {}));
var Semester;
(function (Semester) {
    Semester[Semester["First"] = 0] = "First";
    Semester[Semester["Second"] = 1] = "Second";
})(Semester || (Semester = {}));
var GradeValue;
(function (GradeValue) {
    GradeValue[GradeValue["Excellent"] = 5] = "Excellent";
    GradeValue[GradeValue["Good"] = 4] = "Good";
    GradeValue[GradeValue["Satisfactory"] = 3] = "Satisfactory";
    GradeValue[GradeValue["Unsatisfactory"] = 2] = "Unsatisfactory";
})(GradeValue || (GradeValue = {}));
var Faculty;
(function (Faculty) {
    Faculty[Faculty["Computer_Science"] = 0] = "Computer_Science";
    Faculty[Faculty["Economics"] = 1] = "Economics";
    Faculty[Faculty["Law"] = 2] = "Law";
    Faculty[Faculty["Engineering"] = 3] = "Engineering";
})(Faculty || (Faculty = {}));
// ===================== CLASS =====================
class UniversityManagementSystem {
    constructor() {
        this.students = [];
        this.courses = [];
        this.grades = [];
        this.nextStudentId = 1;
    }
    // Реєстрація нового студента
    enrollStudent(student) {
        const newStudent = Object.assign(Object.assign({}, student), { id: this.nextStudentId++ });
        this.students.push(newStudent);
        return newStudent;
    }
    // Реєстрація на курс
    registerForCourse(studentId, courseId) {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        if (!student)
            throw new Error("Student not found");
        if (!course)
            throw new Error("Course not found");
        if (student.faculty !== course.faculty)
            throw new Error("Student cannot register for this course (faculty mismatch)");
        if (course.enrolledStudents >= course.maxStudents)
            throw new Error("Course is full");
        course.enrolledStudents++;
    }
    // Встановлення оцінки
    setGrade(studentId, courseId, grade) {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        if (!student)
            throw new Error("Student not found");
        if (!course)
            throw new Error("Course not found");
        if (course.enrolledStudents === 0)
            throw new Error("Student not registered for this course");
        this.grades.push({ studentId, courseId, grade, date: new Date(), semester: course.semester });
    }
    // Зміна статусу студента
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find(s => s.id === studentId);
        if (!student)
            throw new Error("Student not found");
        student.status = newStatus;
    }
    // Студенти певного факультету
    getStudentsByFaculty(faculty) {
        return this.students.filter(s => s.faculty === faculty);
    }
    // Оцінки студента
    getStudentGrades(studentId) {
        return this.grades.filter(g => g.studentId === studentId);
    }
    // Доступні курси
    getAvailableCourses(faculty, semester) {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester && c.enrolledStudents < c.maxStudents);
    }
    // Середня оцінка студента
    calculateAverageGrade(studentId) {
        const grades = this.getStudentGrades(studentId);
        if (grades.length === 0)
            return 0;
        return grades.reduce((sum, g) => sum + g.grade, 0) / grades.length;
    }
    // Список відмінників по факультету
    getTopStudents(faculty) {
        return this.students
            .filter(s => s.faculty === faculty)
            .filter(s => this.calculateAverageGrade(s.id) >= GradeValue.Excellent);
    }
    // Додаємо курс у систему
    addCourse(course) {
        const newCourse = Object.assign(Object.assign({}, course), { enrolledStudents: 0 });
        this.courses.push(newCourse);
        return newCourse;
    }
}
// ===================== TESTING =====================
const ums = new UniversityManagementSystem();
const student1 = ums.enrollStudent({
    fullName: "Кіліан Мбаппе",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS101"
});
const course1 = ums.addCourse({
    id: 1,
    name: "TypeScript Basics",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30
});
ums.registerForCourse(student1.id, course1.id);
ums.setGrade(student1.id, course1.id, GradeValue.Excellent);
console.log(ums.getStudentsByFaculty(Faculty.Computer_Science));
console.log(ums.getStudentGrades(student1.id));
console.log(ums.calculateAverageGrade(student1.id));
console.log(ums.getTopStudents(Faculty.Computer_Science));
