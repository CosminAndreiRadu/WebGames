
let title =document.querySelector('.title');
let actions =document.querySelector('.actions');
let background =document.querySelector('.background').getBoundingClientRect();
let mermaid = document.querySelector('.mermaid');
let mermaid_properties = mermaid.getBoundingClientRect();
let score_text =document.querySelector('.score_text');
let score_points =document.querySelector('.score_points');
let gravity = 0.5;
let obstacle_distance  = 0; //intre obstacole
let obstacle_gap = 37;//intre stalpi
let speed=4;



document.addEventListener('keydown', (k) => {
    

if (k.key == 'Enter'  ) {   
    
    mermaid.style.top = '30%';

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

    function create() {
       ///trebuie sa generam noi obstacole
     
        if (obstacle_distance >100) {
    
            obstacle_distance = 0
            
         let random_obstacle_gap_pos = Math.floor(Math.random() * 50) +10;

 ///stalpii de sus
        let new_obstacle = document.createElement('div');
        new_obstacle.className = 'obstacle_sprite';
       
        new_obstacle.style.top =random_obstacle_gap_pos -70 + '%';
        
        document.body.appendChild(new_obstacle);

///stalpii de jos
        new_obstacle = document.createElement('div');
        new_obstacle.className = 'obstacle_sprite';
    
        new_obstacle.style.top = random_obstacle_gap_pos + obstacle_gap + '%';
            
        document.body.appendChild(new_obstacle);

        
    
        }
        obstacle_distance+=1;
    
        requestAnimationFrame(create);
    }

    function moving_function() {
    
        
        let obstacle_sprite = document.querySelectorAll('.obstacle_sprite');
         obstacle_sprite.forEach((e) => {
            
        let obstacle_sprite_properties = e.getBoundingClientRect();
    
        e.style.left = obstacle_sprite_properties.left - speed + 'px';
         
        });
    
        requestAnimationFrame(moving_function);
    }
    
    
    

create();
moving_function();
gravity_function();


}









