function validation(input){

    const error = {};

    if(!input.name){
        error.name = "Debe ingresar una raza"
    } 

    if(!input.image){
        error.imagee = "Debes subir una imágen"
    }

    if(!input.temperament){
        error.temperament = "Debes ingresar uno o más temperamentos"
    }

    if(!input.lifeSpan){
        error.lifeSpan = "Debe ingresar una Esperanza de Vida "
    }

    if(!input.weightMin){
        error.weightMin = "Debe ingresar un peso mínimo"
    } else if (input.weightMin < 0){
        error.weightMin = "Debe ingrear un número mayor a 0"
    }

    if(!input.weightMax){
        error.weightMax = "Debe ingrear un peso máximo"
    } else if (input.weightMax < 0){
        error.weightMax = "Debe ingresar un número mayor a 0"
    } else if (input.weightMax < input.weightMin){
        error.weightMax = "El peso máximo debe ser mayor al peso mínimo"
    }

    if(!input.heightMin){
        error.heightMin = "Debe ingresar una altura mínima"
    } else if(input.heightMin < 0){
        error.heightMin = "Debe ingresar un número mayor a 0 "
    }

    if(!input.heightMax){
        error.heightMax = "Debe ingresar una altura máxima"
    } else if(input.heightMax < 0) {
        error.heightMax = "Debe ingresar un número mayor a 0"
    } else if (input.heightMax < input.heightMin){
        error.heightMax = "La altura máxima debe ser mayor a la altura mínima"
    }

    return error

}

export default validation;