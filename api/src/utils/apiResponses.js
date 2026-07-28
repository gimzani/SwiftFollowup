//--------------------------------------------------------
import AppResult from '@models/models/AppResult'
//--------------------------------------------------------
export function ok(reply, data, itemCount, message = 'Ok') {
  const response = AppResult.success(message, data, itemCount)
  reply.code(200).send(response)
}
//--------------------------------------------------------
export function created(reply, data, message = "Created") {
  const response = AppResult.success(message, data, itemCount)
  reply.code(201).send(response)
}
//--------------------------------------------------------
//--------------------------------------------------------
export function unauthorized(reply, message = 'Unauthorized') {
  const response = AppResult.failure(message)
  reply.code(401).send(response)
}
//--------------------------------------------------------
export function notFound(reply, message = 'Not found') {
  const response = AppResult.failure(message)
  reply.code(404).send(response)
}
//--------------------------------------------------------
export function badRequest(reply, message = 'Invalid request') {
  const response = AppResult.failure(message)
  reply.code(400).send(response)
}
//--------------------------------------------------------
export function serverError(reply, message = 'Server error') {
  const response = AppResult.failure(message)
  reply.code(500).send(response)
}
//--------------------------------------------------------