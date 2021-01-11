'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrphanageSchema extends Schema {
  up () {
    this.create('orphanages', (table) => {
      table.increments()
      table.string('name', 150).notNullable().unique()
      table.decimal('latitude').notNullable()
      table.decimal('longitude').notNullable()
      table.text('about').notNullable()
      table.string('instructions').notNullable()
      table.string('opening_hours').notNullable()
      table.boolean('open_on_weekends').notNullable()
      table.integer('user_id')
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('orphanages')
  }
}

module.exports = OrphanageSchema
