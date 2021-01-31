const express = require('express');
const { findByIdAndDelete } = require('../model/customer');
const router = express.Router();

const Customer = require('../model/customer');


// // Add new customers
router.post('/', async (req, res) => {
	
	const customer = new Customer(req.body);
	try {
		await customer.save();
		res.status(201).send(customer);
	} catch (error) {
		
		res.status(500).send();
	}
});
// ADD new products

router.post('/:cid', async (req, res) => {
	
	try {
		const customer = await Customer.findOne({customer_id:req.params.cid});
		if (!customer) {
			return res.status(404).send({ error: 'customer not found' });
		}
		   const newProduct = req.body;
		   console.log(newProduct);
		   console.log(typeof customer.Line_items);
		   customer.Line_items.push(newProduct)
		   customer.save();
		res.status(200).send(customer);
	} catch (error) {
        res.status(500).send({ error: 'Internal server error' });
       
	}
});

// getting orederdetails order id
router.get('/:id', async (req, res) => {
	
	try {
		const order = await Customer.findById(req.params.id);
		if (!order) {
			return res.status(404).send({ error: 'order not found' });
		}
		res.send(order);
	} catch (error) {
        res.status(500).send({ error: 'Internal server error' });
       
	}
});
// getting by customer_id
router.get('/customers/:cid', async (req, res) => {
	try {
		const customer = await Customer.find(req.params.customer_id);
		if (!customer) {
			return res.status(404).send({ error: 'customer not found' });
		}
		res.send(customer);
	} catch (error) {
        res.status(500).send({ error: 'Internal server error' });
       
	}
});
// total count of products and price 

router.get('/products/:cid', async (req, res) => {
	
	try {
		const customer = await Customer.findOne({customer_id:req.params.cid});
		if (!customer) {
			return res.status(404).send({ error: 'customer not found' });
		}
		 const products=customer.Line_items.length;
		 const price = customer.Line_items;
		 var y = 0;
		 price.forEach((e)=>{
			 y += parseFloat(e.price);
			});
		console.log(y);
		const total = [{"total products":products,"totalprice":y}]
		total.push();
		// console.log(total);
		res.send(total);
	} catch (error) {
        res.status(500).send({ error: 'Internal server error' });
       
	}
});


// update
router.patch('/:id/:pid', async (req, res) => {
	const updates =Object.keys(req.body);
	console.log(updates);

	try {
		const orderId = req.params.id;
	    const product_id = req.params.pid;
		const customer = await Customer.findById(orderId);
		
		if (!customer) {
			return res.status(404).send({ error: 'customer not found' });
		}
		const products = customer.Line_items;
		console.log(products);
		products.map((e)=>{
			if(e._id == product_id){
				  console.log(e.quantity);
				//   if(e.quantity !== {
				// 	  console.log(req.body);
				//   }
				 
				}
			});
		// console.log(customer.Line_items.quantity);
		// const quantity = customer.findById(product_id)
		// console.log(quantity);
		// updates.forEach((update) => {
		// 	quantity[update] = req.body[update];
		// });
	customer.save()
		res.send(customer);
		
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

router.delete('/:id/delete/:pid', async (req, res) => {
	const orderId = req.params.id;
	const product_id = req.params.pid;
	try {
		const customer = await Customer.findById(orderId);
		
		if (!customer) {
			return res.status(404).send({ error: 'customer not found' });
		}
		customer.Line_items.map((e)=>{
			 if(e._id == product_id)
			  return e.remove()
			
	});
	customer.save()
		res.send(customer);
		
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

module.exports = router;