import { BaseError } from "./BaseError";

export class BadRequest extends BaseError {
    constructor(
        message: string = "Requisição inválida",
    ) {
        super(400, message)
    }
}