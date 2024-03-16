import express from "express";
import cors from "cors";
//SDK de mercado pago
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({accessToken:"TEST-2865143991093379-031514-3879c690abe9e9588a92882937988cd4-154672887",
})



const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{ res.send("soy el server :)" ) });
app.post("/create_preference", async(req,res)=>{
    try {
        const body ={
            items:[{
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id:"ARS",
            },
        ],
        back_urls:{
            success:"https://www.google.com.ar",
            failure:"https://www.google.com.ar",
            pending:"https://www.google.com.ar",
        },
        auto_return:"approved"
        };

    const preference = new Preference(client);
    const result = await preference.create({body});
    res.json({id: result.id,});


    } catch (error) {
        console.log(error);
        res.status(500).json({error: "error al crear la preferencia :( "})

    }
});

app.listen(port, ()=>{console.log(`El servidor esta corriendo en el puerto ${port}`);})
