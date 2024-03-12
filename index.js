import express from 'express';
// import sequelize here
import { Sequelize,QueryTypes } from 'sequelize';
import serveStatic from 'serve-static';
const app = express()
const port = 3000
import connection from "./src/config/connection.js";

// create instance sequelize connection
const sequelizeconnect = new Sequelize( connection.development )


app.set("view engine","hbs")
app.set("views","src/views")


app.use("/assets", express.static("src/assets"))
app.use(express.urlencoded({extended:false}))

//function 
function getDateDistance(start,end){
    let datestart =new Date (start);
    let dateend = new Date(end);
    let duration =dateend - datestart
    
    let Second = 1000;//1000 milisecond =1second
    let Minute = 60;// 60 second=1minute
    let Hour = 60;//60 minute=1hours
    let Days = 24;//24 hourws = 1day
    let month = 30;//30 days = 1month
    let years = 12;//12 months = 1 year

    let distanceSecond = Math.floor(duration / Second);
    let distanceMinute = Math.floor(duration / (Second * Minute));
    let distanceHour = Math.floor(duration / (Second * Minute * Hour));
    let distanceday = Math.floor(duration / (Second * Minute * Hour * Days));
    let distancemonth = Math.floor(duration / (Second * Minute * Hour * Days * month));
    let distanceyear = Math.floor(duration / (Second * Minute * Hour * Days * month * years));

    if (distanceyear > 0){
        return `${distanceyear} years`
    }

    else if(distancemonth > 0){
        return `${distancemonth} month`
    }

    else if(distanceday > 0){
        return `${distanceday} days`
    }

    else if(distanceHour > 0){
        return `${distanceHour} hours`
    }

    else if(distanceMinute > 0){
        return `${distanceMinute} minutes`
    }

    else{
        return`${distanceSecond} seconds`
    }
}
//function end

app.get("/",home);
app.get("/contact-me",contactMe);
app.get("/my-project",myProject);
app.post("/my-project",handleAddProject);
app.get("/delete-project/:id",handleDeleteProject);
app.get("/edit-project/:id",editProject);
app.post("/edit-project/:id",handleEditProject);
app.get("/project-detail/:id",projectDetail);
app.get("/testimonial",testimonial);


async function home (req, res){
    try{
        const queryselect = `SELECT * FROM projects ORDER By id DESC;`
        
        const project = await sequelizeconnect.query(queryselect, {type:QueryTypes.SELECT})
        
        const object = project.map((projects)=>{
            return{
                ...projects,
                duration:getDateDistance(projects.startdate,projects.enddate)
            }
        })


        res.render("index",{projects : object});
    }catch(error){
        console.log(error)
    }};
    
    

function contactMe (req,res){res.render("contact-me")};

function myProject (req,res) {res.render("my-project")};

async function handleAddProject(req, res) {
    try{ 
        const {title,startdate,enddate,content,reactjs,python,nodejs,github} = req.body
        const image ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVEVz04ruvOU-hqMa46ZV_jPTb3Db0XNBLiw&usqp=CAU"
        const queryinsert = `INSERT INTO projects(
        title, content, startdate, enddate, reactjs, nodejs, github, "Python", image, "createdAt", "updatedAt")
        VALUES ('${title}', '${content}', '${startdate}', '${enddate}', '${github}', '${reactjs}', '${nodejs}', '${python}', '${image}', now(),now())`;

        await sequelizeconnect.query(queryinsert)
    
    res.redirect("/")}
    catch(error){
        console.error();
    }
}

async function handleDeleteProject(req,res){
   try{
    const  id = req.params.id;
    const querydelete =`DELETE FROM projects WHERE id=${id};`

    await sequelizeconnect.query(querydelete)
    res.redirect("/")
}catch(error){
    console.log(error);
}
}

async function editProject(req,res){
    try{
    const { id } = req.params;
    const queryselect =`SELECT * FROM projects WHERE id=${id};`

    const project =await sequelizeconnect.query(queryselect,{type:QueryTypes.SELECT})

    const object =project.map((projects)=>{
        return{
            ...projects
        }
    })
    res.render("edit-project",{projects : object[0]});}
    catch(error){
        console.error();
    }
}

async function handleEditProject(req,res){
  try{
    const { id } =  req.params;
    const {title,startdate,enddate,content,reactjs,python,nodejs,github} = req.body;

    const queryupdate =`UPDATE projects SET title='${title}',startdate='${startdate}',enddate='${enddate}', content='${content}', reactjs='${reactjs}', nodejs='${nodejs}', github='${github}', "Python"='${python}',"updatedAt"=now() WHERE id=${id};`;

    await sequelizeconnect.query(queryupdate,{type:QueryTypes.UPDATE})

    res.redirect("/")
}catch(error){
    console.error();
}
}

async function projectDetail(req,res){
    try{
    const id = req.params.id;
    const queryselect =`SELECT * FROM projects WHERE id=${id};`

    const project =await sequelizeconnect.query(queryselect,{type:QueryTypes.SELECT})

    const object =project.map((projects)=>{
        return{
            ...projects,
            duration:getDateDistance(projects.startdate,projects.enddate)
        }
    })

    res.render("project-detail",{projects : object[0]})
}catch(error){
    console.log(error);}
};

function testimonial(req,res){
    res.render("testimonial")};

app.listen(port ,()=>{
console.log(`server berjalan di ${port}`);
})