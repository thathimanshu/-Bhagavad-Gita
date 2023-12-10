let inputs = document.querySelectorAll('.in');
let url = 'https://bhagavadgitaapi.in/slok/'
let button = document.querySelector('#get');
let nextButton = document.querySelector('#next');
let numVerses = [0,47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 34, 27, 20, 24, 28, 78];

let shlok = 15;
let adhyay = 15;

async function changeColorRandom(){
    let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    let disp = document.querySelector('.display');
    disp.style.borderColor = randomColor;
    disp.style.boxShadow = `0 0 10rem ${randomColor}80`;
}
async function start(){
    changeColorRandom();
    try{
        let response = await fetch(url+15+'/'+15+'/');
        let data = await response.json();
        
        document.querySelector('.sanskrit').textContent = data.slok;
        document.querySelector('.english').textContent = data.siva.et;
    }
    catch(err){
        alert(err);
    }
}
start();
button.addEventListener("click",async ()=>{
    try{
        let ad_empty = false;
        adhyay = inputs[0].value ? inputs[0].value : Math.floor(Math.random() * 18), ad_empty = true + 1;
        shlok = inputs[1].value ? inputs[1].value : Math.floor(Math.random() * numVerses[adhyay]) + 1;
        
        while(numVerses[adhyay]<shlok && ad_empty){
            adhyay = Math.floor(Math.random() * 18) + 1;
        }
        if(adhyay<=18 && adhyay>=0 && shlok<=numVerses[adhyay] && shlok>0){
            let response = await fetch(url+adhyay+'/'+shlok+'/');
            let data = await response.json();
            
            document.querySelector('.sanskrit').textContent = data.slok;
            let eng = data.siva.et;
            if(!eng.includes('did not comment')){
                document.querySelector('.english').textContent = data.siva.et;
            }
            else{
                document.querySelector('.english').textContent = "";
            }
            changeColorRandom();
        }

        else{
            alert("Bad input value");
        }
    }
    catch(err){
        alert(err);
    }
});

nextButton.addEventListener("click",async ()=>{
    shlok++;
    if(numVerses[adhyay]<shlok){
        adhyay++;
        shlok = 1;
    }

    try{
        let response = await fetch(url+adhyay+'/'+shlok+'/');
        let data = await response.json();
        
        document.querySelector('.sanskrit').textContent = data.slok;
        let eng = data.siva.et;
        if(!eng.includes('did not comment')){
            document.querySelector('.english').textContent = data.siva.et;
        }
        else{
            document.querySelector('.english').textContent = "";
        }
        changeColorRandom();
    }
    catch(err){
        alert(err);
    }
});