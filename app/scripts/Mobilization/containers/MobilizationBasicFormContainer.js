import React from 'react'


// Validate form with redux-form
const validateForm = (data) => {
  const errors = { valid: true }

  if (!data.name) {
    errors.name = 'Insira o nome da mobilização'
    errors.valid = false
  } else if (data.name.length > 100) {
    errors.name = 'Seu título está muito longo!'
    errors.valid = false
  }

  if (!data.goal) {
    errors.goal = 'Insira o objetivo da mobilização'
    errors.valid = false
  } else if (data.goal.length > 500) {
    errors.goal = 'O limite de caracteres foi atingido.'
    errors.valid = false
  }

  return errors
}
