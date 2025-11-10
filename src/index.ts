// ===================== ENUMS =====================
enum StudentStatus {
    Active,
    Academic_Leave,
    Graduated,
    Expelled
}

enum CourseType {
    Mandatory,
    Optional,
    Special
}

enum Semester {
    First,
    Second
}

enum GradeValue {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}

enum Faculty {
    Computer_Science,
    Economics,
    Law,
    Engineering
}

// ===================== INTERFACES =====================
interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
    enrolledStudents: number; // Додано для підрахунку
}

interface Grade {
    studentId: number;
    courseId: number;
    grade: GradeValue;
    date: Date;
    semester: Semester;
}

// ===================== CLASS =====================
class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: Grade[] = [];
    private nextStudentId = 1;

    // Реєстрація нового студента
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = { ...student, id: this.nextStudentId++ };
        this.students.push(newStudent);
        return newStudent;
    }

    // Реєстрація на курс
    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        if (!student) throw new Error("Student not found");
        if (!course) throw new Error("Course not found");
        if (student.faculty !== course.faculty) throw new Error("Student cannot register for this course (faculty mismatch)");
        if (course.enrolledStudents >= course.maxStudents) throw new Error("Course is full");
        course.enrolledStudents++;
    }

    // Встановлення оцінки
    setGrade(studentId: number, courseId: number, grade: GradeValue): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        if (!student) throw new Error("Student not found");
        if (!course) throw new Error("Course not found");
        if (course.enrolledStudents === 0) throw new Error("Student not registered for this course");
        this.grades.push({ studentId, courseId, grade, date: new Date(), semester: course.semester });
    }

    // Зміна статусу студента
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);
        if (!student) throw new Error("Student not found");
        student.status = newStatus;
    }

    // Студенти певного факультету
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    // Оцінки студента
    getStudentGrades(studentId: number): Grade[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    // Доступні курси
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester && c.enrolledStudents < c.maxStudents);
    }

    // Середня оцінка студента
    calculateAverageGrade(studentId: number): number {
        const grades = this.getStudentGrades(studentId);
        if (grades.length === 0) return 0;
        return grades.reduce((sum, g) => sum + g.grade, 0) / grades.length;
    }

    // Список відмінників по факультету
    getTopStudents(faculty: Faculty): Student[] {
        return this.students
            .filter(s => s.faculty === faculty)
            .filter(s => this.calculateAverageGrade(s.id) >= GradeValue.Excellent);
    }

    // Додаємо курс у систему
    addCourse(course: Omit<Course, "enrolledStudents">): Course {
        const newCourse: Course = { ...course, enrolledStudents: 0 };
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
