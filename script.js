const DATA = './data.json';
const clearButton = document.querySelector('.clearButton');
const jobTags = document.querySelectorAll('.job-tags button');
let arrayJobTags = Array.from(jobTags);


const clearJobTags = (button) => {
    const allTags = document.querySelector('.tags');

    button.addEventListener('click', () => {
        let tag = allTags.children;
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

clearJobTags(clearButton);
fetchData(DATA);