import CustomError from '../helpers/customError.js'

function handleError (err, req, res, next) {
  let customError = err
  if (!(err instanceof CustomError)) {
    customError = new CustomError(err)
  }

  res.status((customError).status).send(customError)
};

export default handleError
