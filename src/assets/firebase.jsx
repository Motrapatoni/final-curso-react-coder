import { doc, setDoc, addDoc, collection, getDocs, getDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore'
import { db } from "./configFirebase";

const dbConnect = db
const productsCollection = 'products';
const orderCollection = 'ordenCompra'

async function getProducts() {
    const product = query(collection(dbConnect, productsCollection))
    const productSnapshot = await getDocs(product);
    const productList = productSnapshot.docs.map(doc => doc.data());
    return productList;
}

const cargarBDD = async () => {
    const productos = getProducts()
    productos.forEach(async (prod) => {
        await addDoc(collection(dbConnect, productsCollection), { 
            idCategoria: prod.category,
            nombre: prod.name,
            descripcion: prod.descripcion,
            detalle: prod.description,
            precio: prod.price,
            stock: prod.quantity,
            img: prod.image,
        })
    })
}

const getProductos = async () => {
    const productos = await getDocs(collection(dbConnect, productsCollection))
    const items = productos.docs.map(prod => {
        return { ...prod.data(), id: prod.id }
    })
    return items
}

const getProducto = async (id) => {
    const producto = await getDoc(doc(dbConnect, productsCollection, id))
    const item = { ...producto.data(), id: producto.id }
    return item
}

const updateProducto = async (id, info) => {
    const estado = await updateDoc(doc(dbConnect, productsCollection, id), info)
    return estado
}

const deleteProducto = async (id) => {
    const estado = await deleteDoc(doc(dbConnect, productsCollection, id))
    return estado
}

const createOrdenCompra = async (cliente, productos, preTotal, fecha) => {
    const ordenCompra = await addDoc(collection(dbConnect, orderCollection), {
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
    const ordenCompra = await getDoc(doc(dbConnect, orderCollection, id))
    const item = { ...ordenCompra.data(), id: ordenCompra.id }
    return item
}

export { cargarBDD, getProductos, getProducto, updateProducto, deleteProducto, createOrdenCompra, getOrdenCompra }
