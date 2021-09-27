const regionId = document.querySelector("#regionId");
const countryId = document.querySelector("#countryId");
const countryInfoId = document.querySelector("#countryInfoId");

//const baseUrl = "http://localhost:8080/rcsapp/api/country"

const baseUrl = "https://region-country-service.herokuapp.com/rcsapp/api/country"

function showCountryInfo(event){
    countryId.innerHTML = ""; 
    let region = event.target.value;
    if(region.trim().length > 0){
       
     
        fetch(`${baseUrl}/region/${region}`).then(json=>json.json()).then(resp=>{
            let str = "";
            str += '<table class="table table-striped">';
            str += '<thead><tr><th>#</th><th>Name</th><th>Capital</th><th>Region</th></tr></thead>';
            str += '<tbody>';
            for(let i=0;i<resp.length;i++){
                    let country = resp[i];
                    str +=`<tr onclick="showMoreDetails(this)"><td>${i+1}</td><td>${country.name}</td><td>${country.capital}</td><td>${country.region}</td></tr>`;
                }
            str += '</tbody>';
            str +="</table>"
            
            countryId.innerHTML = str;
        });
     
    }
    
}

function showMoreDetails(tableRow){
    let name = tableRow.childNodes[1].innerHTML
    fetch(`${baseUrl}/state/${name}`).then(json=>json.json()).then(resp=>{
       str=`<p>States of <Strong>${name}</strong></p><ul class="list-group">`;
       resp.forEach(ele=>{
           str +=`<li class="list-group-item">${ele}</li>`
       });
       str += '</ul>';
       countryInfoId.innerHTML = str;  
  
    });
}
fetch(`${baseUrl}/regionnames`).then(json=>json.json()).then(resp=>{

        let regionNames = resp['regions'];
        
        let str = `<select class='form-select' onchange='showCountryInfo(event)'>"`;
        str += '<option value="">Seleect Region</option>';
        regionNames.forEach(ele => {
            if(ele.length> 0)
                str += `<option value=${ele}>${ele}</option>`;
        });
        str +='</select>';
        regionId.innerHTML = str;
})

