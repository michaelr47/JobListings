const DATA = './data.json';
const clearButton = document.querySelector('.clearButton');
const jobTags = document.querySelectorAll('.tag'); // individual job posting tags
const chosenTags = document.querySelector('.chosen-tags .list'); // filter bar


const clearJobTags = (button) => {
  
    button.addEventListener('click', () => {
        let tag = chosenTags.children;
        for (let i = 0; i < tag.length; i++) {
            tag[i].innerText = '';
        }
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
            
            displayFilterBar();    
            filterJobListings(jobListings, chosenTagTexts);
            console.log(jobListings, chosenTagTexts);
            const tagText = tag.textContent;
            if (!chosenTagTexts.includes(tagText)) {
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
                chosenTagTexts.push(tagText);
                
            }
            
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


window.onload = function() {
    checkFilterBar();
};


clearJobTags(clearButton);
addToFilter();
deleteJobTag();
