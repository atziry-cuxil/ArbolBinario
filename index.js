class Nodo {
    constructor(value) {
        this.value = value;
        this.izquierda = null;
        this.derecha = null;
        this.estado = 'no'
    }
}

class Arbol {
    constructor() {
        this.raiz = null;
        this.contador = 0;
    }

    insertar(value) {
        this.contador++
        let nuevoNodo = new Nodo(value)
        if (this.raiz == null) {
            this.raiz = nuevoNodo
        } else {
            let actual = this.raiz
            while (true) {
                if (value < actual.value) {
                    if (!actual.izquierda) {
                        actual.izquierda = nuevoNodo;
                        return this;
                    }
                    actual = actual.izquierda;
                } else {
                    if (!actual.derecha) {
                        actual.derecha = nuevoNodo;
                        return this;
                    }
                    actual = actual.derecha;
                }
            }
        }
    }

    buscar(value) {
        if (this.raiz != null) {
            let actual = this.raiz
            while (true) {
                if (actual.value == value) {
                    if (actual.estado == 'si') {
                        actual.estado = 'no'
                    } else {
                        actual.estado = 'si'
                    }
                    return actual;
                }

                if (value < actual.value) {
                    if (actual.izquierda.value == value) {
                        if (actual.izquierda.estado == 'si') {
                            actual.izquierda.estado = 'no'
                        } else {
                            actual.izquierda.estado = 'si'
                        }
                        return actual.izquierda;
                    }
                    actual = actual.izquierda;
                } else {
                    if (actual.derecha.value == value) {
                        if (actual.derecha.estado == 'si') {
                            actual.derecha.estado = 'no'
                        } else {
                            actual.derecha.estado = 'si'
                        }
                        return actual.derecha;
                    }
                    actual = actual.derecha;
                }
            }
        }
    }
}

let prueba = new Arbol();
// prueba.insertar(10)
// prueba.insertar(4)
// prueba.insertar(20)
// prueba.insertar(2)
// prueba.insertar(8)
// prueba.insertar(5)
// prueba.insertar(9)
// prueba.insertar(17)
// prueba.insertar(170)

// prueba.insertar(8)
// prueba.insertar(4)
// prueba.insertar(2)
// prueba.insertar(6)
// prueba.insertar(10)
// prueba.insertar(9)
// prueba.insertar(11)
// prueba.insertar(18)

prueba.insertar(100)
prueba.insertar(90)
prueba.insertar(80)
prueba.insertar(70)
prueba.insertar(80)


let arrayPosiciones = [];
let ultimo = 0.000;

pintarArbol2(prueba.raiz)
function pintarArbol2(actual) {

    if (actual.izquierda) {
        if (actual.izquierda != null) {
            pintarArbol2(actual.izquierda)
        } else {
            //return arrayPosiciones.push(actual.actual)
        }
    }

    if (actual.derecha) {
        if (actual.derecha != null) {
            pintarArbol2(actual.derecha)
        } else {
            //return arrayPosiciones.push(actual.value)
        }
    }

    return arrayPosiciones.push(actual.value)
}

console.log(arrayPosiciones)

function preguntar(actual) {
    if (actual.izquierda != null) {
        preguntar(actual.izquierda)
        preguntarDerecha(actual.derecha)
        arrayPosiciones.push(actual.value)
    } else {
        return arrayPosiciones.push(actual.value);
    }

}

function preguntarDerecha(actual) {
    if (actual.derecha != null) {
        preguntar(actual.izquierda)
        preguntarDerecha(actual.derecha)
        arrayPosiciones.push(actual.value)
    } else {
        return arrayPosiciones.push(actual.value);
    }
}
console.log(arrayPosiciones)