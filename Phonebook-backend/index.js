const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};
//adding to
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  if (!body.name) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "number must be unique",
    });
  }
  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "number must be unique",
    });
  }

  persons = persons.concat(person);
  response.json(person);
});
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
});
//info page
app.get("/info", (request, response) => {
  const newdate = new Date();
  response.send(
    `phone book has info for ${persons.length} people<br>${newdate}`
  );
});
//home page
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});
//getting all persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
  console.log(persons);
});
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
