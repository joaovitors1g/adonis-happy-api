'use strict'

const { validateAll } = use('Validator')

class SessionController {
   async store({ request, auth }) {

      const rules = {
         email: 'required|email',
         password: 'required|min:6|max:30',
      };

      const validation = await validateAll(request.all(), rules);

      if (validation.fails()) {
         return validation.messages();
      }

      const {
         email,
         password
      } = request.only(['email', 'password']);

      const { token } = await auth.attempt(email, password);

      return {
         token
      }
   }
}

module.exports = SessionController
