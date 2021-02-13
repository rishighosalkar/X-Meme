const router = require('express').Router();
let User = require("../models/user");
let methods;

router.get('/', async(req, res) => {
    await User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/', async(req, res) =>
{
    const username = req.body.username;
    const caption = req.body.caption;
    const url = req.body.url;

    const newUser = new User({
        username,
        caption,
        url,
    });

    await newUser.save()
    .then(() => res.json('User add'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.get('/:id', async(req, res) => {
    await User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.patch('/update/:id',async(req, res) => {
    await User.findById(req.params.id)
    .then(users => {
        if(users.caption == req.body.caption ){
            let err = new Error("Duplicate username");
            err.status = 409;
            throw err;
        }
        users.caption = req.body.caption;
        users.url = req.body.url;

        users.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(409).json('Error ' + err.status));
});

module.exports = router;
