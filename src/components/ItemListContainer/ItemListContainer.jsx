import React from 'react'
import { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { useDarkModeContext } from '../../Context/DarkModeContext'
import { getProductos } from '../../assets/firebase'

const ItemListContainer = () => {
    const {darkMode} = useDarkModeContext()
    const [productos, setProductos] = useState([])
    const {category} = useParams()
    useEffect(() => {
        if(category) {
            getProductos().then(products => {
                const productList = products.filter(prod => prod.quantity > 0).filter(prod => prod.category === category)
                const cardProductos = ItemList({productList})
                setProductos(cardProductos)
            })
        } else {
            getProductos().then(products => {
                const productList = products.filter(prod => prod.quantity > 0)
                const cardProductos = ItemList({productList})
                setProductos(cardProductos)
            })
        }
    }, [category]);
    return (
        <>
            <main className={`relative pb-10 ${darkMode ? "bg-dark-blue" : "bg-white"}`}>
                <div className='lg-min:flex lg-min:justify-center min-w-0 min-h-0 flex md:flex md:justify-center sm-max:justify-center sm-max:flex mt-10'>
                    <div className='lg-min:block lg-min:w-full min-w-0 min-h-0 flex md:block md:w-full md:max-w-[1248px] sm-max:block sm-max:w-full sm-max:max-w-[1248px] '>
                        <div className='lg-min:px-8 lg-min:max-w-[1504px] w-full mx-auto md:px-4 sm-max:px-4'>
                            <div className='lg-min:flex lg-min:items-center lg-min:flex-col lg-min:mb-16 lg-min:mt-16 flex min-h-0 min-w-0 md:items-center md:flex-col md:flex md:mb-16 md:mt-16 sm-max:mb-16 sm-max:mt-16 sm-max:items-center sm-max:flex sm-max:flex-col'>
                                <h1 className={`lg-min:text-center lg-min:text-5xl lg-min:font-medium outline-none  md:text-center md:text-5xl md:font-medium sm-max:text-center sm-max:font-medium sm-max:text-4xl ${darkMode ? "text-white" : "text-dark-gray-text"}`}>Comprar productos</h1>
                            </div>
                            <div className='-mt-2 flex shrink-0 grow basis-full flex-wrap'>
                                {productos}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ItemListContainer