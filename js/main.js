
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
  window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
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


/*Share icon */
  // Function to open the share dialog
  function openShareDialog() {
    var shareUrl = "https://example.com/your-blog-post-url"; // Replace with your actual blog post URL
    
    // Open a new window or tab with the share URL
    window.open(shareUrl, "_blank");
  }

  // Add a Font Awesome share icon to the share-icon div
  var shareIcon = document.getElementById("share-icon");
  shareIcon.innerHTML = '<i class="fas fa-share-alt" onclick="openShareDialog()"></i>';

