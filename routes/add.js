const { Router } = require("express");
const router = Router();
const auth = require('../middleware/auth');
const Course = require('../models/course')

router.get('/', auth, (req, res) => {
    res.status(200);
    res.render('add',{
        title: "Добавить курсы",
        isAdd: true
    });
})

router.post('/', auth, async (req,res) => {
    const course = new Course({
        title:req.body.title,
        price:req.body.price,
        img:req.body.img,
        userId: req.user
    })
    try {
        await course.save();
        res.redirect("/courses")
    } catch(e) {
        console.log(e);
    }
})

module.exports = router;