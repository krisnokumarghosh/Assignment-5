
const creatElements = (arr) =>{
    const elements = arr.map((elem , index) => {
        if(arr.length === 1 && elem === "enhancement"){
            return`<p class="px-[15px] py-1.5 bg-green-200 rounded-full font-medium text-[12px] text-green-500">${elem}</p>`
        }
        else if(arr.length === 1 && elem === "bug"){
            return `<p class="px-[15px] py-1.5 bg-red-200 rounded-full font-medium text-[12px] text-[#F8FAFC]">${elem}</p>`
        }
        else if(arr.length === 1){
            return `<p class="px-[15px] py-1.5 bg-[#FFF8DB] rounded-full font-medium text-[12px] text-[#D97706]">${elem}</p>`
        }
        else if(arr.length === 2){
            if(index === 0){
                return` <p class="px-[15px] py-1.5 bg-red-200 rounded-full font-medium text-[12px] text-[#F8FAFC]">${elem}</p>`
            }
            else{
                return`
            <p class="px-[15px] py-1.5 bg-[#FFF8DB] rounded-full font-medium text-[12px] text-[#D97706]">${elem}</p>`
            }
        }
    })

    return(elements.join(" "))
    
}


const loadAllData = () =>{
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllData(data.data))
}

const displayAllData = (issues) =>{
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
        console.log(issue)

        issueCardDiv.innerHTML = `
        
        
                
                <div class="bg-white shadow rounded-md h-64 ${issue.status === "open" ? 'border-t-3 border-green-400' : 'border-t-3 border-[#A855F7]'}">
                    <div class="p-4">
                    <div class="flex justify-between items-center mb-3">
                        ${issue.status === "open" ? '<img src="./assets/Open-Status.png" alt="">' : '<img src="./assets/Closed- Status .png" alt="">'}
                        <p class="px-[25px] py-1.5 ${issue.priority === "high" ? 'bg-red-200 text-[#F8FAFC]' :'bg-[#FFF8DB] text-[#D97706]'} rounded-full font-medium text-[12px] ">${issue.priority} </p>
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

loadAllData();