// OOP Concept//
class person{
    constructor (name,quote,img){
        this._name = name;
        this._quote = quote;
        this._img = img;
    }
    get name(){
    return this._name
    }
    set name (value){
        if(value=== ""){
        return `isikan nama`
    }   
    }
    get quote(){
    return this._quote
    }
    set quote (value){
        if(value=== ""){
        return `isikan quote`
    }
    }
    get img(){
        return this._img
        }
        set img (value){
            if(value=== ""){
            return `isikan image`
        }
        }
    html(){
    return `<div class="testimonial">
            <img  src="${this.img}"/>
            <p>${this.quote}</p>
            <h3>~ ${this.name}</h3>
            </div>`
    }
}

class company extends person{
    constructor(nama,quote,img){
        super(nama,quote,img)
    }
    html(){
        return `<div class="testimonial">
                <img  src="${this.img}"/>
                <p>${this.quote}</p>
                <h3>~ ${this.name} enterprice</h3>
                </div>`
        }
}

let testimonial1 = new person("reihan","apasih","https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=400")
let testimonial2 = new person("FIrdaus","mainnya bagus sekali, mainnya bagus sekali, mainnya bagus sekali, mainnya bagus sekali, mainnya bagus sekali","https://images.pexels.com/photos/9950569/pexels-photo-9950569.jpeg?auto=compress&cs=tinysrgb&w=400")
let testimonial3 = new company("wayne","tetap berkarya","https://images.pexels.com/photos/9660935/pexels-photo-9660935.jpeg?auto=compress&cs=tinysrgb&w=400")

let testimonials =[testimonial1,testimonial2,testimonial3]

let testimonialshtml =""
for(let index = 0; index < testimonials.length ;index++){
    testimonialshtml += testimonials[index].html()
}
console.log(testimonialshtml)
document.getElementById("testimonials").innerHTML = testimonialshtml