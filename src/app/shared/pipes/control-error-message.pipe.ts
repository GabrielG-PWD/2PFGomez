import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlErrorMessage'
})
export class ControlErrorMessagePipe implements PipeTransform {

  transform(error: {key:string, value: any}, ...args: unknown[]): unknown {
    const errorMessages:Record<string,string> = {
      required: 'Este campo es requerido.',
      email: 'Debe ser un email válido.',
      minlength: 'El largo no cumple con el requerido.',
      min: 'debe ser mayor o igual a cero.',
      max: 'Debe ser menor o igual a 10'
    }

    return errorMessages[error.key];
  }

}
