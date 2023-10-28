import { useState, createContext, useContext } from "react";

const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

export const CartProvider = (props) => {
    const [carrito, setCarrito] = useState([]);
    

    const isInCart = (id) => {
        return carrito.find(producto => producto.id === id)    
    }

    const addItem = (producto, cantidad) => {
        if(isInCart(producto.id)) {
            const indice = carrito.findIndex(prod => prod.id === producto.id)
            const aux = [...carrito]
            aux[indice].cant = cantidad
            setCarrito(aux)
        } else {
            const nuevoProducto = {
                ...producto,
                cant: cantidad
            }
            setCarrito([...carrito,nuevoProducto])
        }
    }

    const emptyCart = () => {
        setCarrito([])
    }

    const removeItem = (id) => {
        setCarrito(carrito.filter(prod => prod.id !== id))
    }

    const getItemQuantity = () => {
        return carrito.reduce((acum,prod) => acum += prod.cant, 0)
    }

    const totalPrice = () => {
        return carrito.reduce((acum, prod) => acum += (prod.cant * prod.precio), 0)
    }
    
    return (
        <CartContext.Provider value={{carrito, isInCart, addItem, removeItem, emptyCart, getItemQuantity, totalPrice}}>
            {props.children}
        </CartContext.Provider>
    )
}