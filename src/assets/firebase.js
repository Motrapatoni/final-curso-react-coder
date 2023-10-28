import { initializeApp } from "firebase/app";
import {getFirestore, addDoc, collection, getDocs, getDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB_w3k1uJHg7YVPwxHwS7WyaW8LUsv8woE",
    authDomain: "coder-q-commerce.firebaseapp.com",
    projectId: "coder-q-commerce",
    storageBucket: "coder-q-commerce.appspot.com",
    messagingSenderId: "278796043051",
    appId: "1:278796043051:web:1b4a49d8ea55a08f36bb6e"
  };

const app = initializeApp(firebaseConfig);
console.log(app)

const db = getFirestore()

const cargarBDD = async () => {
    const promise = await fetch('./json/productos.json')
    const productos = await promise.json()
    productos.forEach(async (prod) => {
        await addDoc(collection(db,"productos"), { //collection si existe consulta si no existe crea
            idCategoria: prod.idCategoria,
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            detalle: prod.detalle,
            precio: prod.precio,
            stock: prod.stock,
            img: prod.img,
            srcset1: prod.srcset1,
            srcset2: prod.srcset2,
            imgbg: prod.imgbg
        })
    })
}

const getProductos = async () => {
    const productos = await getDocs(collection(db, "productos"))
    const items = productos.docs.map(prod => {
        return {...prod.data(), id:prod.id}
    })
    return items
}

const getProducto = async (id) => {
    const producto = await getDoc(doc(db, "productos", id))
    const item = {...producto.data(), id:producto.id}
    return item
}

const updateProducto = async (id, info) => {
    const estado = await updateDoc(doc(db, "productos", id), info)
    return estado
}

const deleteProducto = async (id) => {
    const estado = await deleteDoc(doc(db, "productos", id))
    return estado
}

const createOrdenCompra = async (cliente, productos, preTotal, fecha) => {
    const ordenCompra = await addDoc(collection(db, "ordenCompra"),{
        nombre: cliente.name,
        email: cliente.email,
        telefono: cliente.tel,
        entrega: cliente.entrega,
        direccion: cliente.address,
        productos: productos,
        fecha: fecha,
        precioTotal: preTotal
    })

    return ordenCompra
}

const getOrdenCompra = async (id) => {
    const ordenCompra = await getDoc(doc(db, "ordenCompra", id))
    const item = {...ordenCompra.data(), id: ordenCompra.id}
    return item
}

export {cargarBDD, getProductos, getProducto, updateProducto, deleteProducto, createOrdenCompra, getOrdenCompra}