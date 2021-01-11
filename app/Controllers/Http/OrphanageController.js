'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Schemes/Jwt')} Auth */
/** @typedef {import('@adonisjs/ignitor/src/Helpers')} Helpers */

/**
 * @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}
 */
const Orphanage = use('App/Models/Orphanage');

/**
 * @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}
 */
const Image = use('App/Models/Image');

/**
 * @type {import('@adonisjs/ignitor/src/Helpers')}
 */
const Helpers = use('Helpers')

const crypto = require('crypto');


/**
 * Resourceful controller for interacting with orphanages
 */
class OrphanageController {
  /**
   * Show a list of all orphanages.
   * GET orphanages
   */
  async index () {
     return Orphanage.query().with('user').with('images').fetch();
  }

  /**
   * Create/save a new orphanage.
   * POST orphanages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async store ({ request, response, auth }) {
    const images = request.file('images', {
      types: ['image'],
      size: '2mb'
    });

   const {
     name,
     latitude,
     longitude,
     about,
     instructions,
     opening_hours,
     open_on_weekends,
   } = request.all();

   await images.moveAll(Helpers.tmpPath('uploads'), file => {
      return {
         name: `${crypto.randomBytes(16).toString('hex')}.${file.subtype}`
       }
   });

   if (!images.movedAll()) {
     return images.errors()
   }

   const data = {
     name,
     latitude,
     longitude,
     about,
     instructions,
     opening_hours,
     open_on_weekends: open_on_weekends === 'true',
     user_id: Number(auth.user.id),
   };

   const orphanage = await Orphanage.create(data);

   images.movedList().forEach((image) => Image.create({
      path: image.fileName,
      orphanage_id: orphanage.id
   }));

   return orphanage;
  }

    /**
   * Get single orphanage by id
   * GET orphanages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

   async show({ request, response, params }) {
      return Orphanage.findOrFail(params.id);
   }
}

module.exports = OrphanageController
