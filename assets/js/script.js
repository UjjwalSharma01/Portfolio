$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });


    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Ujjwal Sharma | Portfolio ";
        }
        else {
            document.title = "Ujjwal Sharma ";
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["block-chain developer", "web developer" , "problem solver"],
    loop: true,
    typeSpeed: 25,
    backSpeed: 25,
    backDelay: 600,
});
// <!-- typed js effect ends -->

// async function fetchData() - for fetching data from json file 

async function fetchData(type = "skills") {
    let response
    if(type==="skills"){
        response = await fetch("./skills.json")
    }else if(type === "projects"){
        response = await fetch("./projects/projects.json")
    }else if(type === "certifications"){
        response = await fetch("./Certifications/certifications.json")
    }
    const data = await response.json();
    return data;
}

// function showSkills(skills) - for showing skills in skills section
function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}



function showProjects(projects) {
    let projectsContainer = document.querySelector("#projects .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // function ends here

    // function to show certificates in education section

    // acessing data from json function starts
    // Corrected path to certifications.json
    fetch('Certifications/certifications.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then(certifications => showCertifications(certifications))
      .catch(error => console.error('Error:', error));

function showCertifications(certifications) {
    let certificationsContainer = document.querySelector("#certifications .box-container");
    let certificationHTML = "";
    certifications.forEach(certification => {
        certificationHTML += `
        <div class="box">
            <img draggable="false" src="Certifications/images/${certification.image}.png" alt="certification" />
            <div class="content">
                <div class="tag">
                    <h3>${certification.name}</h3>
                </div>
                <div class="desc">
                    <p>${certification.desc}</p>
                    <div class="btns">
                        <a href="${certification.link}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                    </div>
                </div>
            </div>
        </div>`
    });
    certificationsContainer.innerHTML = certificationHTML;
    

      // certification function ends here


      // <!-- tilt js effect starts -->
      VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
      });
      // <!-- tilt js effect ends -->

      /* ===== SCROLL REVEAL ANIMATION ===== */
      const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
      });
      // Add ScrollReveal animations as needed
    }

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });
}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// function to block developer options to prevent code stealing
// document.onkeydown = function (e) {
//     if (e.keyCode == 123) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
//         return false;
//     }
// }



/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: false // might make it true, im confused right now let's see
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 150 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
/* SCROLL CERTIFICATIONS */





// for mail
//for mail
function sendMail() {
    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    var topic = document.getElementById("topic").value;
    var message = document.getElementById("message").value;
  
    // Simple validation for the email field
    var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      document.getElementById("emailError").innerText = "Please enter a valid email address.";
      document.getElementById("emailError").style.display = "block";
    } else {
      document.getElementById("emailError").style.display = "none";
    }
  
    // Check if other fields are empty
    if (name == "") {
      document.getElementById("nameError").innerText = "Please enter your name.";
      document.getElementById("nameError").style.display = "block";
    } else {
      document.getElementById("nameError").style.display = "none";
    }
  
    if (topic == "") {
      document.getElementById("topicError").innerText = "Please enter a subject.";
      document.getElementById("topicError").style.display = "block";
    } else {
      document.getElementById("topicError").style.display = "none";
    }
  
    if (message == "") {
      document.getElementById("messageError").innerText = "Please enter a message.";
      document.getElementById("messageError").style.display = "block";
    } else {
      document.getElementById("messageError").style.display = "none";
    }
  
    // If all fields are valid, send the email
    if (email.match(emailPattern) && name != "" && topic != "" && message != "") {
      // Your existing sendMail code...
      if (!(document.getElementById("topic").value == "")) {
        if (!(document.getElementById("name").value == "")) {
          if (!(document.getElementById("message").value == "")) {
            if (!(document.getElementById("email").value == "")) {
              emailjs.init("RpY5hfDUPrW7ca_lN");
              var mails = {
                subject: document.getElementById("topic").value,
                from_name: document.getElementById("name").value,
                message: document.getElementById("message").value,
                from_email: document.getElementById("email").value,
              };
    
              emailjs.send("service_z576dhq", "template_jn01anr", mails)
                .then(function (re) {
                  document.getElementById('alert').style.display = 'block';
                  confetti();
                  document.getElementById("alert").style.visibility = "visible";
                  document.getElementById("topic").value = "";
                  document.getElementById("name").value = "";
                  document.getElementById("message").value = "";
                  document.getElementById("email").value = "";
                });
            }
          }
        }
      }
    }
}

function closeAlert() {
    // used to check if the function is called or not because it is not working
    // console.log('closeAlert function called'); 
    document.getElementById('alert').style.display = 'none';
  }

 