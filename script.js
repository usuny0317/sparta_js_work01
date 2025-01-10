let url="https://api.themoviedb.org/3/movie/157336?api_key=2b065c456f47ab719385884224806499"
    fetch(url)
    .then((res) => res.json())
    .then((data)=>{
        console.log(data)
    })
    .catch((err)=>{
        alert(`${err}: 데이터를 가져오지 못했습니다..`)
    })



