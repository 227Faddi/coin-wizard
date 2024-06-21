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
    choicesContainer.style.display = 'none';
    noChoiceAlert.style.display = 'none'
    result.innerText = `${userChoice}? Ready to see the magic? Flip It!`
}

flipBtn.addEventListener('click', flipCoin)
function flipCoin(){
    if(userChoice === ''){
        noChoiceAlert.style.display = 'block'
    } else{
        spinner.style.display = 'block';
        noChoiceAlert.style.display = 'none'
        setTimeout(() =>{
            // to change to /random when server is online
            fetch('http://localhost:8000/random')
            .then(res => res.json())
            .then(data =>{
                if(data.result === userChoice){
                    result.innerText = `Congratulations! The coin landed on ${data.result}!`
                } else{
                    result.innerText = `Better luck next time! The coin landed on ${data.result}.`
                }
                result.style.display = 'block';
                spinner.style.display = 'none';
                flipBtn.style.display = 'none';
                refreshBtn.style.display = 'block';
            })
            .catch(err => console.error(err))
        }, 500)
    }
}

refreshBtn.addEventListener('click', () => {
    location.reload();
});