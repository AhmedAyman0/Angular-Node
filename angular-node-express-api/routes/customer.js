const express = require('express');
const router = express.Router();

const customerService = require('../services/service.customer');


router.get('/', async function (req, resp, next) {
    resp.status(500).json({ error: 'Invalid uid' })
})

router.post('/', async function (req, resp, next) {
    const body = req.body;
    try {
        const customer = await customerService.create(body);
        if (body.guid != null) {
            customer.guid = body.guid;

        }
        return resp.status(201).json({ customer: customer })
    }
    catch (error) {
        if (error.name = "ValidationError") {
            return resp.status(400).json({ error: error.message })

        }
        else {
            return next(error);
        }
    }
})

router.put('/:id', async function (req, res, next) {
    try {
        const customer = await customerService.update(req.params.id, req.body);
        return res.status(200).json({ customer: customer })
    } catch (error) {
        return next(error);
    }
})

router.get('/:id',async (req,res,next)=>{
    try {
        const customer = await customerService.retrieve(req.params.id);
        return res.status(200).json({customer:customer})
    } catch (error) {
        return next(error);
    }
})

router.delete('/:id', async (req, res, next) =>
{
	try
	{
		const customer = await CustomerService.delete(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports=router;