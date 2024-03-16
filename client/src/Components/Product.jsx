import styles from "./Product/Product.module.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useState } from "react";


const Product = () => {
   const [preferenceId, setPreferenceId] = useState(null)

    initMercadoPago("TEST-24c1c24d-a669-4793-9e95-a44f9e2152ba",{locale:"es-AR",});
  
  const createPreference= async()=>{
    try {
        const response = await axios.post("http://localhost:3000/create_preference",{
            title:"Bananita dolca",
            quantity: 1,
            price: 300,
        });

        const {id} = response.data
        return id;
        
    } catch (error) {
        console.log(error)
    }
  };


  const handleBuy = async ()=>{
    const id = await createPreference();
    if (id){
        setPreferenceId(id);
    }
  };


  return (
    <div className={styles.cardProductContainer}>
      <div className={styles.cardProduct}>
        <div className={styles.card}>
          <img
            src="https://d22fxaf9t8d39k.cloudfront.net/5b6d3ae252a3e0030d37bd433e437acfe5f1ef76afdc241ffa26623d1626db4c81989.png"
            alt="product-image"
          />
          <h3>Bananita dolca</h3>
          <p className={styles.price}>$300</p>
          <button onClick={handleBuy}>Comprar</button>
          {preferenceId &&  <Wallet initialization={{ preferenceId: preferenceId }}
           customization={{ texts: { valueProp: "smart_option" } }}
          />}
         
        </div>
      </div>
    </div>
  );
};

export default Product;
