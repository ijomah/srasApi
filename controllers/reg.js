const db = require("../dbconfig/configDb");
const authHelper = require('../authServer/auth/helperFxns');
const passport = require('../authServer/auth/localize');

//In order to fill your tables inthe db properly, 
//different endpoints are needed for these data
//Registration for these
//eg student api, teachers api, parent api, 
//sch api(target tables
//{sch, address, phonenos and phonetype,emails,address})

//fName, lName, mName, gender, homePhoneNo, phoneNo, officePhoneNo,
//houseNo, street, area, quarter, town, lga, 
//province, state, country, pupilName or studentName 
//schName, schLga, schState, date, email, password
// userName

//sch admins will provide these data
//schHouseNo, schStreet, schArea, schQuarter,
//schName, schLga, schState, date, email, password,
//userName

//students data
// gender,
//     class_group,
//     sch_id,
//     date_started,
//     dob,
//     status
const getUser = (req, res) => {
    // db.select().table('users').then(admin => console.log(admin));
    db('files').then(admin => res.send(admin));
    // res.send('I am register, so what do you want');
}

const regUser = async (req, res) => {
    return authHelper.createUser(req, res)
    .then((response) => {
        passport.authenticate('local', (err, user, info) => {
            if (user) { handleResponse(res, 200, 'success'); }
            })(req, res, next);
        })
        .catch((err) => { handleResponse(res, 500, 'error');
    })
    //get the req.body content
    

    // db.insert({
    //     // id: userDet.id,
    //     // email: userDet.email,
    //     // user_key: name,
    //     // created_at: userDet.device
    // }).into('users')
    // .then(item => res.send(`Data inserted suceefully. Here is the id: ${item}`) )
    // res.send('registered')
}

const updateRegister = (req, res) => {
    res.send('I will alter a Reg field, because I am patch');
}

const deleteRegEntry = (req, res) => {
    res.send('Reg is deleted');
}

module.exports = {getUser, deleteRegEntry, updateRegister, regUser}