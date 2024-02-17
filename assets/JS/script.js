function submitData() {
let name = document.getElementById("name").value
let email = document.getElementById("email").value
let phonenumber = document.getElementById("phonenumber").value
let subject =document.getElementById("subject").value
let message = document.getElementById("message").value

if(name == ""){
    alert("Please enter your name")
    return
}
else if(email == ""){
    alert("Please enter your email")
    return
}
else if(phonenumber == ""){
    alert("Please enter your phone number")
    return
}
else if (subject ==""){
    alert("please enter your subject")
}
else if (message =="") {
    alert("Please enter your message")
    return
}

const emailDestination = "freihan570@gmail.com"
let a = document.createElement("a")
a.href =`mailto:${emailDestination}?subject=${subject}&body=hello my name is ${name}, my message is ${message}, please contact me in this number ${phonenumber}, or my email in ${email}`
a.click()
let data =[
    name,
    email,
    phonenumber,
    subject,
    message
]
console.log(data)
}