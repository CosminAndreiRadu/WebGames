function gravity_function() {
    if (state != 'playing') 
    
      return;
      
    mermaidY = mermaidY + gravity;
    
    document.addEventListener('keydown', (e) => {
        
    if (e.key == 'ArrowUp' ) {
        mermaidY = -8;
    }
    });

    ///ciocnire top/bottom
    if (mermaid_properties.top <= 0 || mermaid_properties.bottom >= background.bottom) {
        state = 'end';
        over.innerHTML="GAME OVER";
        actions.innerHTML = 'Restart Game - Enter';
        actions.style.left='500';
       
        return;
        } 

    mermaid.style.top = mermaid_properties.top + mermaidY + 'px';
    
    mermaid_properties = mermaid.getBoundingClientRect();

    requestAnimationFrame(gravity_function);
}   

function create() {
    if (state != 'playing') 
      return;
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

    new_obstacle.increase_score = true;

    }
    obstacle_distance+=1;

    requestAnimationFrame(create);
}

function moving_function() {
    
    if (state != 'playing')
    return;

    let obstacle_sprite = document.querySelectorAll('.obstacle_sprite');
     obstacle_sprite.forEach((e) => {
        
    let obstacle_sprite_properties = e.getBoundingClientRect();

    mermaid_properties = mermaid.getBoundingClientRect();



    ///verificam daca se ciocneste de obstacole
    if (mermaid_properties.left < obstacle_sprite_properties.left +obstacle_sprite_properties.width &&
        mermaid_properties.left +mermaid_properties.width > obstacle_sprite_properties.left &&
        mermaid_properties.top < obstacle_sprite_properties.top +obstacle_sprite_properties.height && //-18 pt bug
        mermaid_properties.top +mermaid_properties.height > obstacle_sprite_properties.top  )//+18 pt bug 
        {
            
       ///incheiem jocul
        state = 'end';
        over.innerHTML="Game Over";
        actions.innerHTML = 'Restart Game - Enter';
        actions.style.left='500';
       
        return;
        }   
   
        if ( obstacle_sprite_properties.right +speed >= mermaid_properties.left&&

             obstacle_sprite_properties.right < mermaid_properties.left)
              if(e.increase_score == true ) 
        {
            score_points.innerHTML = (parseInt(score_points.innerHTML) + 1);
        }

        e.style.left = obstacle_sprite_properties.left - speed + 'px';
     
    });

    requestAnimationFrame(moving_function);
}


let title =document.querySelector('.title');
let actions =document.querySelector('.actions');

let background =document.body.getBoundingClientRect();

let mermaid = document.querySelector('.mermaid');
let mermaid_properties =document.querySelector('.mermaid').getBoundingClientRect();
let mermaidY=0;

let score_text =document.querySelector('.score_text');
let score_points =document.querySelector('.score_points');

let gravity = 0.5;
let speed=4;

let obstacle_distance  = 0; //intre obstacole
let obstacle_gap = 37;//intre stalpi

let state = 'start';

let over=document.querySelector('.over');


document.addEventListener('keydown', (k) => {
    

if (k.key == 'Enter' && state!='playing') {   
      //pt restart
      document.querySelectorAll('.obstacle_sprite').forEach((element) => {

        element.remove();
    
        });

    mermaid.style.top = '30%';
    
    over.innerHTML=' ';
    actions.innerHTML = '';
    title.innerHTML = '';

    score_text.innerHTML = 'Score : ';
    score_points.innerHTML = '0';

    state = 'playing';
    
    mermaidY=0;
    
    gravity_function();
    create();
    moving_function();
   
   

   
}
});

    












