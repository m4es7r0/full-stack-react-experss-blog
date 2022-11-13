const authMe = store => next => action => {

  return next(action)
}
export default authMe