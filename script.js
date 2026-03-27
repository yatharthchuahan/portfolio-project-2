window.onload = function()
{

    var addbutton = document.getElementById("add-hobby-btn");
    var textbox = document.getElementById("hobby-input");
    var mylist = document.getElementsByClassName("hobby-benefits")[0];
    
    addbutton.onclick = function()
    {
        var newtext = textbox.value;
        if(newtext != "")
        {
            var newlistitem = document.createElement("li");
            newlistitem.innerHTML = "<strong>" + newtext + "</strong> - nice benefit <button class='delete-btn' onclick='removeitem(this)'>Delete</button>";
            mylist.appendChild(newlistitem);
            textbox.value = "";
        }
    }
    
    // delete item function
    window.removeitem = function(button)
    {
        button.parentNode.parentNode.removeChild(button.parentNode);
    }
    
    // contact form
    var contactform = document.getElementById("contact-form");
    contactform.onsubmit = function()
    {
        var username = document.getElementById("name").value;
        var useremail = document.getElementById("email").value;
        alert("Hello " + username + " ! message sent from " + useremail);
        contactform.reset();
        return false;
    }
    
    // clock code
    function updatetime()
    {
        var today = new Date();
        var timestring = today.toLocaleString();
        document.getElementById("current-time").innerHTML = timestring;
    }
    
    updatetime();
    setInterval(updatetime, 1000);
}