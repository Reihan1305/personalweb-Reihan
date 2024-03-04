const getTestimonialData =()=>{ 
    return new Promise ((resolve,reject) => {
    const xhr = new XMLHttpRequest()
    
    xhr.open("GET","https://api.npoint.io/1465052a4f4453fb4ba3")
    
    xhr.onload = () =>{
        if(xhr.status === 200){
            resolve(JSON.parse(xhr.response))
        }else{
            reject("error loading data")
        }
    }
    
    xhr.onerror = () =>reject ("network error")
    
    xhr.send()
    })
    }
    
    const runTestimonial = async () =>{
        try{
            const response = await getTestimonialData()
            console.log(response);
        }catch(error){
            console.log(Error);
        }
    }
    
    
    const allTestimonial = async ()=>{
        document.getElementById("testimonials").innerHTML = "Tunggu Bentar ya😚";
        const testimonials = await getTestimonialData();
        let testimonialHtml =""
        testimonials.data.forEach((data) => {
        testimonialHtml +=`
        <div class="card p-2" style="width: 25rem; height: 20rem;">
        <img src="${data.image}" style="height: 60%; object-fit:cover" class="card-img-top" alt="...">
          <div class="card-body">
              <p class="card-text mb-2" style="height: 4rem; overflow: hidden;">${data.comment}</p>
              <h5 class="card-title d-flex justify-content-end">~ ${data.author}</h5>
          </div>
        </div>
        `
        });
        document.getElementById("testimonials").innerHTML = testimonialHtml

    }
    allTestimonial()

    const filteredTestimonial = async (rate) =>{
        document.getElementById("testimonials").innerHTML = "Tunggu Bentar ya😚";
        const testimonials = await getTestimonialData();
        let testimonialHtml =""
        const datafilter = testimonials.data.filter((data) =>{
            return data.rate === rate 
        })
    
        if(!datafilter.length){
           testimonialHtml += "<H1>Data Not Found</H1>"
        }
        else{
        datafilter.forEach( function (data){
            testimonialHtml +=`
            <div class="card p-2" style="width: 25rem; height: 20rem;">
                 <img src="${data.image}" style="height: 60%; object-fit:cover" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text mb-2" style="height: 30%; overflow: hidden;">${data.comment}</p>
                        <h5 class="card-title d-flex justify-content-end">~ ${data.author}</h5>
                    </div>
            </div>
            `
        })}
        document.getElementById("testimonials").innerHTML = testimonialHtml
    }