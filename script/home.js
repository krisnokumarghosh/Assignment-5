
const creatElements = (arr) =>{
    const elements = arr.map((elem , index) => {
        if(arr.length === 1 && elem === "enhancement"){
            return`<p class="px-[15px] py-1.5 bg-green-200 rounded-full font-medium text-[12px] text-green-500">${elem}</p>`
        }
        else if(arr.length === 1 && elem === "bug"){
            return `<p class="px-[15px] py-1.5 bg-red-300 rounded-full font-medium text-[12px] text-[#F8FAFC]">${elem}</p>`
        }
        else if(arr.length === 1){
            return `<p class="px-[15px] py-1.5 bg-[#FFF8DB] rounded-full font-medium text-[12px] text-[#D97706]">${elem}</p>`
        }
        else if(arr.length === 2){
            if(index === 0){
                return` <p class="px-[15px] py-1.5 bg-red-300 rounded-full font-medium text-[12px] text-[#F8FAFC]">${elem}</p>`
            }
            else{
                return`
            <p class="px-[15px] py-1.5 bg-[#FFF8DB] rounded-full font-medium text-[12px] text-[#D97706]">${elem}</p>`
            }
        }
    })

    return(elements.join(" "))
    
}


const showOnly = (id) =>{
    const openBtn = document.getElementById('open-btn');
    const allBtn = document.getElementById('all-btn');
    const closedBtn = document.getElementById('closed-btn');

    openBtn.classList.remove('btn-primary');
    closedBtn.classList.remove('btn-primary');
    allBtn.classList.remove('btn-primary');

    const active = document.getElementById(id);
    active.classList.add('btn-primary');
}

const activeOnly = (id) =>{
    const allSection = document.getElementById('all-issue-container');
    const openSection = document.getElementById('open-section');
    const closedSection = document.getElementById('closed-section');
    const searchSection = document.getElementById('search-section');

    allSection.classList.add('hidden');
    openSection.classList.add('hidden');
    closedSection.classList.add('hidden');
    searchSection.classList.add('hidden');

    const only = document.getElementById(id);
    only.classList.remove('hidden');
}

const manageSpinner = (status) =>{
    if(status == true){
         document.getElementById('spinner').classList.remove('hidden');
         document.getElementById('issue-container').classList.add('hidden');
    }
    else{
         document.getElementById('spinner').classList.add('hidden');
         document.getElementById('issue-container').classList.remove('hidden');
    }
}


const loadAllData = () =>{
    manageSpinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllData(data.data))
}


