// Setting up the dependencies
const express = require("express");
const postgress = require("../../helpers");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.get("/getListOfChildrenTodos", (req, res) => {
  // Postgress query select all children todos
  postgress.query(`SELECT * FROM todochildren`, (err, result) => {
    // If error return error
    if (err) return res.status(400).send({ message: "Something went wrong!" });

    // Else return OK status with data
    res
      .status(200)
      .send({ message: "Successfully fetched data", data: result.rows });
  });

  // Postgress end
  postgress.end;
});

router.put("/updateTodoChildren", (req, res) => {
  // This function is going to toggle todo
  // If pending then update to completed
  // If completed then update to pending

  // Req body values
  const { id, status } = req.body;

  // If not id or status then return error
  if (!id || !status)
    return res
      .status(400)
      .send({ message: "Please don't forget to give a id or status" });

  // Else update the value
  postgress.query(
    `UPDATE todochildren
	SET status='${status === "pending" ? "completed" : "pending"}'
	WHERE id='${id}'`,
    (err, result) => {
      // If err return Error
      if (err)
        return res
          .status(400)
          .send({ message: "Something went wrong", data: err });

      // Else send the results
      res.send({ message: "Successfully updated data", data: result.rows });
    }
  );

  // Postgress end
  postgress.end;
});

router.post("/createTodoChildren", (req, res) => {
  // Setting up all request body values that we will use
  const { title, todoId } = req.body;

  // If not title or todo Id then give error
  if (!title || !todoId)
    return res.status(400).send({ message: "Please fill out all the forms" });

  // Random ID generator
  const id = uuidv4();

  // New Date
  const date = new Date();

  // Else create a Todo
  postgress.query(
    `INSERT INTO todochildren(
        id, title, status, todo_id, created_at)
        VALUES ('${id}', '${title}', 'pending', '${todoId}', '${date}')`,
    (err, result) => {
      // If error return Error
      if (err)
        return res
          .status(400)
          .send({ message: "Something went wrong!", data: err });

      // Else send the results
      res.send({ message: "Successfully created data", data: result.rows });
    }
  );

  // Postgress end
  postgress.end;
});

module.exports = router;
