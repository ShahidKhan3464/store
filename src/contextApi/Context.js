import React, { useState, createContext, useContext } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const token = localStorage.getItem('token')
    const [cartItems, setCartItems] = useState([])
    const [loggedIn, setLoggedIn] = useState(token)

    const addItemToCart = (addItem) => {
        setCartItems([...cartItems, addItem])
    }

    const increase = (id) => {
        let incrCart = cartItems.map(item => {
            if (item.id === id) return { ...item, quantity: item.quantity + 1 }
            return item
        })
        setCartItems(incrCart)
    }

    const decrease = (id) => {
        let decrCart = cartItems.map(item => {
            if (item.id === id) return { ...item, quantity: item.quantity - 1 }
            return item
        })
        setCartItems(decrCart)
    }

    const remove = (id) => {
        setCartItems(currentItems => cartItems.filter(item => item.id !== id))
    }

    // const handleLogOut = () => {
    //     localStorage.clear()
    //     setLoggedIn(null)
    // }

    return (
        <AppContext.Provider value={{
            loggedIn,
            cartItems,
            setLoggedIn,
            addItemToCart,
            increase,
            decrease,
            remove,
        }}>
            {children}
        </AppContext.Provider >
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}