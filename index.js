document.addEventListener('DOMContentLoaded', ()=>{
    var apikey = config.API_KEY;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apikey,
            'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
        }
    };
    
    fetch('https://livescore6.p.rapidapi.com/matches/v2/list-by-date?Category=soccer&Date=20231801&Timezone=-7', options) 
    .then(
        response => {
            response.json().then(
                data => {
    
                    console.log(data);
                    let temp = "";
                    const indices=[0,1,2,34]
                    
                    const filteredStages = data.Stages.filter((stage, index) => indices.includes(index));
                    if(data){
                        document.getElementById("fixtures").innerHTML = filteredStages.map((x) => {
                            let hour=String(x.Events[0].Esd).slice(8,10)
                            let minutes=String(x.Events[0].Esd).slice(10,12)
                            let year=String(x.Events[0].Esd).slice(0,4)
                            let month=String(x.Events[0].Esd).slice(4,6)
                            let day=String(x.Events[0].Esd).slice(6,8)
                            let ampm= hour>=12 ? 'AM' : 'PM';
                            if(hour>=12){
                                day=String(parseInt(day)+1);
                            }else{
                                day=String(parseInt(day));
                            }
                            hour=hour%12;
                            hour=hour?hour:12;
                            if(parseInt(minutes)+30==60){
                                hour=parseInt(++hour);
                                if(parseInt(minutes)+30 == 60){
                                    minutes=00;
                                }else{
                                    minutes=(parseInt(minutes)+30);
                                }
                                
                            }else{
                                minutes=(parseInt(minutes)+30).toString();
                            }
                            temp += `<tr>
                            <td>${x.Cnm}</td>
                            <td>${x.Snm}</td>
                            <td>${x.Events[0].T1[0].Nm}</td>
                            <td>${x.Events[0].T2[0].Nm}</td>
                            <td>${day}/${month}/${year}</td>
                            <td>${(hour).toString().padStart(2, '0')}:${(minutes).toString().padStart(2, '0')} ${ampm}</th>
                           </tr>`;
                            
                        }).join(' ');;
        
                    }
                    
                    document.getElementById("fixtures").innerHTML += temp;
                }
            )
        }).catch((err)=>{
            console.log(err);
        })
            
        
})







