import express from 'express';
import serveStatic from 'serve-static';
const app = express()
const port = 3000

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
app.get("/project-detail/:id",projectDetail);
app.get("/testimonial",testimonial);

const projects =[]

function home (req, res){res.render("index",{projects});};

function contactMe (req,res){res.render("contact-me")};

function myProject (req,res) {res.render("my-project")};

function handleAddProject(req, res) {
    const {title,startdate,enddate,content,reactjs,python,nodejs,github} = req.body
    
    const duration= getDateDistance(startdate ,enddate)
    console.log(duration)
    projects.unshift({title,startdate,enddate,duration,content,reactjs,python,nodejs,github})
    res.redirect("/")
}


async function projectDetail(req,res){
    const { id } =req.params
    const projectDetailsData = projects[id];
    console.log(projects)
    res.render(`project-detail`,{projects : projectDetailsData})};

function testimonial(req,res){
    res.render("testimonial")};

app.listen(port ,()=>{
console.log(`server berjalan di ${port}`);
})