let jobs = [];

(async function () {
    try {
        let res = await fetch("https://practice-project-c2cca-default-rtdb.firebaseio.com/jobs.json");
        let response = await res.json();

        if (!response) {
            console.error("No data received from Firebase.");
            return;
        }

        jobs = Object.values(response);

        displayJobs(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
    }
})();

function displayJobs(arr) {
    let container = document.getElementById("job-cards");
    if (!container) {
        console.error("Element with ID 'job-cards' not found!");
        return;
    }

    container.innerHTML = "";

    if (arr.length === 0) {
        container.innerHTML = `<p style="text-align:center; font-size:16px; color:red;">No jobs found</p>`;
        return;
    }

    arr.forEach((job) => {
        const { company_name, location, logo, job_title, description, posted_time, category } = job || {}; 

        const box = document.createElement("div");
        box.setAttribute("class", "Job-Div");

        box.innerHTML = `
           <div class="company-cards">
                  <div class="company-name">
                       <div class="img">
                        <img src="${logo}" alt="Company Logo"/>
                       </div>
                       <div>
                        <p style="font-size:15px">${company_name}</p>
                        <span style="font-size:10px; color:#696969">${location}</span>
                       </div>
                  </div>
                   <div>
                    <h5>${job_title}</h5>
                    <p  style="font-size:13px; color:#696969">${description}</p>
                    <span style="font-size:10px; color:#696969;">${posted_time}</span>
                </div>
            </div>
        `;

        container.append(box);
    });
}


function filterJobs(category) {
    const filteredJobs = jobs.filter(job => {
        let jobCategory = job.job_title || ""; 
        jobCategory = jobCategory.toLowerCase().trim(); 

        console.log(`Comparing: "${jobCategory}" === "${category.toLowerCase().trim()}"`);

        return jobCategory === category.toLowerCase().trim();
    });

    console.log("Filtered Jobs:", filteredJobs);
    displayJobs(filteredJobs);
}


document.addEventListener("DOMContentLoaded", function () {
    let categoryList = document.getElementById("category-list");

    if (categoryList) {
        categoryList.addEventListener("click", function (event) {
            let target = event.target.closest("li a"); 

            if (target) {
                let selectedCategory = target.textContent.trim();

                document.querySelectorAll("#category-list li").forEach(li => li.classList.remove("active"));

                target.parentElement.classList.add("active");

                if (selectedCategory === "All") {
                    displayJobs(jobs); 
                } else {
                    filterJobs(selectedCategory);
                }
            }
        });
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("userModal");
    const modalOverlay = document.getElementById("modalOverlay");
    const userAvatar = document.querySelector(".user-avatar");
    const closeModal = document.getElementById("closeModal");
    const logoutBtn = document.getElementById("logoutBtn"); // Select the button

    userAvatar.addEventListener("click", function () {
        modal.style.display = "block";
        modalOverlay.style.display = "block";
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
        modalOverlay.style.display = "none";
    });

    modalOverlay.addEventListener("click", function () {
        modal.style.display = "none";
        modalOverlay.style.display = "none";
    });

    if (logoutBtn) { 
        logoutBtn.addEventListener('click', () => {
            alert('Logged out successfully!');
            window.location.href = '../index.html'; 
        });
    } else {
        console.error("Logout button not found!");
    }
});


function handleFileUpload(event) {
const file = event.target.files[0]; 
if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const imageURL = e.target.result;

        const container = document.getElementById('container-one');
        container.style.backgroundImage = `url(${imageURL})`;
        container.style.backgroundSize = '1450px 310px'; 
        container.style.backgroundPosition = 'center';
        container.style.backgroundRepeat = 'no-repeat';

        localStorage.setItem('bannerImage', imageURL);

        document.querySelector('.container-one-div1').style.display = 'none';
    };
    reader.readAsDataURL(file);
}
}




