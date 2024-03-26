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
            let lastTag = Array.from(document.querySelectorAll('.chosenTag'))
            console.log(lastTag);

            // need to use template literals, e.g.
            `
            <li class="chosen-tag">
            <span value="JavaScript">JavaScript</span>
            JavaScript
            <button value="JavaScript"><img src="./images/icon-remove.svg" alt="x icon"></button>
            </li>
            `
            
        })
    })
}

clearJobTags(clearButton);
fetchData(DATA);
updateJobFilter();