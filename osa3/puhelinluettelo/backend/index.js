const express = require('express');
const morgan = require('morgan');
require('dotenv').config()
const Person = require('./models/person')

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },  
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  }
]

const app = express();

app.use(express.static('dist'));
app.use(express.json());

morgan.token('body', function (req, res) { return req.method === 'POST' ? JSON.stringify(req.body) : '' })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(people => {
      res.json(people)
    })
    .catch(error => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if ( !person ) {
        return res.status(404).end();
      }
      res.json(person);
    })
    .catch(error => next(error));
});

app.get('/info', (req, res, next) => {
  Person.find({})
    .then(people => {
      const date = new Date();
      res.send(`<p>Phonebook has info for ${people.length} people</p><p>${date}</p>`);
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(results => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  Person.findById(req.params.id)
    .then(person => {
      if ( !person ) {
        return res.status(404).end();
      }

      person.name = name;
      person.number = number;
      
      return person.save().then((updatedPerson => {
        res.json(updatedPerson);
      }));
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  const person = new Person({
    name, 
    number,
  });

  person.save()
    .then(result => {
      console.log(`Added ${person.name} number ${person.number} to phonebook`)
      res.status(201).json(person);
    })
    .catch(error => next(error))
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if ( error.name === 'CastError' ) {
    return response.status(400).send({ error: 'malformatted id' })
  } else if ( error.name === 'ValidationError' ) {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