const loadIssueDetails = (id) =>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`

    fetch(url)
    .then((res) => res.json())
    .then((details) => displayIssueDetails(details.data))
}


const loadOpenData = () => {
    manageSpinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
    .then((resp) => resp.json())
    .then((details) => displayOpenData(details.data.filter(el => el.status === "open")))
}

const loadClosedData = () =>{
    manageSpinner(true);
     const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
    .then((resp) => resp.json())
    .then((details) => displayClosedData(details.data.filter(el => el.status === "closed")))
}




const displayAllData = (issues) =>{
    console.log(issues)
    const allIssueCount = document.getElementById("all-issue-count");
    const allIssueCards = document.getElementById('all-issue-cards');
    allIssueCount.innerHTML = '';
    allIssueCards.innerHTML = '';
    
    allIssueCount.innerHTML = `
    
    <div class="flex items-center gap-2">
                    <div class="bg-[#ECE4FF] rounded-full p-2">
                        <img src="./assets/Aperture.png" alt="" class="h-[27px] w-[27px] ">
                    </div>
                    <div>
                        <h2 class="font-semibold text-[20px] text-[#1F2937]">${issues.length} Issues</h2>
                        <p class="text-[#64748B]">Track and manage your project issues</p>
                    </div>
                </div>

                <!-- top right div -->
                 <div class="flex gap-3">
                    <div class="flex items-center gap-1">
                        <img src="./assets/Ellipse 2.png" alt="">
                        <p class="font-medium text-[#1F2937]">Open</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <img src="./assets/Ellipse 2 (1).png" alt="">
                        <p class="font-medium text-[#1F2937]">Closed</p>
                    </div>
                 </div>
    
    `

    

    issues.forEach((issue) =>{
        const issueCardDiv = document.createElement('div');
        // console.log(issue)

        issueCardDiv.innerHTML = `
        
        
                
                <div onclick="loadIssueDetails(${issue.id})" class="bg-white shadow rounded-md min-h-64 ${issue.status === "open" ? 'border-t-3 border-green-400' : 'border-t-3 border-[#A855F7]'}">
                    <div class="p-4">
                    <div class="flex justify-between items-center mb-3">
                        ${issue.status === "open" ? '<img src="./assets/Open-Status.png" alt="">' : '<img src="./assets/Closed- Status .png" alt="">'}
                        <p class="px-[25px] py-1.5 ${issue.priority === "high" ? 'bg-red-300 text-[#F8FAFC]' :'bg-[#FFF8DB] text-[#D97706]'} rounded-full font-medium text-[12px] ">${issue.priority} </p>
                    </div>

                    <div>
                        <h3 class="font-semibold text-[14px] text-[#1F2937]">${issue.title}</h3>
                        <p class="text-[12px] text-[#64748B]">${issue.description}</p>
                        <div class="flex justify-between mt-3">
                            ${creatElements(issue.labels)}
                        </div>
                    </div>

                </div>

                <div class="p-4 border-t border-gray-200 md:flex justify-between space-y-1">
                   <div class="space-y-1">
                    <p class="text-[#64748B] text-[12px]">#${issue.id} by ${issue.author}</p>
                    <p class="text-[#64748B] text-[12px]">${issue.createdAt}</p>
                   </div>

                   <div class="space-y-1 md:text-right">
                    <p class="text-[#64748B] text-[12px]">${issue.assignee ? issue.assignee :'assignee not found'}</p>
                    <p class="text-[#64748B] text-[12px]">${issue.updatedAt}</p>
                   </div>
                </div>
                </div>


             
        
        `
        allIssueCards.appendChild(issueCardDiv)
    })
    manageSpinner(false);
}


const displayIssueDetails = (issue) =>{
    console.log(issue)

    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    
                    <div class="space-y-2">
                        <h1 class="font-bold text-[24px] text-[#1F2937]">${issue.title}</h1>
                        <div class="flex gap-3 items-center">
                            <div class="badge ${issue.status === "open" ? 'badge-success' : 'badge-primary'}">${issue.status}</div>
                            <p class="text-[#64748B] text-[12px]">Opened by ${issue.author}</p>
                            <p class="text-[#64748B] text-[12px]">${issue.createdAt}</p>
                        </div>
                    </div>

                    <div class="flex gap-2 items-center">
                        ${creatElements(issue.labels)}
                    </div>

                    <div>
                        <p class="text-[#64748B]">${issue.description}</p>
                    </div>

                    <div class="bg-gray-100 rounded-md p-2 flex justify-around">
                        <div class="space-y-1">
                            <p class="text-[#64748B]">Assignee:</p>
                            <p class="text-[#1F2937] font-semibold">${issue.assignee ? issue.assignee : 'assignee not found'}</p>
                        </div>
                        <div class="space-y-1">
                            <p class="text-[#64748B]">Priority:</p>
                            <div class="badge ${issue.priority === 'high' ? 'badge-error' : 'badge-warning'}">${issue.priority}</div>
                        </div>
                    </div>
    
    `;

    document.getElementById("issue_modal").showModal();
}


