'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/orphanages', 'OrphanageController.index').middleware(['auth'])

Route.post('/orphanages', 'OrphanageController.store')
   .middleware(['auth'])
   .validator('OrphanageStore')

Route.get('/users', 'UserController.index')

Route.post('/users', 'UserController.store').middleware(['guest'])

Route.post('/session', 'SessionController.store').middleware(['guest'])
