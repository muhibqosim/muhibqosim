window.onload = function () {
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

      // ===============================
      // 📌 PUBLICATION PAGE SECTIONS
      // ===============================
      const sections = {
        'Legal': document.getElementById('populate-legal'),
        'Case': document.getElementById('populate-case'),
        'Archive': document.getElementById('populate-archive'),
      };

      Object.keys(sections).forEach(label => {
        const container = sections[label];

        // ✅ Skip if section doesn't exist on this page
        if (!container) return;

        const filtered = data.items.filter(item =>
          item.labels?.some(l => l.toLowerCase() === label.toLowerCase())
        );

        displayPosts(filtered.slice(0, 4), container);

        // View more button
        const viewMore = document.createElement('div');
        viewMore.innerHTML = `
          <div class="text-center mt-4">
            <a href="${label.toLowerCase()}.html"
               class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              View More ${label} Posts »
            </a>
          </div>
        `;
        container.appendChild(viewMore);
      });

      // ===============================
      // 🏠 HOMEPAGE (LATEST POSTS)
      // ===============================
      const homeContainer = document.getElementById('populate-Pub');

      if (homeContainer) {
        const recentPosts = data.items.slice(0, 4); // latest 4 posts
        displayPosts(recentPosts, homeContainer);
      }

    })
    .catch(error => console.error('Error fetching data:', error));
};


// ===============================
// 📦 DISPLAY POSTS FUNCTION
// ===============================
function displayPosts(posts, container) {
  if (!container) return; // ✅ Prevent crash

  container.innerHTML = '';

  posts.forEach(item => {
    const src = item.content.match(/<img[^>]*src="([^"]*)"/)?.[1] 
      || 'https://via.placeholder.com/600x400';

    container.innerHTML += createCard(item, src);
  });
}


// ===============================
// 🧾 CREATE CARD
// ===============================
function createCard(item, src) {

  let authors = 'Unknown Author';

  try {
    const aboutAuthorMatch = item.content.match(
      /(?:ABOUT THE AUTHOR(S?)|Author:)\s*([^.]+?)(?:\s*(?:can be reached|is a member|via|\.|<\/p>|$))/i
    );

    if (aboutAuthorMatch) {
      const aboutAuthorText = aboutAuthorMatch[2].trim();

      const namePattern = /(?:[A-Z][a-z]+\.?\s*)?(?:[A-Z][a-zA-Z'-]+(?:\s+[A-Z][a-zA-Z'-]+)*)(?:\s*(?:,|\band\b|&)\s*(?:[A-Z][a-z]+\.?\s*)?(?:[A-Z][a-zA-Z'-]+(?:\s+[A-Z][a-zA-Z'-]+)*))*/g;

      const nameMatches = aboutAuthorText.match(namePattern);

      if (nameMatches && nameMatches[0]) {
        authors = nameMatches[0]
          .replace(/\s+/g, ' ')
          .replace(/\s*,\s*/g, ', ')
          .replace(/\s+\band\b\s+/g, ' and ')
          .replace(/\s*&\s*/g, ' & ')
          .replace(/\b([A-Z])\.\s*/g, '$1. ')
          .trim();
      }
    }
  } catch (e) {
    console.error('Error extracting author:', e);
  }

  return `
    <article data-aos="fade-down" class="bg-white shadow-lg w-full rounded-lg mb-3">
      <div class="md:w-full md:h-50 overflow-hidden rounded-t">
        <img src="${src}" alt="${item.title}" class="w-full h-48 md:h-70 object-center">
      </div>

      <div class="px-5">
        <p class="text-sm pt-5 md:text-lg font-semibold text-justify text-gray-600">
          ${formatDate(item.published.split('T')[0])}
        </p>

        <h3 class="text-base md:text-xl py-8 font-bold tracking-tight uppercase">
          ${item.title}
        </h3>

        <p class="text-sm mb-8 md:text-lg tracking-tight text-justify">
          ${item.content.replace(/<[^>]+>/g, '').split(' ').slice(0, 30).join(' ')}...
        </p>

        <p class="text-sm md:text-lg text-justify mb-5 text-blue-900 font-semibold">
          <a href="single.html?id=${item.id}" target="_blank">READ MORE »</a>
        </p>
      </div>
    </article>
  `;
}


// ===============================
// 📅 FORMAT DATE
// ===============================
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}