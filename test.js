const courses = [
  {id: 1, name:'course1'},
  {id: 2, name:'course2'},
  {id: 3, name:'course2'},
]

console.log(courses);

let course = courses.find(c => c.id === 2)

console.log(course);

let updatedCourse = {id:2, name:"java"}

course = [...course, updatedCourse]



console.log(courses);
console.log(course);