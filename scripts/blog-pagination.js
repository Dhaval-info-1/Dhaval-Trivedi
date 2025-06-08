// Pagination functionality
const POSTS_PER_PAGE = 9;

function initializePagination(posts) {
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const paginationContainer = document.querySelector('.pagination');
    let currentPage = 1;

    // Clear existing pagination
    paginationContainer.innerHTML = '';

    // Create pagination controls
    if (totalPages > 1) {
        const prevButton = createPaginationButton('Previous', () => {
            if (currentPage > 1) {
                currentPage--;
                updatePage(posts, currentPage);
                updatePaginationButtons();
            }
        });

        const nextButton = createPaginationButton('Next', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updatePage(posts, currentPage);
                updatePaginationButtons();
            }
        });

        paginationContainer.appendChild(prevButton);
        
        // Add page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = createPaginationButton(i.toString(), () => {
                currentPage = i;
                updatePage(posts, currentPage);
                updatePaginationButtons();
            });
            pageButton.classList.add('page-number');
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            paginationContainer.appendChild(pageButton);
        }

        paginationContainer.appendChild(nextButton);
    }

    // Show first page
    updatePage(posts, currentPage);
}

function updatePage(posts, page) {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    const pageItems = posts.slice(start, end);
    renderPosts(pageItems);
}

function createPaginationButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('pagination-button');
    button.addEventListener('click', onClick);
    return button;
}

function updatePaginationButtons() {
    document.querySelectorAll('.pagination-button').forEach(button => {
        if (button.classList.contains('active')) {
            button.classList.remove('active');
        }
        if (button.textContent === currentPage.toString()) {
            button.classList.add('active');
        }
    });
}
