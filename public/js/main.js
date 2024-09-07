const result = document.querySelector('#result');
const spinner = document.querySelector('.spinner-border');
const noChoiceAlert = document.querySelector('#noChoiceAlert')
const choicesContainer = document.querySelector('#choicesContainer');
const userChoiceBtn = document.querySelectorAll('.userChoiceBtn');
const flipBtn = document.querySelector('#flipBtn');
const refreshBtn = document.querySelector('#refreshBtn');

let userChoice = '';
userChoiceBtn.forEach((el) =>{
    el.addEventListener('click', choose)
})
function choose(event){
    userChoice = event.target.innerText;
    choicesContainer.classList.add('hidden');
    noChoiceAlert.classList.add('hidden');
    result.innerText = `${userChoice}? Ready to see the magic? Flip It!`;
}

flipBtn.addEventListener('click', flipCoin)
async function flipCoin(){
    if(userChoice === ''){
        noChoiceAlert.classList.remove('hidden');
    } else{
        spinner.classList.remove('hidden');
        noChoiceAlert.classList.add('hidden');
        let response = await fetch('https://coin-wizard-two.vercel.app/random');
        if (response.headers.get('content-type').includes('application/json')) {
            let data = await response.json();
            console.log(data);
        } else {
            console.error('Response is not JSON');
        }        
        setTimeout(() =>{
            if(data.result === userChoice){
                result.innerText = `Congratulations! The coin landed on ${data.result}!`;
            } else{
                result.innerText = `Better luck next time! The coin landed on ${data.result}.`;
            }
            result.classList.remove('hidden');
            refreshBtn.classList.remove('hidden');
            spinner.classList.add('hidden');
            flipBtn.classList.add('hidden');
        }, 500)
    }
}

refreshBtn.addEventListener('click', () => {
    location.reload();
});