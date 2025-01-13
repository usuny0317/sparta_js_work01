//사진 데이터 앞에 붙일거
const image_front="http://image.tmdb.org/t/p/";
//카드 추가하기 위해 카드 그룹의 아이디 가져와서 정의해두기
const momcards =document.getElementById('cards')


let url="https://api.themoviedb.org/3/movie/popular?api_key=2b065c456f47ab719385884224806499&language=ko-KR&page=1"
    fetch(url)
    .then((res) => {return res.json()})
    .then((data)=>{
        let movie=data.results
        console.log(movie)
        for(let i=0; i<movie.length; i++){
            let newcard= document.createElement('div');
            newcard.innerHTML=`
            <div id="card">
                <img src="${image_front}original${movie[i].backdrop_path}" class="images">
                <div class="textss">
                    <p>${movie[i].title}</p>
                    <small>${movie[i].vote_average}</small>
                </div>
            </div>` 
            momcards.appendChild(newcard);
        }
    })
    .catch((err)=>{
        alert(`${err}: 데이터를 가져오지 못했습니다..`)
    })


//엔터(키번호13)누르면 동작하기 
press_enter=() =>{
    if(window.event.keyCode ==13){
        searchTitle();
    }
};

//검색
function searchTitle(){
    momcards.replaceChildren();
    let input_value=document.getElementById("search").value;
    fetch(url)
    .then((res) => {return res.json()})
    .then((data)=>{
        let movie_val =data.results;
        for(let  i =0 ; i<movie_val.length; i++){
            if(movie_val[i].title.includes(input_value)){
                let newcard= document.createElement('div');
                newcard.innerHTML=`<div id="card">
                    <img src="${image_front}original${movie_val[i].backdrop_path}" class="images">
                    <div class="textss">
                    <p>${movie_val[i].title}</p>
                    <small>${movie_val[i].vote_average}</small>
                    </div>
                </div>` 
            momcards.appendChild(newcard);}}})
    .catch((err)=>{
        alert(`${err}: 데이터를 가져오지 못했습니다..`)
    }) 
}

//모달 열어보기
const mopen= document.querySelector(".modalopen")
const mclose=document.querySelector(".modalclose")
const modal=document.querySelector(".modal")

function opmodal(){
    mopen.addEventListener("click",(e)=>{
        modal.classList.remove("hidden"); 
        console.log(`${e.target.innerText}입니다`)
    })
    mclose.addEventListener("click", function(){
        modal.classList.add("hidden")
    })
}
