var ratings = document.getElementsByClassName("rating")
for(let i = 0; i < ratings.length; i++)
{
    ratings[i].addEventListener("click", function(){changeColor(ratings[i].getAttribute("id"))})
}

function changeColor(id)
{
    for(let i = 0; i < ratings.length; i++)
        {
            ratings[i].innerHTML = "☆";
        }   
    switch(id)
    {
        case "oneStar":
            swapOneStar();
            break;
        case "twoStar":
            swapTwoStar();
            break;
        case "threeStar":
            swapThreeStar();
            break;
        case "fourStar":
            swapFourStar();
            break;   
        case "fiveStar":
            swapFiveStar();
            break;                      
    }
}

function swapOneStar()
{
    document.getElementById("oneStar").innerHTML = "★";
}

function swapTwoStar()
{
    swapOneStar();
    document.getElementById("twoStar").innerHTML = "★";
}

function swapThreeStar()
{
    swapTwoStar();
    document.getElementById("threeStar").innerHTML = "★";
}

function swapFourStar()
{
    swapThreeStar();
    document.getElementById("fourStar").innerHTML = "★";
}

function swapFiveStar()
{
    swapFourStar();
    document.getElementById("fiveStar").innerHTML = "★";
}