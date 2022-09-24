const mode = document.querySelector('.mode img');
const items = document.querySelectorAll('nav, .search, .search input, select, .container, .card-container, .card, .card h4, .card p, .feedback-container,.back-btn,.border-countries button');
const cardContainer = document.querySelector('.card-container');
const cards = document.querySelectorAll('.card');
const select = document.querySelector('.select');
const search = document.querySelector('.search');
const searchForm = document.querySelector('.search form');
const feedbackContainer = document.querySelector('.feedback-container');
const selectEvent = document.querySelector('#region');

let searchFormInput = searchForm.search.value.trim();
const cardsArray = Array.from(cards);

// let card;
// cardsArray.forEach(card=>{
// console.log(card)
// })
// console.log(card)
mode.addEventListener('click', ()=>{
    // console.log(window.getComputedStyle(background))

  
 
    items.forEach(item =>{
        
         item.classList.toggle('active');
    })

    cards.forEach(item =>{
        console.log(item)
         item.classList.toggle('active');
    })
})
async function updateUI(data){

    cards.forEach(function(card,i){
        console.log(data[0].population)
            card.innerHTML = `
            <div class="card">
            <img src="${data[i].flags.png}" alt="">
            <h4>${data[i].name.common}</h4>
            <p> <span>Population</span>: ${data[i].population}</p>
            <p> <span>Region</span> : ${data[i].region}</p>
            <p> <span>Capital</span> : ${data[i].capital[0]}</p>
        </div>
            `;

    })
 

    // console.log(cardsArray)
    // for(let i = 0; i < data.length; i++){
    //     // console.log(data[0])
    //     for(let k = 0; k < cardsArray.length; k++){
    //         // cardsArray[i].style.display = 'grid';
            
    //         console.log(data[0].population)
    //         cardsArray[i].innerHTML = `
    //         <div class="card">
    //         <img src="${data[i].flags.png}" alt="">
    //         <h4>${data[i].name.common}</h4>
    //         <p> <span>Population</span>: ${data[i].population}</p>
    //         <p> <span>Region</span> : ${data[i].region}</p>
    //         <p> <span>Capital</span> : ${data[i].capital[0]}</p>
    //     </div>
    //         `;
       
        // }
        
      
       
    // }
    
}



async function getDatas(){

    const key = await fetch('https://restcountries.com/v2/alpha/us');
    const countryName = await fetch('https://restcountries.com/v3.1/all');
    
    const response2 = await countryName.json();
    // console.log(response2)
    const response = await key.json();
    // console.log(response)
     return response2;

}

 getDatas().then((datas) => {
    //console.log(datas)
    updateUI(datas)
    //  datas.forEach((data,i)=>{
    //      console.log(data)
    //     updateUI(data)
    //  })
 })


 async function searchUI(name){

    const search = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const response3 = search.json();
    return response3; 
 }


 const updateSearchUI = (data)=>{

    cards.forEach(function(card,i){
        card.innerHTML =  `
        <div class="card">
        <img src="${data[i].flags.png}" alt="">
        <h4>${data[i].name.common}</h4>
        <p> <span>Population</span>: ${data[i].population}</p>
        <p> <span>Region</span> : ${data[i].region}</p>
        <p> <span>Capital</span> : ${data[i].capital[0]}</p>
    </div>
        `;
    })
 }
 

    searchForm.addEventListener('submit', function(e){
        e.preventDefault();
         searchFormInput = searchForm.search.value.trim();

         searchUI(searchFormInput).then(data=>{

            console.log(data)
            updateSearchUI(data);
          
        
             
            });
       
       // console.log(searchFormInput);
    });

    //region filter

    async function filterRegion(region){

        const regionData = await fetch(`https://restcountries.com/v3.1/region/${region}`);
        const regionResponse = await regionData.json();
        return regionResponse;
    };

  

    selectEvent.addEventListener('change', ()=>{


        const selectValue = selectEvent.value;

        filterRegion(selectValue).then(data=>{
            console.log(data);

            updateSearchUI(data);
        });

    });



cards.forEach(function(card,i){
    card.addEventListener('click',function(){
       
       cardContainer.style.display = 'none';
    //    card[i].style.display = 'none';
       select.style.display = 'none';
       search.style.display = 'none';
       feedbackContainer.style.left = '0';

      getDatas().then(data =>{

        

        console.log(data[i])

        feedbackContainer.innerHTML = `
        <div class="feedback-container">
        <button class="back-btn"><img src="left.png" alt=""> Back</button>
        <div class="feedback-details-container">
            <img src="${data[i].flags.png}" alt="">
            <div class="inner-feedback-details">
                <h1>${data[i].name.common}</h1>
 
 
                <div class="content-flex">
                    <div>
                        <p> <span>Native Name</span>:${data[i].name.nativeName.spa.common} </p>
                        <p> <span>Population</span>: ${data[i].population}</p>
                        <p> <span>Region</span> : ${data[i].region} </p>
                        <p> <span>Sub Region</span> : ${data[i].subregion}</p>
                        <p> <span>Capital</span> : ${data[i].capital[0]}</p>
                    </div>
                    <div>
                        <p> <span>Top Level Domain</span> : ${data[i].tld[0]}</p>
                        <p> <span>Currencies</span> : ${data[i].currencies}</p>
                        <p> <span>Languages</span> : ${data[i].languages.eng},${data[i].languages[1]}</p>
    
                    </div>
                </div>
               
                <div class="border-countries">
                    <h4>Border Countries:</h4>
                    <button>${data[i].borders[0]}</button>
                    <button>${data[i].borders[1]}</button>
                    <button>${data[i].borders[2]}</button>
                </div>
            </div>
        </div>
        
        `;

       })


      
        console.log('card clicked')
    })
})
 