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
    <div class="card shadow-lg mb-5 bg-body-tertiary rounded" style="width: 20rem; height: 31rem;">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVEVz04ruvOU-hqMa46ZV_jPTb3Db0XNBLiw&usqp=CAU" class="card-img-top p-2" alt="...">
                    <div class="card-body">
                      <h5 class="card-title fs-5 fw-bold">${dataprojects[index].title}</h5>
                      <p class="card-text mb-1" >Duration :${getDate(dataprojects[index].startDate,dataprojects[index].endDate)}</p>
                      <p class="card-text" style="height: 5rem; overflow:hidden;">${dataprojects[index].project}</p>
                      <div class="icon-content mb-4">
                        ${dataprojects[index].reactjs ? `<i class="fa-brands fa-react fa-2xl"></i>`:""}
                        ${dataprojects[index].nodejs ? `<i class="fa-brands fa-node fa-2xl"></i>` :""}
                        ${dataprojects[index].python ? `<i class="fa-brands fa-python fa-2xl"></i>` :""} 
                        ${dataprojects[index].github ?  '<i class="fa-brands fa-github fa-2xl"></i>' :""} 
                      </div>
                    <div class="d-flex flex-row gap-2">
                      <a href="#" class="btn btn-dark " style=" flex: 50%;">Edit</a>
                      <a href="#" class="btn btn-dark " style=" flex: 50%;">Delete</a>
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