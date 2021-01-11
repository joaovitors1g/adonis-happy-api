'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */


/**
 * @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}
 */
const User = use('App/Models/User');

const { validateAll } = use('Validator')

class UserController {
   /**
   * Show a list of all users
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
   async index() {
      return User.query().with('orphanages').with('orphanages.images').fetch();
   }


   /**
   * Create/save a new user
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store({ request, response }) {
      const rules = {
         email: 'required|email|unique:users',
         password: 'required|min:6|max:30',
         name: 'required'
      };

      const validation = await validateAll(request.all(), rules);

      if (validation.fails()) {
         return validation.messages();
      }

      const userData = request.only(['name', 'email', 'password']);

      const user = await User.create(userData);

      return response.created(user);
   }

   /**
   * Show a single user
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
   async show({ response, params }) {
      const id = Number(params.id);

      if (isNaN(id)) {
         return response.badRequest({
            error: '`id` must be a number'
         });
      }

      return User.findOrFail(id);
   }
}

module.exports = UserController
