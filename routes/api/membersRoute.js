const express = require('express')
// const members = require('../../members')

const router = express.Router()

/*******************************************************************/
// Get All Members
// router.get('/', (req, res) => res.json(members))

// Get Single Member
// router.get('/:id', (req, res) => {
//     const isFound = members.some(member => member.id === parseInt(req.params.id))
//     if (isFound) {
//         const foundMember = members.find(member => member.id === parseInt(req.params.id))
//         res.json(foundMember)
//     } else {
//         res.status(400).json({ msg:`Not found member with id ${req.params.id}`})
//     }
// })

/*******************************************************************/
// Controller

const { 
    getMembers, 
    getMember,
    createMember,
    deleteMember,
    updateMember 
} = require('../../controllers/membersController')

// router.get('/', getMembers)
// router.get('/:id', getMember)
// router.post('/', createMember)
// router.delete('/:id', deleteMember)
// router.put('/:id', updateMember)
////////////////////////////////////////////////////
router.route('/').get(getMembers).post(createMember)
router.route('/:id').get(getMember).delete(deleteMember).put(updateMember)

/*******************************************************************/
module.exports = router
