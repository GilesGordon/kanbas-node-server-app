// import db from "../Database/index.js";
// function ModuleRoutes(app) {
//     app.put("/api/modules/:mid", (req, res) => {
//         const { mid } = req.params;
//         const moduleIndex = db.modules.findIndex(
//           (m) => m._id === mid);
//         db.modules[moduleIndex] = {
//           ...db.modules[moduleIndex],
//           ...req.body
//         };
//         res.sendStatus(204);
//       });    
//     app.delete("/api/modules/:mid", (req, res) => {
//         const { mid } = req.params;
//         db.modules = db.modules.filter((m) => m._id !== mid);
//         res.sendStatus(200);
//       });
    
//     app.post("/api/courses/:cid/modules", (req, res) => {
//         const { cid } = req.params;
//         const newModule = {
//             ...req.body,
//             course: cid,
//             _id: new Date().getTime().toString(),
//         };
//         db.modules.push(newModule);
//         res.send(newModule);
//         });
        
//     app.get("/api/courses/:cid/modules", (req, res) => {
//         const { cid } = req.params;
//         const modules = db.modules
//         .filter((m) => m.course === cid);
//         res.send(modules);
//     });
// }
// export default ModuleRoutes;




import * as dao from "./dao.js";
import * as courseDao from "../courses/dao.js";

export default function ModuleRoutes(app) {
  const createModule = async (req, res) => {
    let module = req.body;
    const { cid } = req.params;
    const course = await courseDao.findCourseById(cid);
    const courseNum = course.number;
    module.course = courseNum;
    const newModule = await dao.createModule(module)
    res.json(newModule);
  };

  const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.mid);
    res.json(status);
  };

  const findModulesForCourse = async (req, res) => {
    const { cid } = req.params;
    const course = await courseDao.findCourseById(cid);
    const courseNum = course.number;
    const modules = await dao.findAllModules();
    const filteredModules = modules.filter((m) => m.course === courseNum);
    // console.log("filtered" + filteredModules);
    res.json(filteredModules);
  };

  const updateModule = async (req, res) => {
    const status = await dao.updateModule(req.params.mid, req.body);
    res.json(status);
  };
  app.post("/api/courses/:cid/modules", createModule);
  app.get("/api/courses/:cid/modules", findModulesForCourse);
  app.put("/api/modules/:mid", updateModule);
  app.delete("/api/modules/:mid", deleteModule);
}
