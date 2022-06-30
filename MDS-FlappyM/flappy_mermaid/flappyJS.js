
let title =document.querySelector('.title');
let actions =document.querySelector('.actions');
let background =document.querySelector('.background').getBoundingClientRect();
let mermaid = document.querySelector('.mermaid');
let mermaid_properties = mermaid.getBoundingClientRect();
let score_text =document.querySelector('.score_text');
let score_points =document.querySelector('.score_points');
let gravity = 0.5;



document.addEventListener('keydown', (k) => {
    

if (k.key == 'Enter' ) {   
    

    actions.innerHTML = '';
    title.innerHTML = '';
    score_text.innerHTML = 'Score : ';
    score_points.innerHTML = '0';
   
    

    play();
}
});

function play() {
    

    var mermaidY = 0;

    function gravity_function() {
      
    
        mermaidY = mermaidY + gravity;
        
        document.addEventListener('keydown', (e) => {
            
        if (e.key == 'ArrowUp' ) {
            mermaidY = -8;
        }
        });
    
    
    
        mermaid.style.top = mermaid_properties.top + mermaidY + 'px';
        mermaid_properties = mermaid.getBoundingClientRect();

        requestAnimationFrame(gravity_function);
    }   

gravity_function();

}









