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

let prueba = new Arbol()
prueba.insertar(10)
prueba.insertar(4)
prueba.insertar(2)
prueba.insertar(5)
prueba.insertar(9)
prueba.insertar(20)
prueba.insertar(17)
prueba.insertar(170)
prueba.insertar(150)
prueba.insertar(130)
prueba.insertar(160)
prueba.insertar(180)

const PreOrden = [
    10, 4, 2, 5, 9, 20, 17, 170, 150, 130, 160, 180
];

const InOrden = [
    2, 4, 5, 9, 10, 17, 20, 130, 150, 160, 170, 180
];

const PostOrden = [
    2, 9, 5, 4, 17, 130, 160, 150, 180, 170, 20, 10
];

let recorridoPreOrden = [];
let recorridoInOrden = [];
let recorridoPostOrden = [];

function preOrden(actual) {

    recorridoPreOrden.push(actual.value)

    if (actual.izquierda) {
        preOrden(actual.izquierda)
    }

    if (actual.derecha) {
        preOrden(actual.derecha)
    }
    return this;
}

function inOrden(actual) {

    if (actual.izquierda) {
        inOrden(actual.izquierda)
    }

    recorridoInOrden.push(actual.value)

    if (actual.derecha) {
        inOrden(actual.derecha)
    }

    return this;
}

function postOrden(actual) {
    
    if (actual.izquierda) {
        if (actual.izquierda != null) {
            postOrden(actual.izquierda)
        }
    }

    if (actual.derecha) {
        if (actual.derecha != null) {
            postOrden(actual.derecha)
        }
    }

    recorridoPostOrden.push(actual.value);
    return recorridoPostOrden;
}

preOrden(prueba.raiz)
inOrden(prueba.raiz)
postOrden(prueba.raiz)

console.log(recorridoPreOrden)
console.log(recorridoInOrden)
console.log(recorridoPostOrden)
