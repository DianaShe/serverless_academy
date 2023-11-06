const ctrlWrapper = require('../../utilities/ctrlWrapper')
const signUp = require('./signUp')
const signIn = require('./signIn')
const getCurrent = require('./getCurrent')

module.exports = {
    signUp: ctrlWrapper(signUp),
    signIn: ctrlWrapper(signIn),
    getCurrent: ctrlWrapper(getCurrent)
}