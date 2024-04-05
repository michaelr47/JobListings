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
    
}

const updateJobFilter = () => {
    const chosenTagTexts = Array.from(chosenTags.querySelectorAll('span')).map(span => span.textContent);
    jobTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const tagText = tag.textContent;
            if (!chosenTagTexts.includes(tagText)) {
            let li = document.createElement('li');
            li.innerHTML = ` 
        
                <span>${tag.textContent}</span>
    
                <button>
                    <img class="delete" src="./images/icon-remove.svg" alt="x icon ">
                </button>
          
            `;

            li.classList.add('chosen-tag');
            tag.disabled = true;
            chosenTags.appendChild(li);
            chosenTagTexts.push(tagText);
          
            }
        })
    })
  
}

function deleteJobTag() {

    let deleteButton = Array.from(document.querySelectorAll('.chosen-tag button'));
    console.log(deleteButton);
    
    deleteButton.forEach(button => {
        button.addEventListener('click', () => {
            let listTag = button.parentElement;
            listTag.remove();
        })
    })
  
}

clearJobTags(clearButton);
fetchData(DATA);
updateJobFilter();
deleteJobTag();
