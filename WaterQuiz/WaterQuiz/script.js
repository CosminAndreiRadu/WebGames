const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}


exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}


continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions();
}

let que_count = 0;

function showQuestions(){
    const que_text = document.querySelector(".que_text");
    let que_tag = <span>+ questions[0].question +</span>;
    que_text.innerHTML = que_tag;
} 
