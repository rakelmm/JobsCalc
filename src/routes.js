const express = require('express');
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const Jobcontroller = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

routes.get('/', DashboardController.index)
routes.get('/job', Jobcontroller.create)
routes.post('/job', Jobcontroller.save)
routes.get('/job/:id', Jobcontroller.show)
routes.post('/job/:id', Jobcontroller.update)
routes.post('/job/delete/:id', Jobcontroller.delete)
routes.get('/profile', ProfileController.index) 
routes.post('/profile', ProfileController.update)

module.exports = routes;    