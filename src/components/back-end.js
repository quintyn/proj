const express = require("express");
const router = express.Router();
const neo4j = require("neo4j-driver").v1;

//Creating a driver to connect to the Neo4j database
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "password")
);
const session = driver.session();

router.get("/", (req, res) => {
  //Fetching the project and assigned query parameters from the request
  const project = req.query.project;
  const assigned = req.query.assigned;
  let query = `MATCH (t:Task)<-[:ASSIGNED_TO]-(p:Project)<-[:WORKS_ON]-(m:Member)`;

  //Checking if project parameter is passed and adding a filter condition to the Cypher query
  if (project) {
    query += ` WHERE p.name CONTAINS '${project}'`;
  }
  //Checking if assigned parameter is passed and adding a filter condition to the Cypher query
  if (assigned) {
    query += ` WHERE m.name CONTAINS '${assigned}'`;
  }
  query += ` return t,p,m`;

  //Executing the Cypher query
  session
    .run(query)
    .then((result) => {
      //Mapping over the result records and extracting the properties of the tasks, projects, and members
      const tasks = result.records.map((record) => {
        return {
          id: record.get("t").identity.low,
          name: record.get("t").properties.name,
          project: record.get("p").properties.name,
          member: record.get("m").properties.name,
        };
      });
      //Returning the extracted properties as a JSON object in the response
      return res.status(200).send(tasks);
    })
    //Catching any errors that might occur during the execution of the query
    .catch((error) => console.log(error))
    //Closing the session
    .finally(() => session.close());
});

module.exports = router;
