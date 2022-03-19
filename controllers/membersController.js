const members = require('../members')
const { v4: uuidv4 } = require('uuid')


/*******************************************************************/
// Get All Members
const getMembers = (req, res) => { 
    res.status(200).json(members)
}

/*******************************************************************/
// Get Single Member
const getMember = (req, res) => {
    const foundMember = members.find(member => member.id === parseInt(req.params.id))
    if (foundMember) {
        res.status(200).json(foundMember)
    } else {
        res.status(400).json({ msg: `Not found member with id ${req.params.id}` })
    }
}

/*******************************************************************/
// Create Member
const createMember = (req, res) => {
    // console.log(req.body)
    const { name, email } = req.body
    if (name && email) {
        const foundMember = members.find(member => member.email === email)
        if (!foundMember) {
            const newMember = {
                // id: members.length + 1,
                id: uuidv4(),
                name,
                email,
                status: 'active'
            }
            members.push(newMember)

            // res.status(200).json(members)
            ///////////////////////
            res.redirect('/')
        } else {
            res.status(400).json({ msg: `Member already exists with email ${email}` })
        }
    } else {
        res.status(400).json({ msg: 'Please provide name and email.' })
    }
}   

/*******************************************************************/
// Delete Member
const deleteMember = (req, res) => {
    const foundMember = members.find(member => member.id === parseInt(req.params.id))
    if (foundMember) {
        const decreasedMembers = members.filter(member => member.id !== foundMember.id)
        
        // res.status(200).json(decreasedMembers)
        /////////////////////////////
        res.redirect('/')
    } else {
        res.status(400).json({ msg: `Not found member with id ${req.params.id}` })
    }
}

/*******************************************************************/
// Update Member
const updateMember = (req, res) => {
    // console.log(req.body)
    const foundMember = members.find(member => member.id === parseInt(req.params.id))
    if (foundMember) {
        const { name, email } = req.body
        if (name && email) {
            const existedEmailMember = members.find(member => member.email === email)
            if (!existedEmailMember || existedEmailMember.id === foundMember.id) {
                const updatedMember = {
                    id: foundMember.id,
                    name,
                    email,
                    status: foundMember.status
                }
                const updatedMembers = members.map(member => member.id === foundMember.id ? updatedMember : member)
                res.status(200).json(updatedMembers)
            } else {
                // Condition: existedEmailMember.id !== foundMember.id
                res.status(400).json({ msg: 'Email is already in use.' })
            }
        } else {
            res.status(400).json({ msg: 'Please provide name and email.' })
        }
    } else {
        res.status(400).json({ msg: `Not found member with id ${req.params.id}` })
    }
}

/*******************************************************************/

module.exports = {
    getMembers,
    getMember,
    createMember,
    deleteMember,
    updateMember
}