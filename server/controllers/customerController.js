const Customer = require('../models/Customer')
const mongoose = require('mongoose')

// Get Route
// Home
exports.homepage = async (req, res) => {
    const messages = await req.flash('info')
     const locals = {
         title: 'NodeJs',
         description: 'Free NodeJs User Management System'
     }
         let perPage = 12
         let page = req.query.page || 1 
 
     try {

        const customers = await Customer.aggregate ( [{ $sort: { updatedAt: -1}}])
        . skip(perPage * page - perPage)
        .limit(perPage)
        .exec()

        const count = await Customer.count()
        res.render('index', {
            locals,
            customers,
            current: page,
            pages: Math.ceil(count / perPage),
            messages
        })
        } catch (error) {
         console.log(error)   
     }
   
     }

// // Get Route
// // Home
// exports.homepage = async (req, res) => {
//    const messages = await req.flash('info')
//     const locals = {
//         title: 'NodeJs',
//         description: 'Free NodeJs User Management System'
//     }

//     try {
//         const customers = await Customer.find({}).limit(25)
//         res.render('index', { locals, messages, customers } )
//     } catch (error) {
//         console.log(error)   
//     }
       
//     }




// Get About
// About
exports.about = async (req, res) => {
    const locals = {
        title: 'About',
        description: 'Free NodeJs User Management System'
    }

    try {
        res.render('about', locals )
    } catch (error) {
        console.log(error)   
    }
       
    }


        
       // Get Route 
       //  Customer Route
    exports.addCustomer = async (req, res) => {
        const locals = {
            title: 'Add New Customer Form',
            description: 'Free NodeJs User Management System'
        }
            res.render('customer/add', locals)
        }
          
        //Post
        // Create New Customer
        exports.postCustomer = async (req, res) => {
            console.log(req.body)
            const newCustomer = new Customer({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                tel: req.body.tel,
                details: req.body.details
            })
            try {
                await Customer.create(newCustomer)
               await req.flash('info', 'New customer has been added')
                res.redirect('/')
            } catch (error) {
                console.log(error)
                
            }

            } 


// Get /
//View Customer Data
exports.view = async (req, res) => {
    try {
        const customer = await Customer.findOne({_id: req.params.id})

        const locals = {
            title: 'View Customer Data',
            description: 'Free NodeJs User Management System'
        }
        res.render('customer/view',  { locals, customer })

    } catch (error) {
        console.log(error)

    }

}


// Get /
// Edit Customer Data
exports.edit = async (req, res) => {
    try {
        const customer = await Customer.findOne({_id: req.params.id})

        const locals = {
            title: 'edit Customer Data',
            description: 'Free NodeJs User Management System'
        }
        res.render('customer/edit',  { locals, customer })

    } catch (error) {
        console.log(error)

    }

}


// Get /
// Update Customer Data
exports.editPost = async (req, res) => {
    try {
        await Customer.findByIdAndUpdate(req.params.id,{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            tel: req.body.tel,
            email: req.body.email,
            details: req.body.details,
            updated: Date.now()
        })
        res.redirect(`/edit/${req.params.id}`)
    } catch (error) {
        console.log(error)  
    }
}


// Delete /
// Delete Customer Data
exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.deleteOne({_id: req.params.id})
        res.redirect('/')
        
    } catch (error) {
        console.log(error)    
    }
    }


    // Get/
// Search Customer Data
exports.searchCustomers = async (req, res) => {
    
    const locals = {
        title: 'Search Customer Data',
        description: 'Free NodeJs User Management System'
    }   
    try {
        
    let searchTerm = req.body.searchTerm
    const searchNoSpecialChar = searchTerm.replace (/[^a-zA-z0-9]/g, "")
    const customers = await Customer.find({
        $or: [
            {firstName: {$regex: new RegExp(searchNoSpecialChar, "i")}},
            {lastName: {$regex: new RegExp(searchNoSpecialChar, "i")}}
        ]
    })
    
    res.render('search',  {
        customers,
        locals
    })

    } catch (error) {
        console.log(error)
        
    }
     
    }