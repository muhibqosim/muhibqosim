window.onload = function() {
    const apiKey = 'AIzaSyCzNIB8G-7zAiJHvjUVcY4rZH-xHROaPq8';
    const blogId = '6304364806382512926';
    const baseUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`;
    
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => {
        if (!data.items) {
          console.error('No items found in data');
          return;
        }
        
        const sections = {
          'Legal': document.getElementById('populate-legal'),
          'Case': document.getElementById('populate-case'),
          'Archive': document.getElementById('populate-archive'),
        };
        
        Object.keys(sections).forEach(label => {
          const filtered = label === 'All' ? data.items : data.items.filter(item => item.labels?.some(l => l.toLowerCase() === label.toLowerCase()));
          displayPosts(filtered.slice(0, 4), sections[label]);
          if (label !== 'All') {
            const viewMore = document.createElement('div');
            viewMore.innerHTML = `
                  <div class="text-center mt-4">
                    <a href="${label.toLowerCase()}.html" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                      View More ${label} Posts »
                    </a>
                  </div>
                `;
            sections[label].appendChild(viewMore);
          }
        });
        
      })
      .catch(error => console.error('Error fetching data:', error));
  };
  
  function displayPosts(posts, container) {
    container.innerHTML = '';
    posts.forEach(item => {
      const src = item.content.match(/<img[^>]*src="([^"]*)"/)?.[1] || 'https://via.placeholder.com/600x400';
      container.innerHTML += createCard(item, src);
    });
  }
  
  function createCard(item, src) {
    // Combined author extraction that handles multiple formats
    let authors = 'Unknown Author';
    try {
      // Try both "ABOUT THE AUTHOR" and "Author:" formats
      const aboutAuthorMatch = item.content.match(
        /(?:ABOUT THE AUTHOR(S?)|Author:)\s*([^.]+?)(?:\s*(?:can be reached|is a member|via|\.|<\/p>|$))/i
      );
      
      if (aboutAuthorMatch) {
        const aboutAuthorText = aboutAuthorMatch[2].trim();
        
        const namePattern = /(?:[A-Z][a-z]+\.?\s*)?(?:[A-Z][a-zA-Z'-]+(?:\s+[A-Z][a-zA-Z'-]+)*)(?:\s*(?:,|\band\b|&)\s*(?:[A-Z][a-z]+\.?\s*)?(?:[A-Z][a-zA-Z'-]+(?:\s+[A-Z][a-zA-Z'-]+)*))*/g;
        
        const nameMatches = aboutAuthorText.match(namePattern);
        
        if (nameMatches && nameMatches[0]) {
          authors = nameMatches[0]
            .replace(/\s+/g, ' ') // Collapse multiple spaces
            .replace(/\s*,\s*/g, ', ') // Normalize commas
            .replace(/\s+\band\b\s+/g, ' and ') // Normalize "and"
            .replace(/\s*&\s*/g, ' & ') // Normalize ampersand
            .replace(/\b([A-Z])\.\s*/g, '$1. ') // Normalize initials
            .trim();
        }
      }
    } catch (e) {
      console.error('Error extracting author:', e);
      authors = 'Unknown Author'; // Fallback value
    }
    
    return `

        <article data-aos="fade-down" class="bg-white shadow-lg w-full rounded-lg mb-3">
            <div class="md:w-full md:h-50 overflow-hidden rounded-t">
              <img src="${src}" alt="${item.title}" class="w-full h-48 md:h-70 object-center ">
            </div>
            <!--title, abstract & read more-->
            <div class="px-5 ">
              <p class="text-sm pt-5 md:text-lg font-semibold text-justify text-gray-600"> ${formatDate(item.published.split('T')[0])} </p>
              <h3 class="text-base md:text-xl py-8 font-bold tracking-tight uppercase">${item.title}</h3>
              <p class="text-sm mb-8 md:text-lg tracking-tight text-justify ">  ${item.content.replace(/<[^>]+>/g, '').split(' ').slice(0, 30).join(' ')}</p>
              <p class="text-sm md:text-lg text-justify mb-5 text-blue-900 font-semibold "><a href="https://muhibqosim.com.ng/single.html?id=${item.id}" target="_blank" class=""> READ MORE » </a> </p>
            </div>
          </article>
      `;
  }
  
  
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }