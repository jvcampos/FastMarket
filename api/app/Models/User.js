'use strict'

const Model = use('Model')
const Encryption = use('Encryption')

class User extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Encryption.encrypt(userInstance.password)
      }
    })
  }
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
