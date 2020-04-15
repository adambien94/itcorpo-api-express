import axios from "axios"
// const axios = require("axios").default

// config.js
export const EMPLOYEES_SVC_URL = 'http://localhost:3011'
export const PROJECTS_SVC_URL = 'http://localhost:3012'
export const BENEFITS_SVC_URL = 'http://localhost:3013'


// projects.js
// getProject(id)
export const getProject = (id) => {
  return axios.get(`${PROJECTS_SVC_URL}/projects/${id}`)
    .then(res => res.data)
}

// employees.js
// getEmployee(id)
// getEmployees(id[]) employees?id=X&id=Y...
export const getEmployee = async (id) => {
  const res = await axios.get(`${EMPLOYEES_SVC_URL}/employees/${id}`)
  return res.data
}

export const getBenefit = async () => {
  const res = await axios.get(`${BENEFITS_SVC_URL}/benefits`)
  console.log('@@res', res)
  return res.data
}

// public.js
export const getProjectWithEmployees = async (projectId) => {
  let projectData = await getProject(projectId)
  const manager = await getEmployee(projectData.manager)

  const promises = projectData.team.map(({ id }) => getEmployee(id))
  const team = await Promise.all(promises)
  const result = {
    ...projectData,
    team,
    manager
  }

  return result
}

// native node.js
module.exports = {
  getProjectWithEmployees,
  getBenefit
}
