// Toggle dropdown (works for both mobile and desktop)
function toggleDropdown() {
  const dropdown = document.querySelectorAll(".dropdown-content");
  dropdown.forEach(el => el.classList.toggle("hidden"));
}

//Chaning of nav bar bacjground color
window.addEventListener("scroll", function() {
  
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll(".nav-link");
  const logo = document.querySelector(".nav-logo");
  const bars = document.querySelectorAll(".bar1, .bar2, .bar3");
  
  if (window.scrollY > 50) {
    
    navbar.classList.remove("Navy-blue");
    navbar.classList.add("bg-white/90", "backdrop-blur-md", "shadow-lg");
    
    links.forEach(link => {
      link.classList.remove("text-white");
      link.classList.add("text-blue-900");
    });
    
    if (logo) {
      logo.classList.remove("text-white");
      logo.classList.add("text-blue-900");
      logo.classList.add("font-semibold");
    }
    
    // CHANGE HAMBURGER COLOR
    bars.forEach(bar => {
      bar.style.backgroundColor = "#1e3a8a";
    });
    
  } else {
    
    navbar.classList.remove("bg-white/90", "backdrop-blur-md", "shadow-lg");
    navbar.classList.add("Navy-blue");
    
    links.forEach(link => {
      link.classList.remove("text-blue-900");
      link.classList.add("text-white");
    });
    
    if (logo) {
      logo.classList.remove("text-blue-900");
      logo.classList.add("text-white");
    }
    
    // RESTORE HAMBURGER COLOR
    bars.forEach(bar => {
      bar.style.backgroundColor = "white";
    });
    
  }
  
});




//Footer
document.addEventListener('DOMContentLoaded', function() {
  var currentYear = new Date().getFullYear();
  document.getElementById('copyright-year').textContent = currentYear;
});

//about the author
document.addEventListener('DOMContentLoaded', function() {
  // The sentence you want to insert
  var sentence = "Qosim is a pupil of law at the Faculty of Law, Bayero University, Kano, with proficiency in Web Design, Legal/Content Writing, Legal Research, Case Analysis and Proofreading/Editing. He has a keen interest in Legal Drafting and Research and various aspect of law including Corporate practise, Litigation, Intellectual Property, Tech Law, Data Privacy, Islamic Finance and ADR.";

  // Find the element where the sentence will be inserted
  var container = document.getElementById('about-author');

  // Insert the sentence into the container
  container.textContent = sentence;
});

function myFunction(x) {
  x.classList.toggle("change");
}

function toggleMenu() {
  var menu = document.getElementById("mobile-menu");
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
  } else {
    menu.classList.add("hidden");
  }
}



/*   */

/* type js for who i am */
var typed = new Typed('#typed', {
  stringsElement: '#typed-strings',
  loop: true,
  backDelay: 900,
  backSpeed: 30,
  smartBackspace: true,
  typeSpeed: 40,
  startDelay: 2000,
});
/*email me anchor */
// modify this form HTML and place wherever you want your form //
//Read the Formbutton docs at formspree.io/formbutton/docs. See more examples at codepen.io/formspree //
/* paste this line in verbatim */
window.formbutton = window.formbutton || function() {
  (formbutton.q = formbutton.q || []).push(arguments) };
/* customize formbutton below*/
formbutton("create", {
  action: "https://formspree.io/f/mqkvzbyz",
  title: "How can we help?",
  fields: [
    {
      type: "email",
      label: "Email:",
      name: "email",
      required: true,
      placeholder: "your@email.com"
      },
    {
      type: "textarea",
      label: "Message:",
      name: "message",
      placeholder: "What's on your mind?",
      },
    { type: "submit" }
    ],
  styles: {
    title: {
      backgroundColor: "gray"
    },
    button: {
      backgroundColor: "gray"
    }
  }
});


/*WhatsApp me anchor */
document.getElementById("messageForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var message = document.getElementById("messageInput").value;
  var encodedMessage = encodeURIComponent(message);
  var whatsappLink = "https://wa.me/2349037074761/?text=" + encodedMessage;

  // Replace 'whatsapp-number' with your WhatsApp phone number, including the country code.
  // For example, if your WhatsApp number is +1234567890, the link would be: https://wa.me/1234567890/?text=...

  window.location.href = whatsappLink;
});



//slider Islamic quotes
let slideIndex = 1;

function showSlide(n) {
  const slides = document.querySelectorAll('.slide-a');
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slides[slideIndex - 1].style.display = 'block';
}

function changeSlide(n) {
  showSlide((slideIndex += n));
}

function autoAdvance() {
  changeSlide(1);
  setTimeout(autoAdvance, 3000); // 10 seconds
}

showSlide(slideIndex);
autoAdvance();
