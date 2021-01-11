'use strict'

const { formatters } = use('Validator')

class OrphanageStore {
  get rules () {
    return {
      name: 'required|unique:orphanages',
      latitude: 'required|number',
      longitude: 'required|number',
      instructions: 'required|max:200',
      opening_hours: 'required|max:100',
      open_on_weekends: 'required|boolean',
    }
  }

   get formatter() {
      return formatters.Vanilla
   }

 get validateAll() {
    return true;
 }
}

module.exports = OrphanageStore
