const bcrypt = require('bcrypt');
const db = require('../../dbconfig/configDb');

function comparePassword (userPassword, dbPassword) {
    return bcrypt.compareSync(userPassword, dbPassword);
}

async function createUser(req, res) {
  const {
    fName, lName, mName, gender, homePhoneNo, phoneNo,
    officePhoneNo, phoneNoType, houseNo, street, area, quarter, 
    town, lga, province, state, country, 
    schName, schLga, schState, date, email, password,
    userName
  } = req.body;

    return await handleErrors(phoneNo, password)
    .then(async () => {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hash(password, salt);
      
      try {
          // const hash = await genHash(password)    
        return  await db.transaction(async tx =>{
              // login table insertion
              const schId = await tx('sch').insert({
                  name: schName,
              }, 'id');
  
              const schHeadId = await tx('sch_heads')
                  .insert({
                      title: title,
                      sch_id: schId[0].id
              }, 'id');

              const parentageId = await tx('parentages')
              .insert({
                  type: parentType,
                  sch_id: schId[0].id
              }, 'id');
  
              const loginDetails = await tx('logins').insert({
                  hash: hash,
                  user_name: phoneNo,
                  parentage_id: parentageId[0].id,
                  teacher_id: teacherId,
                  sch_head_id: schHeadId[0].id
              }, ['id','parentage_id', 'teacher_id', 'sch_head_id' ]);
  
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
              }, 'id');
  
              const phoneNoTypeId = await tx('phone_no_types')
                  .insert({
                      type: phoneNoType,
                      phone_no_id: phoneNoId[0].id
                  });
  
              const emailId = await tx('emails').insert({
                  email: email,
                  sch_id: schId,
                  teacher_id: teacherId[0].id,
                  parentage_id: parentageId[0].id,
                  sch_head_id: schHeadId[0].id
              });
  
              const countryId = await tx('countries').insert({
                  zip_code: zipCode,
                  country_name: country,
                  address_id: addressId[0].id
              });
  
              const nameId = await tx('names').insert({
                  sch_id: schId[0].id,
                  stud_id: studId,
                  teacher_id: teacherId,
                  parentage_id: parentageId[0].id,
                  f_name: fName,
                  l_name: lName,
                  m_name: mName,
                  other_name: otherName          
              }, 'id')
  
              return res.status(200).send(loginDetails) 
          })
      } catch(error) {
          console.log('catch err: ', error)
          res.status(400).json({status: err.message})
      }

        //before for passport
        // await db('logins')
        // .insert({
        //     username: req.body.phoneNo,
        //     hash: hash
        // })
        // .returning('*');
    })
    .catch((err) => {
        res.status(400).json({status: err.message})
    }
    )
}

function loginRequired(req, res, next) {
    if(!req.user) {
        return res.status
        .json({status: 'Please log in'});
    }
    return next();
}

function adminRequired(req, res, next) {
    if(!req.user) res.status(401).json({stauts: 'Please log in'})
    return db('logins').where({username: req.user.phoneNo}).first()
    .then((user) => {
        if(!user.admin) res.status(401).json({status: 'You are not authorized'});
        return next();
    })
    .catch((err) => {
        res.status(500).json({status: 'Something bad happened'});
    });
}

function loginRedirect(req, res, next) {
    if (req.user) return res.status(401).json(
      {status: 'You are already logged in'});
    return next();
  }
  
  function handleErrors(phoneNo, password) {
    return new Promise((resolve, reject) => {
      if (phoneNo.length < 10) {
        reject({
          message: 'Phone number must be longer than 10 characters'
        });
      }
      else if (password.length < 6) {
        reject({
          message: 'Password must be longer than 6 characters'
        });
      } else {
        resolve();
      }
    });
  }
  
  module.exports = {
    comparePassword,
    createUser,
    loginRequired,
    adminRequired,
    loginRedirect
  };
  