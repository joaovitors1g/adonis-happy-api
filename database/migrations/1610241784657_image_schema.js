'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.string('path').notNullable()
      table.integer('orphanage_id')
         .references('id')
         .inTable('orphanages')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImageSchema
