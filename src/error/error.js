export class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.message = message,
    this.status  = 400
  }
}
export class NotAuthourized extends BadRequest{
  constructor(message){
    super(message);
    this.message = message,
    this.status  = 401
  }
}

export class ServerError extends BadRequest{
  constructor(message){
    super(message);
    this.message = message,
    this.status  = 500
  }
}