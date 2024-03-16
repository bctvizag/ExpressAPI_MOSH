const Joi = require('joi');
const express = require('express');
const app = express();

const {v4: uuidV4} = require('uuid')

app.use(express.json())

const courses = [
    {id: uuidV4(), name:'course1'},
    {id: uuidV4(), name:'course2'},
    {id: uuidV4(), name:'course2'},
]



app.get('/', (req, res)=> {
    res.json({msg:'hello Worlddd'})
})

app.get('/api/courses', (req, res)=> {
    res.json(courses)
})


app.get('/api/course/:id', (req, res)=> {
    let course = courses.find(course => course.id===req.params.id)

    if(!course){
        res.status(404).send('courser not found');
        return;
    } 


    res.json(course)
})




app.post('/api/course', (req, res)=> {

    // console.log(req.body);

    let course =  {
        id:uuidV4(),
        name:req.body.name    
    }

    const {error,value} = validateCourse(course)

    if(error) {
        res.status(400).json(error.details)
    }
    else {
               
        courses.push(course)
        res.json(course)
    } 
})

app.put('/api/course/:id',(req, res) => {

    let course = courses.find(course => course.id===req.params.id)
    if(!course) res.status(404).send('courser not found');


    const {error,value} = validateCourse(req.body)

    if(error) {
        res.status(400).json(error.details);
        return 0;
    }
    else {
        
        console.log(req.body);
        course = [...req.body];

        res.json(course)
    } 


})


function validateCourse(course){
    const schema = Joi.object({
        id:Joi.string().required(),
        name: Joi.string().min(3).required()
    })

    return schema.validate(course)
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))