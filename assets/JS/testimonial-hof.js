data =[
    {
    nama :"reihan",
    comment :"mantap",
    image :"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    ratting :5,
    },
    {
    nama :"tyler",
    comment :"Tingkatkan lagi",
    image :"https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
    ratting :4
    },
    {
    nama :"Jhon doe",
    comment :"apasih",
    image :"https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400",
    ratting :2
    },
    {
    nama :"jesse",
    comment :"mantap",
    image :"https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400",
    ratting :3
    },
    {
    nama :"Mr.white",
    comment :"lumayan",
    image :"https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=400",
    ratting :2
    },
    {
    nama :"joe",
    comment :"keren",
    image :"https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg?auto=compress&cs=tinysrgb&w=400",
    ratting :5
    }
]

const testimonials =() =>{
    let datahtml = ""
    data.forEach(function (data){
        datahtml +=`<div class="testimonial">
                    <img src="${data.image}"/>
                    <p>${data.comment}</p>
                    <h3>~ ${data.nama}</h3>
                    </div>`
})
    document.getElementById("testimonials").innerHTML = datahtml
    }

    testimonials()

const filteredTestimonial = (ratting) =>{
    let datahtml =""
    const datafilter = data.filter((data) =>{
        return data.ratting === ratting 
    })

    if(!datafilter.length){
       datahtml += "<H1>Data Not Found</H1>"
    }
    else{
    datafilter.forEach( function (data){
        datahtml +=`<div class="testimonial">
        <img src="${data.image}"/>
        <p>${data.comment}</p>
        <h3>~ ${data.nama}</h3>
    </div>`
    })}
    document.getElementById("testimonials").innerHTML = datahtml
}
