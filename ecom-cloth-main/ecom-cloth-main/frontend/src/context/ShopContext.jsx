import { createContext, useEffect, useState } from "react"; 
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext(); 

const ShopContextProvider = (props) => {
    const currency = '$'; 
    const delivery_fee = 10; 
    const backendUrl = 'http://localhost:4000';

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const navigate = useNavigate();

    // ✅ Fetch products
    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error fetching products: " + error.message);
        }
    };

    // ✅ Fetch user's cart
    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, {
                headers: {
                    token: userToken,
                },
            });
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }
        } catch (error) {
            toast.error("Error fetching cart: " + error.message);
        }
    };

    // ✅ Add item to cart
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        const updatedCart = { ...cartItems };

        if (!updatedCart[itemId]) updatedCart[itemId] = {};
        updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;

        setCartItems(updatedCart);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, {
                    headers: { token },
                });
            } catch (error) {
                toast.error("Failed to sync cart: " + error.message);
            }
        }
    };

    // ✅ Update item quantity
    const updateQuantity = async (itemId, size, quantity) => {
        const updatedCart = { ...cartItems };
        updatedCart[itemId][size] = quantity;
        setCartItems(updatedCart);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, {
                    headers: { token },
                });
            } catch (error) {
                toast.error("Failed to update quantity: " + error.message);
            }
        }
    };

    // ✅ Get total number of cart items
    const getCartCount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                total += cartItems[itemId][size];
            }
        }
        return total;
    };

    // ✅ Get total cart amount
    const getCartAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);
            if (!product) continue;
            for (const size in cartItems[itemId]) {
                total += product.price * cartItems[itemId][size];
            }
        }
        return total;
    };

    // ✅ Get products & cart once on mount
    useEffect(() => {
        getProductsData();

        if (token) {
            getUserCart(token);
        }
    }, [token]);

    const value = {
        products,
        currency,
        delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, setCartItems,
        addToCart, getCartCount, updateQuantity, getCartAmount,
        navigate, backendUrl,
        token, setToken,
        setProducts,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
