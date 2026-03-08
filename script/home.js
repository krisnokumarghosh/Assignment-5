
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

    allSection.classList.add('hidden');
    openSection.classList.add('hidden');
    closedSection.classList.add('hidden');

    const only = document.getElementById(id);
    only.classList.remove('hidden');
}


const loadAllData = () =>{
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllData(data.data))
}


const loadOpenData = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
    .then((resp) => resp.json())
    .then((details) => displayOpenData(details.data.filter(el => el.status === "open")))
}

const loadClosedData = () =>{
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
        
        
                
                <div class="bg-white shadow rounded-md h-64 ${issue.status === "open" ? 'border-t-3 border-green-400' : 'border-t-3 border-[#A855F7]'}">
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

                <div class="p-4 border-t border-gray-200 space-y-1">
                    <p class="text-[#64748B] text-[12px]">#${issue.id} by ${issue.author}</p>
                    <p class="text-[#64748B] text-[12px]">${issue.createdAt}</p>
                </div>
                </div>


             
        
        `
        allIssueCards.appendChild(issueCardDiv)
    })
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
       
        <div class="bg-white shadow rounded-md h-64 border-t-3 border-green-400">
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

                <div class="p-4 border-t border-gray-200 space-y-1">
                    <p class="text-[#64748B] text-[12px]">#${elem.id} by ${elem.author}</p>
                    <p class="text-[#64748B] text-[12px]">${elem.createdAt}</p>
                </div>
                </div>
       
       `
       openissueContainer.appendChild(openCardDiv)
    })
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
        
            <div class="bg-white shadow rounded-md h-64 border-t-3 border-[#A855F7]">
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

                <div class="p-4 border-t border-gray-200 space-y-1">
                    <p class="text-[#64748B] text-[12px]">#${elem.id} by ${elem.author}</p>
                    <p class="text-[#64748B] text-[12px]">${elem.createdAt}</p>
                </div>
                </div>
        
        `
        closedIssueContainer.appendChild(closedCardDiv);
    })
    
}

loadAllData();