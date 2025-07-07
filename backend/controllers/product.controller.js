import Products from "../models/products.model.js";


export const handleGetProducts = async (req, res) => {
    try {
        const allProducts = await Products.find();
        res.status(200).json(allProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const handleGetProductById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const handleAddProducts = async (req, res) => {
    const { name, description, price, category, stock, imageUrl } = req.body;
    try {
        const newProduct = new Products({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const handleRemoveProducts = async (req, res) => {
    try {
        const deletedProduct = await Products.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product removed successfully" });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const handleUpdateProducts = async (req, res) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
