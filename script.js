const DATA = './data.json';
const clearButton = document.querySelector('.clearButton');
const jobTags = document.querySelectorAll('.tag'); // individual job posting tags
const chosenTags = document.querySelector('.chosen-tags .list'); // list with tags


const clearJobTags = (button) => {
  
    button.addEventListener('click', () => {
        let tag = chosenTags.children;
        for (let i = 0; i < tag.length; i++) {
            tag[i].innerText = '';
        }
    })
}

const fetchData = async data => {
    const res = await fetch(data);
    const jobListings = await res.json(); 
    let jobDetails = [];
    jobListings.map((job, i) => {
        let jobLanguages = job.languages;
        let jobTools = job.tools;
        let jobLevel = job.level;
        let jobRole = job.role;
        jobDetails.push(jobLanguages, jobTools, jobLevel, jobRole);
       
    })
    let filterJobDetails = [...new Set(jobDetails.flat())];
    console.log(filterJobDetails);

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
            li.classList.add('chosen-tag');
            tag.disabled = true;
            chosenTags.appendChild(li);
            
        })
    })
}

// function handleDuplicateTagsInFilterBar(list, tag) {
//     let listArray = Array.from(list);

//     if (listArray.includes(tag)) {
        
//         tag.disabled = true;
//     }
// }

clearJobTags(clearButton);
fetchData(DATA);
updateJobFilter();