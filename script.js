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

        let flag=0;

        const img=card.querySelector(".images");
        const imgsrc=img.src;
        const title=card.querySelector(".title").innerText;
        const avg=card.querySelector(".avg").innerText;
        const sub=card.querySelector(".sub").innerText;
        const rel=card.querySelector(".release").innerText;

        for(const key in window.localStorage){
            if(window.localStorage.hasOwnProperty(key)){
                const val1=window.localStorage.getItem(key);
                //사용할 수 있게 변환.
                const val2= JSON.parse(val1)
                if(val2.title==title){flag=1;}
            }
        }

        if(flag==0){
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

            //북마크 하기
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
            alert("북마크 되었습니다!")
        })

        }
        else if(flag == 1){
            modal.innerHTML=`<div class="modal_body">
            <img src="${imgsrc}" class="images"/>
            <div class="textss">
                <p>${title}</p>
                <p>${sub}</p>
                <p>${rel}</p>
                <small>${avg}</small>
            </div>
            <button class="unbooking">북마크 해제</button>
            <button class="modalclose">x</button>
        </div>`

        // 북마크 해제하기
        const unbook=document.querySelector(".unbooking")
        unbook.addEventListener("click",function(){
            window.localStorage.removeItem(`card${title}`);
        })
        }

        // 모달 닫기
        const mclose=document.querySelector(".modalclose")
        mclose.addEventListener("click", function(){
            modal.classList.add("hidden")
        })
    }else{console.log("요소가 없는데?")}
   
})


//북마크

const showbook = document.querySelector(".book");
showbook.addEventListener("click", function(){

    alert("북마크가 눌렸습니다.")
    //카드들 자식 비우기
    momcards.replaceChildren();

    for(const key in window.localStorage){
        if(window.localStorage.hasOwnProperty(key)){
            const val1=window.localStorage.getItem(key);
            //사용할 수 있게 변환.
            const val2= JSON.parse(val1)
            let newcard= document.createElement('div');
                newcard.innerHTML=`<div id="card" class="card">
                    <img src="${val2.src}" class="images">
                    <div class="textss">
                    <p class="title">${val2.title}</p>
                    <small class="avg">${val2.avg}</small>
                    <p class="sub hidden2" >${val2.sub}</p>
                    <p class="release hidden2">${val2.rel} </p>
                    </div>
                </div>` 
            momcards.appendChild(newcard);
        }  
    }

    
})