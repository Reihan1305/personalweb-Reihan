let dataprojects=[]

function getProject(e) {
e.preventDefault()
let title = document.getElementById("project-title").value;
let startDate = new Date(document.getElementById("start-date").value);
let endDate = new Date (document.getElementById("end-date").value);
let project = document.getElementById("project-content").value;
let reactjs = document.getElementById("reactjs").checked;
let nodejs = document.getElementById("nodejs").checked;
let python = document.getElementById("python").checked;
let github = document.getElementById("github").checked;

startDate.setHours(0, 0, 0, 0);
endDate.setHours(0, 0, 0, 0);

let dataProject = {
    title,
    startDate,
    endDate,
    project,
    reactjs,
    nodejs,
    python,
    github
};

dataprojects.unshift(dataProject);
renderProject();
}

function renderProject() {
    document.getElementById("content").innerHTML ="";
    for( let index = 0; index < dataprojects.length; index ++ ) {
        
        
        document.getElementById("content").innerHTML +=` 
        <div class="container-content">
            <img class="img-content" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVEVz04ruvOU-hqMa46ZV_jPTb3Db0XNBLiw&usqp=CAU" /> 
            <a style="text-decoration:none; " href="project-detail.html"><h2 class="title-content">${dataprojects[index].title}</h2><a>
            <p class="duration-content">${getDate(dataprojects[index].startDate,dataprojects[index].endDate)}</p>
            <p class="paragraph-content">${dataprojects[index].project}</p>
            <div class="icon-content">
               ${dataprojects[index].reactjs ? `<i class="fa-brands fa-react fa-lg"></i>`:""}
               ${dataprojects[index].nodejs ? `<i class="fa-brands fa-node fa-lg"></i>` :""}
               ${dataprojects[index].python ? `<i class="fa-brands fa-python fa-lg"></i>` :""} 
               ${dataprojects[index].github ?  '<i class="fa-brands fa-github fa-lg"></i>' :""} 
            </div>
                <div class="btn-content">
                    <button>Edit </button>
                    <button>Delete</button>
                </div>
        </div>
        `
    }
}
renderProject();

function getDate(start,end){
    let datestart = start;
    let dateend = end;
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