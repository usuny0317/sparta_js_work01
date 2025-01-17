const img_front="http://image.tmdb.org/t/p/";


//영화 가져와서 카드에 넣기
export function getmovie( data,cardsID){
    cardsID.replaceChildren();
    data.forEach(mdata => {
        const newcard=document.createElement("div");
        newcard.innerHTML=`<div id="card" class="card">
                <img src="${img_front}original${mdata.backdrop_path}" class="images">
                <div class="textss">
                    <p class="title">${mdata.title}</p>
                    <small class="avg">${mdata.vote_average}</small>
                    <p class="sub hidden2" >${mdata.overview}</p>
                    <p class="release hidden2">${mdata.release_date} </p>
                </div>
            </div>` 
        cardsID.appendChild(newcard);
    });
}