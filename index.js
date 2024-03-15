import express from 'express';
// import sequelize here
import { Sequelize,QueryTypes } from 'sequelize';
import serveStatic from 'serve-static';
import bcrypt from "bcrypt";
import session from "express-session";
import flash from "express-flash";
import multer from 'multer';
import connection from "./src/config/connection.js";

const app = express()
const port = 3000

// create instance sequelize connection
const sequelizeconnect = new Sequelize( connection.development )

const multerconfig =multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/upload')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix +".png")
      }
})

const upload = multer ({ storage: multerconfig });
app.set("view engine","hbs")
app.set("views","src/views")


app.use("/assets", express.static("src/assets"));
app.use("/upload", express.static("src/upload"));
app.use(express.urlencoded({extended:false}));
app.use(flash());
app.use(session({
    secret :"heisenberg",
    store : new session.MemoryStore(),
    cookie :{
        maxAge : 1000 * 60 * 60,
        httpOnly:true,
        secure :false
    },
    saveUninitialized :true,
    resave:false
}))

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
app.get("/add-project",myProject);
app.post("/add-project",upload.single("image"), handleAddProject);
app.get("/delete-project/:id",handleDeleteProject);
app.get("/edit-project/:id",editProject);
app.post("/edit-project/:id",upload.single("image"), handleEditProject);
app.get("/project-detail/:id",projectDetail);
app.get("/testimonial",testimonial);
app.get("/register",formregister);
app.post("/register",register);
app.get("/login",formlogin);
app.post("/login",login);
app.get("/logout",logout)


async function home (req, res){
    try{
        
        
        if(req.session.islogin === true){
            const id =req.session.iduser
            const queryselect = `SELECT P.id, P.title, P.content, P.startdate, P.enddate, P.reactjs, P.nodejs, P.github, P."Python", P.image,U.username AS author FROM users u 
        INNER JOIN "projects" P on P.author = U.id WHERE U.id=${id} ORDER by id DESC;`
        
        const project = await sequelizeconnect.query(queryselect, {type:QueryTypes.SELECT})
        

        const object = project.map((projects)=>{
            return{
                ...projects,
                duration:getDateDistance(projects.startdate,projects.enddate),
                islogin:req.session.islogin
            }
        })
        res.render("index",{
            projects : object,
            islogin :req.session.islogin,
            user : req.session.user});
        }
            else{
                const queryselect = `SELECT P.id, P.title, P.content, P.startdate, P.enddate, P.reactjs, P.nodejs, P.github, P."Python", P.image,U.username AS author FROM projects P 
        inner JOIN "users" U on P.author = U.id ORDER by id DESC;`
        
        const project = await sequelizeconnect.query(queryselect, {type:QueryTypes.SELECT})
        
        const object = project.map((projects)=>{
            return{
                ...projects,
                duration:getDateDistance(projects.startdate,projects.enddate),
                islogin:req.session.islogin
            }
        })
        res.render("index",{
            projects : object,
            islogin :req.session.islogin,
            user : req.session.user});}
    }catch(error){
        console.log(error)
    }};
    
    

function contactMe (req,res){
    res.render("contact-me",{
        islogin :req.session.islogin,
        user : req.session.user})
};

function myProject (req,res){
    res.render("add-project",{
        islogin :req.session.islogin,
        user : req.session.user})
    };

async function handleAddProject(req, res) {
    try{ 
        const {title,startdate,enddate,content,reactjs,python,nodejs,github} = req.body

        const image =req.file.filename;

        const isreact = reactjs ? true : false;
        const ispython = python ? true : false;
        const isnode = nodejs ? true : false;
        const isgithub = github ? true : false;
        const author = req.session.iduser;

        const queryinsert = `INSERT INTO projects(
        title, content, startdate, enddate, reactjs, nodejs, github, "Python", image, author , "createdAt", "updatedAt")
        VALUES ('${title}', '${content}', '${startdate}', '${enddate}', ${isgithub}, ${isreact}, ${isnode}, ${ispython}, '${image}', ${author} ,now(),now())`;

        await sequelizeconnect.query(queryinsert)
    
        res.redirect("/")}
    catch(error){
        console.error();
    }
};

async function handleDeleteProject(req,res){
   try{
    const  id = req.params.id;
    const querydelete =`DELETE FROM projects WHERE id=${id};`

    await sequelizeconnect.query(querydelete)
    res.redirect("/")}
    catch(error){
    console.log(error); 
    }
};

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
     
    const isreact = reactjs ? true : false;
    const ispython = python ? true : false;
    const isnode = nodejs ? true : false;
    const isgithub = github ? true : false;
    
    const queryupdate =`UPDATE projects SET title='${title}', content='${content}',startdate='${startdate}',enddate='${enddate}', reactjs='${isreact}', nodejs='${isnode}', github='${isgithub}', "Python"='${ispython}',"updatedAt"=now() WHERE id=${id};`;

    await sequelizeconnect.query(queryupdate,{type:QueryTypes.UPDATE})

    res.redirect("/")}
    catch(error){
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

    console.log(object);
    res.render("project-detail",{
        projects : object[0],
        islogin :req.session.islogin,
        user : req.session.user})}
    catch(error){
    console.log(error);}
};

function testimonial(req,res){
    res.render("testimonial",{
        islogin : req.session.islogin,
        user : req.session.user})
};

function formregister(req,res){
    res.render("register")
}

async function register(req,res){
    try{
    const {username,email,password} =  req.body;
    
    await bcrypt.hash(password ,10 ,async function(err,hashpassword){
        if(err){
        res.redirect("/register")}
        else{
        const queryinsert =`INSERT INTO users (username,email, password, "createdAt","updatedAt") VALUES ('${username}','${email}','${hashpassword}',now(),now());`
        await sequelizeconnect.query(queryinsert) 
        req.flash("succes","Register succes")
        res.redirect("/login")
        }
    })
    }
    catch(error){
        console.error();
    };
}

function formlogin(req,res){
    res.render("login");
}

async function login(req,res){
    try{
        const {email,password}=req.body;
        const selectemail =`SELECT * FROM users WHERE email='${email}';`

        const isemail = await sequelizeconnect.query(selectemail,{type:QueryTypes.SELECT}); 
        if(!isemail.length){
            req.flash("danger", "Email has not been registered");   
            return res.redirect("/login")
        }

        await bcrypt.compare(
            password, 
            isemail[0].password,
            function(err,result){
                if(!result){
                    req.flash("danger","Wrong Password")
                    return res.redirect("/login")
                } else{
                    req.session.islogin =true;
                    req.session.user = isemail[0].username;
                    req.session.iduser = isemail[0].id;
                
                    req.flash("succes","Login success")
                    return res.redirect("/")
                }
             })
    }
    catch(error){
        console.log(error);
    }
};

function logout(req,res){
    req.session.destroy()
    res.redirect("/")
}

app.listen(port ,()=>{
console.log(`server berjalan di ${port}`);
})