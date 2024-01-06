const db = require("../dbconfig/configDb");
 

const getUserResultDetail = (req, res) => {
    const result = db.from('students').select(
        //list items to select
        
    );

    res.status(200).send(result);
}

const postResult = (req, res) => {
   const { schId, studId, subjId, test1, test2, note, exam} = req.body;
    try {
        db.transaction(async (tx) => {
            const loginId = await tx('cognitive_Results').insert({
                test1: test1,
                test2: test2,
                note_Result: note,
                exam: exam,            
                sch_id: schId, 
                stud_id: studId,
                subj_id: subjId 
            }, 'id')
            return res.status(200).send(loginId[0].id);
        })
    } catch(error) {
        console.log('Result err', error)
    }
}

const updateResult = (req, res) => {
    
    const { cognitId, schId, studId, subjId, test1, test2, note, exam} = req.body;
    let myValue = false;
    let coId;
    try {
        db.transaction(async (tx) => {
            switch(myValue) {
                case !test1:
                  coId = await tx('cognitive_Results')
                        .where({id: cognitId})
                        .update({test1: test1}, 'id')
                    break;
                case !test2:
                    coId =  await tx('cognitive_Results')
                        .where({id: cognitId})
                        .update({test2: test2}, 'id')
                    break;
                case !note:
                    coId = await tx('cognitive_Results')
                        .where({id: cognitId})
                        .update({note_Result: note}, 'id')
                    break;
                case !exam:
                    coId = await tx('cognitive_Results')
                        .where({id: cognitId})
                        .update({exam: exam}, 'id')
                    break;
                default:
                    console.log('No one matched')
            }
            // const cogId = await tx('cognitive_Results')
            //     .where({id: cognitId})
            //     .update({
            //         test1: test1,
            //         test2: test2,
            //         note_Result: note,
            //         exam: exam,            
            //         sch_id: schId, 
            //         stud_id: studId,
            //         subj_id: subjId 
            // }, 'id')
            
            return res.status(200).send(cogId[0].id);
        })
    } catch(error) {
        console.log('Result err', error)
    }
}

const deleteResult = (req, res) => {
    const {id} = req.body;
    db('logins')
        .where({ id: id })
        .del()
    res.status(200).send('Result is deleted');
}

module.exports = {deleteResult, updateResult, getUserResultDetail, postResult};