const displayOpenData = (open) =>{
    // console.log(open)
    const openIssueCount = document.getElementById('open-issue-count');
    const openissueContainer = document.getElementById('open-issue-container');
    openIssueCount.innerHTML = "";
    openissueContainer.innerHTML = "";

    openIssueCount.innerHTML = `
    
        <div class="flex items-center gap-2">
                    <div class="bg-[#ECE4FF] rounded-full p-2">
                        <img src="./assets/Aperture.png" alt="" class="h-[27px] w-[27px] ">
                    </div>
                    <div>
                        <h2 class="font-semibold text-[20px] text-[#1F2937]">${open.length} Issues</h2>
                        <p class="text-[#64748B]">Track and manage your project issues</p>
                    </div>
                </div>

                <!-- top right div -->
                 <div class="flex gap-3">
                    <div class="flex items-center gap-1">
                        <img src="./assets/Ellipse 2.png" alt="">
                        <p class="font-medium text-[#1F2937]">Open</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <img src="./assets/Ellipse 2 (1).png" alt="">
                        <p class="font-medium text-[#1F2937]">Closed</p>
                    </div>
                 </div>
    
    `

    open.forEach((elem) =>{
        const openCardDiv = document.createElement('div');

       openCardDiv.innerHTML = `
       
        <div onclick="loadIssueDetails(${elem.id})" class="bg-white shadow rounded-md min-h-64 border-t-3 border-green-400">
                    <div class="p-4">
                    <div class="flex justify-between items-center mb-3">
                       <img src="./assets/Open-Status.png" alt="">
                        <p class="px-[25px] py-1.5 ${elem.priority === "high" ? 'bg-red-300 text-[#F8FAFC]' :'bg-[#FFF8DB] text-[#D97706]'} rounded-full font-medium text-[12px] ">${elem.priority} </p>
                    </div>

                    <div>
                        <h3 class="font-semibold text-[14px] text-[#1F2937]">${elem.title}</h3>
                        <p class="text-[12px] text-[#64748B]">${elem.description}</p>
                        <div class="flex justify-between mt-3">
                            ${creatElements(elem.labels)}
                        </div>
                    </div>

                </div>

                <div class="p-4 border-t border-gray-200 md:flex justify-between space-y-1">
                   <div class="space-y-1">
                    <p class="text-[#64748B] text-[12px]">#${elem.id} by ${elem.author}</p>
                    <p class="text-[#64748B] text-[12px]">${elem.createdAt}</p>
                   </div>

                   <div class="space-y-1 md:text-right">
                    <p class="text-[#64748B] text-[12px]">${elem.assignee ? elem.assignee :'assignee not found'}</p>
                    <p class="text-[#64748B] text-[12px]">${elem.updatedAt}</p>
                   </div>
                </div>
                </div>
       
       `
       openissueContainer.appendChild(openCardDiv)
    })
    manageSpinner(false);
} 

const displayClosedData = (closed) =>{
    // console.log(closed);
    const closedIssueCount = document.getElementById('closed-issue-count');
    const closedIssueContainer = document.getElementById('closed-issue-container');
    closedIssueCount.innerHTML = "";
    closedIssueContainer.innerHTML = "";

    closedIssueCount.innerHTML = `
    
        <div class="flex items-center gap-2">
                    <div class="bg-[#ECE4FF] rounded-full p-2">
                        <img src="./assets/Aperture.png" alt="" class="h-[27px] w-[27px] ">
                    </div>
                    <div>
                        <h2 class="font-semibold text-[20px] text-[#1F2937]">${closed.length} Issues</h2>
                        <p class="text-[#64748B]">Track and manage your project issues</p>
                    </div>
                </div>

                <!-- top right div -->
                 <div class="flex gap-3">
                    <div class="flex items-center gap-1">
                        <img src="./assets/Ellipse 2.png" alt="">
                        <p class="font-medium text-[#1F2937]">Open</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <img src="./assets/Ellipse 2 (1).png" alt="">
                        <p class="font-medium text-[#1F2937]">Closed</p>
                    </div>
                 </div>
    
    `

    closed.forEach((elem) =>{
        const closedCardDiv = document.createElement('div');

        closedCardDiv.innerHTML = `
        
            <div onclick="loadIssueDetails(${elem.id})" class="bg-white shadow rounded-md min-h-64 border-t-3 border-[#A855F7]">
                    <div class="p-4">
                    <div class="flex justify-between items-center mb-3">
                       <img src="./assets/Closed- Status .png" alt="">
                        <p class="px-[25px] py-1.5 ${elem.priority === "high" ? 'bg-red-300 text-[#F8FAFC]' :'bg-[#FFF8DB] text-[#D97706]'} rounded-full font-medium text-[12px] ">${elem.priority} </p>
                    </div>

                    <div>
                        <h3 class="font-semibold text-[14px] text-[#1F2937]">${elem.title}</h3>
                        <p class="text-[12px] text-[#64748B]">${elem.description}</p>
                        <div class="flex justify-between mt-3">
                            ${creatElements(elem.labels)}
                        </div>
                    </div>

                </div>

                <div class="p-4 border-t border-gray-200 md:flex justify-between space-y-1">
                   <div class="space-y-1">
                    <p class="text-[#64748B] text-[12px]">#${elem.id} by ${elem.author}</p>
                    <p class="text-[#64748B] text-[12px]">${elem.createdAt}</p>
                   </div>

                   <div class="space-y-1 md:text-right">
                    <p class="text-[#64748B] text-[12px]">${elem.assignee ? elem.assignee :'assignee not found'}</p>
                    <p class="text-[#64748B] text-[12px]">${elem.updatedAt}</p>
                   </div>
                </div>
                </div>
        
        `
        closedIssueContainer.appendChild(closedCardDiv);
    })
    manageSpinner(false);
    
}

