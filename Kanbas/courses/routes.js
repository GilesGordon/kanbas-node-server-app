// import Database from "../Database/index.js";
// export default function CourseRoutes(app) {
//   app.put("/api/courses/:id", (req, res) => {
//     const { id } = req.params;
//     const course = req.body;
//     Database.courses = Database.courses.map((c) =>
//         c._id === id ? { ...c, ...course } : c
//     );
//     res.sendStatus(204);
//     });
    
//   app.delete("/api/courses/:id", (req, res) => {
//     const { id } = req.params;
//     Database.courses = Database.courses
//         .filter((c) => c._id !== id);
//     res.sendStatus(204);
//     });
//   app.post("/api/courses", (req, res) => {
//     const course = { ...req.body,
//         _id: new Date().getTime().toString() };
//     Database.courses.push(course);
//     res.send(course);
//     });
//   app.get("/api/courses", (req, res) => {
//     const courses = Database.courses;
//     res.send(courses);
//   });
//   app.get("/api/courses/:id", (req, res) => {
//     const { id } = req.params;
//     const course = Database.courses
//       .find((c) => c._id === id);
//     if (!course) {
//       res.status(404).send("Course not found");
//       return;
//     }
//     res.send(course);
//   });

// }

import * as dao from "./dao.js";
export default function CourseRoutes(app) {

  const addNewCourse = async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  };

  const deleteCourse = async (req, res) => {
    const status = await dao.deleteCourse(req.params.courseId);
    res.json(status);
};
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };
  const findCourseById = async (req, res) => { 
  };
  const updateCourse = async (req, res) => {
    // const { courseId } = req.params;
    // const status = await dao.updateCourse(courseId, req.body);
    // currentCourse = await dao.findCourseById(courseId);
    // res.json(status);
    const status = await dao.updateCourse(req.params.courseId, req.body);
    res.json(status);
  };
  app.post("/api/courses", addNewCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:courseId", findCourseById);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
}
