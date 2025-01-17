import { getmovie } from "./ui.js";
import { fetchMovies, searchMovies } from "./api.js";


//카드 추가하기 위해 카드 그룹의 아이디 가져와서 정의해두기
const momcards =document.getElementById('cards')

//영화 전체 가져오기
async function movies() {
    try{
        const data = await fetchMovies();
        getmovie(data.results,momcards)
    }catch(err){
        console.log(err+":오류남..")
    }
    
}

//페이지 로드 시, 실행
movies(); 

//검색기능
document.getElementById("search").addEventListener("input", async (e)=>{
    //input 내의 입력값 가져오기
    const inputval=e.target.value;

    //아무것도 없으면 전체 보내주기
    if(!inputval){
        const data = await fetchMovies(); 
        getmovie(data.results, momcards);

        return ;
    }
    const data = await searchMovies(inputval); //await 없으면 오류나더라..!
    getmovie(data.results, momcards);

})

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
            alert("북마크가 해제되었습니다!")
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