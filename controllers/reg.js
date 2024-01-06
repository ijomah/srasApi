const db = require("../dbconfig/configDb");

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
    //get the req.body content
    const {
        fName, lName, mName, gender, homePhoneNo, phoneNo,
        officePhoneNo,houseNo, street, area, quarter, 
        town, lga, province, state, country, pupilName, 
        schName, schLga, schState, date, email, password,
        userName
    } = req.body;
    // console.log('from con', ;
    

    
    try {
        const hash = await genHash(password)    
        await db.transaction(async tx =>{
            // login table insertion
            const schId = await tx('sch').insert({
                name: schName,
            }, 'id');

            const schHeadId = await tx('sch_heads')
                .insert({
                    title: title,
                    sch_id: schId
                });

            const loginId = await tx('logins').insert({
                hash: hash,
                user_name: userName,
                parentage_id: parentageId,
                teacher_id: teacherId,
                sch_head_id: schHeadId
            }, 'id');

            const addressId = await tx('addresses').insert({
                no: houseNo,
                street: street,
                area: area,
                quarter: quarter,
                zone: zone,
                state: state,
                lga: lga,
                sch_id: schId[0].id
            }, 'id');

            const phoneNoId = await tx('phone').insert({
                no: phoneNo,
                sch_id: schId[0].id
            });

            const phoneNoTypeId = await tx('phone_no_types')
                .insert({
                    type: phoneNoType,
                    phone_no_id: phoneNoId
                });

            const emailId = await tx('emails').insert({
                email: email,
                sch_id: schId,
                teacher_id: teacherId,
                parentage_id: parentageId,
                sch_head_id: schHeadId
            });

            const countryId = await tx('countries').insert({
                zip_code: zipCode,
                country_name: country,
                address_id: addressId[0].id
            }, 'id');

            const parentageId = await tx('parentages')
                .insert({
                    type: parentType,
                    sch_id: schId
                });

            const nameId = await tx('names').insert({
                sch_id: schId,
                stud_id: studId,
                teacher_id: teacherId,
                parentage_id: parentageId,
                f_name: fName,
                l_name: lName,
                m_name: mName,
                other_name: otherName          
            }, 'id')

            return res.status(200).send(userId) 
        })
    } catch(error) {
        console.log('catch err: ', error)
    }

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