const db = require("../dbconfig/configDb");
 

const getUserScoreDetail = (req, res) => {
    console.log(db('scores'))

    res.send('User Score details, because I am Get');
}

const postScore = (req, res) => {
   const { schId, studId, subjId, test1, test2, note, exam} = req.body;
    try {
        db.transaction(async (tx) => {
            const loginId = await tx('cognitive_scores').insert({
                test1: test1,
                test2: test2,
                note_score: note,
                exam: exam,            
                sch_id: schId, 
                stud_id: studId,
                subj_id: subjId 
            }, 'id')
            return res.status(200).send(loginId[0].id);
        })
    } catch(error) {
        console.log('score err', error)
    }
}

const updateScore = (req, res) => {
    
    const { cognitId, schId, studId, subjId, test1, test2, note, exam} = req.body;
    let myValue = false;
    let coId;
    try {
        db.transaction(async (tx) => {
            switch(myValue) {
                case !test1:
                  coId = await tx('cognitive_scores')
                        .where({id: cognitId})
                        .update({test1: test1}, 'id')
                    break;
                case !test2:
                    coId =  await tx('cognitive_scores')
                        .where({id: cognitId})
                        .update({test2: test2}, 'id')
                    break;
                case !note:
                    coId = await tx('cognitive_scores')
                        .where({id: cognitId})
                        .update({note_score: note}, 'id')
                    break;
                case !exam:
                    coId = await tx('cognitive_scores')
                        .where({id: cognitId})
                        .update({exam: exam}, 'id')
                    break;
                default:
                    console.log('No one matched')
            }
            // const cogId = await tx('cognitive_scores')
            //     .where({id: cognitId})
            //     .update({
            //         test1: test1,
            //         test2: test2,
            //         note_score: note,
            //         exam: exam,            
            //         sch_id: schId, 
            //         stud_id: studId,
            //         subj_id: subjId 
            // }, 'id')
            
            return res.status(200).send(coId[0].id);
        })
    } catch(error) {
        console.log('score err', error)
    }
}

const deleteScore = (req, res) => {
    const {id} = req.body;
    db('cognitive_scores')
        .where({ id: id })
        .del()
    res.status(200).send('score is deleted');
}

module.exports = {deleteScore, updateScore, getUserScoreDetail, postScore};