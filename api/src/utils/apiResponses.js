//--------------------------------------------------------
import { Result } from '@sf/models'
//--------------------------------------------------------
export function ok(reply, data, itemCount, message = 'Ok') {
  let result = new Result();
  result.setSuccess(message, data, itemCount)
  reply.code(200).send(result)
}
//--------------------------------------------------------
export function created(reply, data, message = "Created") {
  let result = new Result();
  result.setSuccess(message, data)
  reply.code(201).send(result)
}
//--------------------------------------------------------
//--------------------------------------------------------
export function unauthorized(reply, message = 'Unauthorized') {
  let result = new Result();
  result.setFailure(message)
  reply.code(401).send(result)
}
//--------------------------------------------------------
export function notFound(reply, message = 'Not found') {
  let result = new Result();
  result.setFailure(message)
  reply.code(404).send(result)
}
//--------------------------------------------------------
export function badRequest(reply, message = 'Invalid request') {
  let result = new Result();
  result.setFailure(message)
  reply.code(400).send(result)
}
//--------------------------------------------------------
export function serverError(reply, message = 'Server error') {
  let result = new Result();
  result.setFailure(message)
  reply.code(500).send(result)
}
//--------------------------------------------------------