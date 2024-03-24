const DATA = './data.json';
const clearButton = document.querySelector('.clearButton');
const jobTags = document.querySelectorAll('.job-tags button'); // 
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
        console.log('Languages: ', jobLanguages, '--- Tools: ', jobTools);
    })
}

const updateJobFilter = () => {
    jobTags.forEach(tag => {
        tag.addEventListener('click', () => {
            chosenTags.append(tag);
            console.log(tag);
        })
    })
}

clearJobTags(clearButton);
fetchData(DATA);
updateJobFilter();