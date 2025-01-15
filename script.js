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
            <div id="card" class="card">
                <img src="${image_front}original${movie[i].backdrop_path}" class="images">
                <div class="textss">
                    <p class="title">${movie[i].title}</p>
                    <small class="avg">${movie[i].vote_average}</small>
                    <p class="sub hidden2" >${movie[i].overview}</p>
                    <p class="release hidden2">${movie[i].release_date} </p>
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
                newcard.innerHTML=`<div id="card" class="card">
                    <img src="${image_front}original${movie_val[i].backdrop_path}" class="images">
                    <div class="textss">
                    <p class="title">${movie_val[i].title}</p>
                    <small class="avg">${movie_val[i].vote_average}</small>
                    <p class="sub hidden2" >${movie_val[i].overview}</p>
                    <p class="release hidden2">${movie_val[i].release_date} </p>
                    </div>
                </div>` 
            momcards.appendChild(newcard);}}})
    .catch((err)=>{
        alert(`${err}: 데이터를 가져오지 못했습니다..`)
    }) 
}

//모달 열어보기
const mopen= document.querySelector(".modalopen")
const modal=document.querySelector(".modal")

mopen.addEventListener("click",(e)=>{
    modal.classList.remove("hidden"); 
    
    const card = e.target.closest(".card");
    console.log("card",card)
    if(card){
        const img=card.querySelector(".images");
        const imgsrc=img.src;
        const title=card.querySelector(".title").innerText;
        const avg=card.querySelector(".avg").innerText;
        const sub=card.querySelector(".sub").innerText;
        const rel=card.querySelector(".release").innerText;

        modal.innerHTML=`<div class="modal_body">
            <img src="${imgsrc}" class="images"/>
            <div class="textss">
                <p>${title}</p>
                <p>${sub}</p>
                <p>${rel}</p>
                <small>${avg}</small>
            </div>
            <button class="booking">북마크 하기</button>
            <button class="modalclose">x</button>
        </div>`
        

        const gbookig=document.querySelector(".booking")
        gbookig.addEventListener("click", function(){
            // 객체로 지정
            const dataobj = {
                src: imgsrc,
                title: title,
                sub: sub,
                rel: rel,
                avg: avg
            }
            //객체 JSON으로 변경.
            const objtojson=JSON.stringify(dataobj);

            window.localStorage.setItem(`card${title}`,objtojson)
            console.log(objtojson)
        })

        const mclose=document.querySelector(".modalclose")
        mclose.addEventListener("click", function(){
            modal.classList.add("hidden")
        })
    }else{console.log("요소가 없는데?")}
   
})
