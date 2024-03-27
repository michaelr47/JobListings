const DATA = './data.json';
const clearButton = document.querySelector('.clearButton');
const jobTags = document.querySelectorAll('.tag'); // individual job posting tags
const chosenTags = document.querySelector('.chosen-tags'); // div with tags


const clearJobTags = (button) => {
  
    button.addEventListener('click', () => {
        let tag = chosenTags.children;
        for (let i = 0; i < tag.length - 1; i++) {
            tag[i].innerText = '';
        }
    })
}

const fetchData = async data => {
    const res = await fetch(data);
    const jobListings = await res.json();
    jobListings.map((job, i) => {
        let jobLanguages = job.languages;
        let jobTools = job.tools;
    })
}

const updateJobFilter = () => {
    jobTags.forEach(tag => {
        tag.addEventListener('click', () => {
            let li = document.createElement('li');
            li.innerHTML = ` 
        
                <span>${tag.textContent}</span>
    
                <button>
                    <img src="./images/icon-remove.svg" alt="x icon">
                </button>
          
            `;
            li.classList.add('chosen-tag')
            chosenTags.append(li);
            
            console.log(li);
        })
    })
}

clearJobTags(clearButton);
fetchData(DATA);
updateJobFilter();