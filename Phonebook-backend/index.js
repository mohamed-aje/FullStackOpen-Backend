require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser"); // <=== this line
app.use(bodyParser.json()); //<=== This line
const Person = require("./models/person");
app.use(express.static("build"));
const cors = require("cors");
const person = require("./models/person");
app.use(cors());
morgan.token("object", function (req) {
  return `${JSON.stringify(req.body)}`;
});

app.use(morgan(":method :url :status :response-time :req[header] :object"));

//const generateId = () => {
//const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
//return maxId + 1;
//};
app.get("/api/persons/:id", (req, res, next) => {
  person
    .findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});
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
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);
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

app.delete("/api/persons/:id", (req, res, next) => {
  person
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

//info page
app.get("/info", (request, response) => {
  const newdate = new Date();
  response.send(
    `phone book has info for ${person.length} people<br>${newdate}`
  );
});
//home page

//getting all persons

//getting collection by id

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
