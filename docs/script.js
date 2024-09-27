let btn=document.querySelector("button");
let div1=document.getElementById("1");
let div2=document.getElementById("2");
let div3=document.getElementById("3");
let div4=document.getElementById("4");
let div5=document.getElementById("5");


btn.addEventListener("click",()=>{

let cityname=document.getElementById("city").value;
arr=[]
url=`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=c10881cc4d2b49b66f6a9965edc60240`;
fetch(url)
.then((res)=>{
    let jsondata=res.json()
    .then((data)=>{
      for(let i=0;i<5;i++){
        let DateTime=data.list[i].dt_txt;
        let Description=data.list[i].weather[0].description;
        let Wind=data.list[i].wind.speed;
        let Temperature=Math.round((data.list[i].main.temp)-273.15);
        let Humidity=data.list[i].main.humidity;
        arr.push({DateTime,Description,Wind:`${Wind}m/s`,Temperature:`${Temperature}°C`,Humidity:`${Humidity}%`})
      }
      div1.innerText = `
                        DateTime: ${arr[0].DateTime}, 
                        Temp: ${arr[0].Temperature},
                        Description: ${arr[0].Description}, 
                        Wind: ${arr[0].Wind},  
                        Humidity: ${arr[0].Humidity}`;
      div2.innerText = `
                        DateTime: ${arr[1].DateTime},
                        Temp: ${arr[1].Temperature},  
                        Description: ${arr[1].Description}, 
                        Wind: ${arr[1].Wind}, 
                        Humidity: ${arr[1].Humidity}`;
      div3.innerText = `
                        DateTime: ${arr[2].DateTime}, 
                        Temp: ${arr[2].Temperature}, 
                        Description: ${arr[2].Description}, 
                        Wind: ${arr[2].Wind}, 
                        Humidity: ${arr[2].Humidity}`;
      div4.innerText = `
                      DateTime: ${arr[3].DateTime}, 
                      Temp: ${arr[3].Temperature}, 
                      Description: ${arr[3].Description}, 
                      Wind: ${arr[3].Wind}, 
                      Humidity: ${arr[3].Humidity}`;
      div5.innerText = `
                        DateTime: ${arr[4].DateTime}, 
                        Temp: ${arr[4].Temperature}, 
                        Description: ${arr[4].Description}, 
                        Wind: ${arr[4].Wind}, 
                        Humidity: ${arr[4].Humidity}`;
    
    })
})
.catch(()=>{
    alert("unable to fetch data");
})
})
