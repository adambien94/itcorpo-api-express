const express = require('express');
const app = express();

import { getProjectWithEmployees, getBenefit } from './api'
import { yamlReader } from './api/yamlReader';
// const { getProjectWithEmployees } = require('./api')

// CHAIN OF RESPONSIBILITY // pierwszy który obsłuży - zamyka temat
// middleware // każdy może coś dodać, ale tylko jeden może wysłać odpowiedź

// TODO: npmjs:yargs
const PORT = 3010

app.get('/', (req, res, next) => {
  res.send("facade")
  next() // podaj dalej
})

app.get('/projects/:id', async (req, res, next) => {
  const projectId = req.params.id
  console.log(`received request with projectId:${projectId}`)
  const project = await getProjectWithEmployees(projectId)
  res.status(200).send(project)

  next()
})

const path = require('path')
app.get('/benefits', async (req,res, next) => {

  const exampleYaml = path.join(__dirname, './benefits/benefits-ES.yaml')

  const file = yamlReader.getContent(exampleYaml)
  console.log('filefilefilefilefilefilefilefilefilefile',file)
  const benefits = await getBenefit()
  res.status(200).send(benefits)

  next()
})

app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`)
})
