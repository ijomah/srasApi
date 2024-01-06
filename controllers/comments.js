const db = require("../dbconfig/configDb");
 

const getUserCommentDetail = (req, res) => {
    const identifier = req.body;
    let com = db('comments').select('*');

    res.status(200).send(com);
}

const postComment = (req, res) => {
   const { comment, studId, teachrtId, schHeadId} = req.body;
    try {
        db.transaction(async (tx) => {
            const comId = await tx('comments').insert({                
                comment: comment,                            
                stud_id: studId,
                teacher_id: teachrtId,
                sch_head_id: schHeadId
            }, 'id')
            return res.status(200).send(comId[0].id);
        })
    } catch(error) {
        console.log('Comment err', error)
    }
}

const updateComment = (req, res) => {
    
    const { comId, comment} = req.body;
    let comUpdateId;
    try {
        db.transaction(async (tx) => {
            comUpdateId = await tx('comments')
            .where({id: comId})
            .update({comment: comment}, 'id')
            return res.status(201).send(comUpdateId[0].id);
        })
    } catch(error) {
        console.log('Comment err', error)
    }
}

const deleteComment = (req, res) => {
    const {id} = req.body;
    db('logins')
        .where({ id: id })
        .del()
    res.status(200).send('Comment is deleted');
}

module.exports = {deleteComment, updateComment, getUserCommentDetail, postComment};