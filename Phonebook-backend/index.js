require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Person = require("./models/person");

app.use(express.static("build"));
const cors = require("cors");
app.use(cors());
morgan.token("object", function (req) {
  return `${JSON.stringify(req.body)}`;
});

app.use(morgan(":method :url :status :response-time :req[header] :object"));

//const generateId = () => {
//const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
//return maxId + 1;
//};
//adding to
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    console.log(persons);
    response.json(persons);
  });
});
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});
{
  /*app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
});*/
}
//info page
app.get("/info", (request, response) => {
  const newdate = new Date();
  response.send(
    `phone book has info for ${persons.length} people<br>${newdate}`
  );
});
//home page

//getting all persons

//getting collection by id
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    response.status(404).end();
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
