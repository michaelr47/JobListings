const DATA = './data.json';
const clearButton = document.querySelector('.clearButton');
const jobTags = document.querySelectorAll('.tag'); // individual job posting tags
const chosenTags = document.querySelector('.chosen-tags .list'); // filter bar


const clearJobTags = (button) => {
  
    button.addEventListener('click', () => {
      
        let tag = chosenTags.children;
        for (let i = 0; i < tag.length; i++) {
            tag[i].remove();
        }
        checkFilterBar();
    })
}

const fetchData = async (data) => {
    try {
        const res = await fetch(data);
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const jobListings = await res.json();
        return jobListings;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return;
    };
}


 const filterJobListings = (jobListings, selectedTags) => { 
    
    return jobListings.filter(job => {
        const matchesTags = job.languages.concat(job.tools).some(tag => selectedTags.includes(tag));   
        const matchesLevel = selectedTags.includes(job.level);   
        const matchesRole = selectedTags.includes(job.role);  
      
        return matchesTags || matchesLevel || matchesRole;
    });
};
   

const addToFilter = async () => {
    const chosenTagTexts = Array.from(chosenTags.querySelectorAll('span')).map(span => span.textContent);
    const jobListings = await fetchData(DATA);
    jobTags.forEach(tag => {
        tag.addEventListener('click', async () => {
            const tagText = tag.textContent;
            displayFilterBar();    
            if (!chosenTagTexts.includes(tagText)) {
                chosenTagTexts.push(tagText);
                let li = document.createElement('li');
                li.innerHTML = ` 
            
                    <span>${tag.textContent}</span>
                                                            
                    <button>
                        <img src="./images/icon-remove.svg" alt="x icon ">
                    </button>
            
                `;

                li.classList.add('chosen-tag');
                tag.disabled = true;
                chosenTags.appendChild(li);
                   
            }
            const filteredListings = filterJobListings(jobListings, chosenTagTexts);
            updateJobListingsUI(filteredListings)
            
        })
    })
  
}

function deleteJobTag() {
    const chosenTagsContainer = document.querySelector('.chosen-tags .list');

    chosenTagsContainer.addEventListener('click', (event) => {
        const clickedElement = event.target;

        if (clickedElement.tagName === 'BUTTON' || (clickedElement.tagName === 'IMG' && clickedElement.parentElement.tagName === 'BUTTON')) {
            const listItem = clickedElement.closest('.chosen-tag');
            if (listItem) {
                listItem.remove();
                checkFilterBar();
            }
        }
    });
}

function displayFilterBar() {
    const chosenTagsContainer = document.querySelector('.chosen-tags');
    if (chosenTagsContainer.classList.contains('hidden')) {
        chosenTagsContainer.classList.remove('hidden');
    }
    chosenTagsContainer.style.display = 'flex';
}


function checkFilterBar() {
    if (chosenTags.children.length === 0) {
        chosenTags.parentElement.style.display = 'none';
    } else {
        chosenTags.parentElement.style.display = 'flex';
    }
}

// render filtered job listings function - example
function updateJobListingsUI(jobListings) {

    const jobListingsContainer = document.querySelector('.listings');
   
    jobListingsContainer.innerHTML = '';
  
    jobListings.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('job');
       
        const imageElement = document.createElement('img');
        imageElement.src = job.logo;
        imageElement.alt = job.company;
        
        const leftContentElement = document.createElement('div');
        leftContentElement.classList.add('leftContent-job');
        
        const companyElement = document.createElement('div');
        companyElement.classList.add('company');
        companyElement.innerHTML = `<h4>${job.company}</h4>`;
        
        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.innerHTML = `
            <p><b>${job.position}</b></p>
            <div class="title-details">
                <span>${job.postedAt}</span>
                <span class="dot"></span>
                <span>${job.contract}</span>
                <span class="dot"></span>
                <span>${job.location}</span>
            </div>
        `;
        
        const jobTagsElement = document.createElement('div');
        jobTagsElement.classList.add('job-tags');
        const languages = job.languages;
        const tools = job.tools;
        const level = job.level;
        const role = job.role;
        const jobTagsArray = [languages, tools, level, role].flat();

        jobTagsArray.forEach(tag => {
            const tagButton = document.createElement('button');
            tagButton.classList.add('tag');
            tagButton.textContent = tag;
            jobTagsElement.appendChild(tagButton);
        });
        
       
        leftContentElement.appendChild(companyElement);
        leftContentElement.appendChild(titleElement);
        jobElement.appendChild(imageElement);
        jobElement.appendChild(leftContentElement);
        jobElement.appendChild(document.createElement('hr'));
        jobElement.appendChild(jobTagsElement);

      
        jobListingsContainer.appendChild(jobElement);
    });
};

window.onload = function() {
    checkFilterBar();
};


addToFilter();
clearJobTags(clearButton);
deleteJobTag();