loadAllData();



document.getElementById('search-btn').addEventListener('click' , () =>{
     manageSpinner(true);
    showOnly('search-btn');
    activeOnly('search-section');
    const input = document.getElementById('input-search');
    const inputValue = input.value.trim().toLowerCase();
    console.log(inputValue);

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`)
    .then((res) => res.json())
    .then((data) => displaySearchIssue(data.data))
    
})


const displaySearchIssue = (search) =>{
    console.log(search);

    const searchCount = document.getElementById('search-issue-count');
    const searchContainer = document.getElementById('search-issue-container');
    searchCount.innerHTML = "";
    searchContainer.innerHTML = "";

    searchCount.innerHTML = `
    
        <div class="flex items-center gap-2">
                    <div class="bg-[#ECE4FF] rounded-full p-2">
                        <img src="./assets/Aperture.png" alt="" class="h-[27px] w-[27px] ">
                    </div>
                    <div>
                        <h2 class="font-semibold text-[20px] text-[#1F2937]">${search.length} Issues</h2>
                        <p class="text-[#64748B]">Track and manage your project issues</p>
                    </div>
                </div>

                <!-- top right div -->
                 <div class="flex gap-3">
                    <div class="flex items-center gap-1">
                        <img src="./assets/Ellipse 2.png" alt="">
                        <p class="font-medium text-[#1F2937]">Open</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <img src="./assets/Ellipse 2 (1).png" alt="">
                        <p class="font-medium text-[#1F2937]">Closed</p>
                    </div>
                 </div>
    
    `

    search.forEach((el) => {
        const searchDiv = document.createElement('div');
        searchDiv.innerHTML = `
        
             <div onclick="loadIssueDetails(${el.id})" class="bg-white shadow rounded-md min-h-64 ${el.status === "open" ? 'border-t-3 border-green-400' : 'border-t-3 border-[#A855F7]'}">
                    <div class="p-4">
                    <div class="flex justify-between items-center mb-3">
                        ${el.status === "open" ? '<img src="./assets/Open-Status.png" alt="">' : '<img src="./assets/Closed- Status .png" alt="">'}
                        <p class="px-[25px] py-1.5 ${el.priority === "high" ? 'bg-red-300 text-[#F8FAFC]' :'bg-[#FFF8DB] text-[#D97706]'} rounded-full font-medium text-[12px] ">${el.priority} </p>
                    </div>

                    <div>
                        <h3 class="font-semibold text-[14px] text-[#1F2937]">${el.title}</h3>
                        <p class="text-[12px] text-[#64748B]">${el.description}</p>
                        <div class="flex justify-between mt-3">
                            ${creatElements(el.labels)}
                        </div>
                    </div>

                </div>

                <div class="p-4 border-t border-gray-200 md:flex justify-between space-y-1">
                   <div class="space-y-1 ">
                    <p class="text-[#64748B] text-[12px]">#${el.id} by ${el.author}</p>
                    <p class="text-[#64748B] text-[12px]">${el.createdAt}</p>
                   </div>

                   <div class="space-y-1 md:text-right">
                    <p class="text-[#64748B] text-[12px]">${el.assignee ? el.assignee :'assignee not found'}</p>
                    <p class="text-[#64748B] text-[12px]">${el.updatedAt}</p>
                   </div>
                </div>
                </div>
        
        `
        searchContainer.appendChild(searchDiv);
    })

    manageSpinner(false);
}