import prisma from "../utils/db.js";
import logger from "../utils/logger.js";
import redis from "../cache/redis.js";

export const createProduct = async (req, res) => {
    try {
        const {name,price,stock} = req.body;
        if (!name || !price || !stock){
            logger.error("Missing required fields")
            return res.status(400).json({error:"Missing required fields"})
        }
        const product = await prisma.product.create({
            data:{
                name,
                price,
                description
            }
        })
        logger.info("Product created successfully",{product})
        res.status(201).json(product)
    } catch (error) {
        logger.error("Error creating product",{error})
        res.status(500).json({error:"Internal server error"})
    }
}

export const getAllProducts = async (req,res)=>{
    try {
        const cachedProducts = await redis.get("products");
        if(cachedProducts){
            logger.info("Products fetched from cache",{cachedProducts})
            return res.status(200).json(JSON.parse(cachedProducts))
        }
        const products = await prisma.product.findMany();
        await redis.set("products",JSON.stringify(products),"EX",3600)
        logger.info("Products fetched successfully",{products})
        res.status(200).json(products)
    } catch (error) {
        logger.error("Error getting all products",{error})
        res.status(500).json({error:"Internal server error"})
    }
}

export const getProductById = async(req,res)=>{
    try {
        const cachedProduct = await redis.get(`product:${req.params.id}`);
        if(cachedProduct){
            logger.info("Product fetched from cache",{cachedProduct})
            return res.status(200).json(JSON.parse(cachedProduct))
        }
        const {id} = req.params;
        const product = await prisma.product.findUnique({
            where : {
                id:id
            }
        })
        if(!product){
            logger.error("Product not found")
            return res.status(404).json({error:"Product not found"})
        }
        await redis.set(`product:${id}`,JSON.stringify(product),"EX",3600)
        logger.info("Product fetched successfully",{product})
        res.status(200).json(product)
    } catch (error) {
        logger.error("error getting by single product",{error})
        res.status(500).json({error:"Internal server error"})
    }
}