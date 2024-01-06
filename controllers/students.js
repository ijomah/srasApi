const db = require("../dbconfig/configDb");
 

const getStudentDetail = (req, res) => {
    //Get student lists based on schoolId, classId,
    // and teacherId or schHeadId 
    const studList = db('students');
    db.from('students').select(
        'students.id',
        'f_name',
        'l_name',
        'm_name',
        'names.sch_id',
        'class_group',
    )

    res.send(studList);
}

const postStudent = (req, res) => {
   const { schId, studId, subjId, test1, test2, note, exam} = req.body;
    try {
        db.transaction(async (tx) => {
            const loginId = await tx('students').insert({
                test1: test1,
                test2: test2,
                note_student: note,
                exam: exam,            
                sch_id: schId, 
                stud_id: studId,
                subj_id: subjId 
            }, 'id')
            return res.status(200).send(loginId[0].id);
        })
    } catch(error) {
        console.log('student err', error)
    }
}

const updateStudent = (req, res) => {
    
    const { cognitId, schId, studId, subjId, test1, test2, note, exam} = req.body;
    let myValue = false;
    let coId;
    try {
        db.transaction(async (tx) => {
            switch(myValue) {
                case !test1:
                  coId = await tx('cognitive_students')
                        .where({id: cognitId})
                        .update({test1: test1}, 'id')
                    break;
                case !test2:
                    coId =  await tx('cognitive_students')
                        .where({id: cognitId})
                        .update({test2: test2}, 'id')
                    break;
                case !note:
                    coId = await tx('cognitive_students')
                        .where({id: cognitId})
                        .update({note_student: note}, 'id')
                    break;
                case !exam:
                    coId = await tx('cognitive_students')
                        .where({id: cognitId})
                        .update({exam: exam}, 'id')
                    break;
                default:
                    console.log('No one matched')
            }
            // const cogId = await tx('cognitive_students')
            //     .where({id: cognitId})
            //     .update({
            //         test1: test1,
            //         test2: test2,
            //         note_student: note,
            //         exam: exam,            
            //         sch_id: schId, 
            //         stud_id: studId,
            //         subj_id: subjId 
            // }, 'id')
            
            return res.status(200).send(cogId[0].id);
        })
    } catch(error) {
        console.log('student err', error)
    }
}

const deleteStudent = (req, res) => {
    const {id} = req.body;
    db('logins')
        .where({ id: id })
        .del()
    res.status(200).send('student is deleted');
}

module.exports = {deleteStudent, updateStudent, getStudentDetail, postStudent};