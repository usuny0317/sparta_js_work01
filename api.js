const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "2b065c456f47ab719385884224806499";
//언어 따로 해둬야 나중에 편하다고 조언해주셨다.
const LANGUAGE = "ko-KR";

//불러오기
export async function fetchMovies(page = 1) {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
        alert("불러오기 api.js 오류남..")
    }
    const rel=response.json()
    return await rel;
}

//검색하기
export async function searchMovies(query) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${LANGUAGE}&query=${query}`;
    const response = await fetch(url);
    if (!response.ok) {
        alert("검색 api에서 오류남..")
    }
    const rel=response.json();
    return await rel;
}