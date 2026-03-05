/* =============================================
   1. HOBBY INTERACTION ENHANCEMENTS
   ============================================= */

/** Add a new benefit to the ordered list */
function addBenefit() {
    var input = document.getElementById('hobby-input');
    var text  = input.value.trim();

    if (!text) {
        input.style.borderColor = 'var(--accent-secondary)';
        input.focus();
        setTimeout(function () { input.style.borderColor = ''; }, 800);
        return;
    }

    var list = document.getElementById('benefits-list');
    var li   = document.createElement('li');
    li.classList.add('benefit-new');
    li.innerHTML =
        '<span class="benefit-text">' + escapeHTML(text) + '</span>' +
        '<button class="btn-delete" onclick="deleteBenefit(this)">Delete</button>';
    list.appendChild(li);

    updateBenefitCount();
    input.value = '';
    input.focus();
}

/** Delete the list item that contains the clicked button */
function deleteBenefit(btn) {
    var li = btn.closest('li');
    li.style.transition = 'opacity 0.25s, transform 0.25s';
    li.style.opacity    = '0';
    li.style.transform  = 'translateX(20px)';
    setTimeout(function () {
        li.remove();
        updateBenefitCount();
    }, 250);
}

/** Allow Enter key to add a benefit */
document.getElementById('hobby-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addBenefit();
});

/** Live count badge beside the benefits heading */
function updateBenefitCount() {
    var list  = document.getElementById('benefits-list');
    var count = list.querySelectorAll('li').length;
    var badge = document.getElementById('benefit-count-badge');

    if (!badge) {
        var heading = document.querySelector('.hobby-benefits h4');
        badge = document.createElement('span');
        badge.id = 'benefit-count-badge';
        badge.style.cssText =
            'display:inline-block;margin-left:0.6rem;' +
            'background:var(--accent-gradient);' +
            'color:var(--bg-primary);font-size:0.72rem;font-weight:700;' +
            'padding:0.15rem 0.55rem;border-radius:999px;' +
            'vertical-align:middle;transition:transform 0.2s;';
        heading.appendChild(badge);
    }

    badge.textContent     = count;
    badge.style.transform = 'scale(1.35)';
    setTimeout(function () { badge.style.transform = 'scale(1)'; }, 200);
}

/** Prevent XSS when inserting user text */
function escapeHTML(str) {
    return str
        .replace(/&/g,  '&amp;')
        .replace(/</g,  '&lt;')
        .replace(/>/g,  '&gt;')
        .replace(/"/g,  '&quot;');
}

// Initialise count badge on page load
updateBenefitCount();


/* =============================================
   2. CONTACT FORM – TOAST ON SUBMISSION
   ============================================= */

function handleFormSubmit(event) {
    event.preventDefault();
    var name = document.getElementById('name').value.trim();
    showToast('✅ Thanks, ' + (name || 'there') + '! Message received — I\'ll reply soon.');
    setTimeout(function () { event.target.reset(); }, 600);
}

function showToast(message) {
    var toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 4500);
}


/* =============================================
   3. DYNAMIC FOOTER – LIVE DATE & TIME
   ============================================= */

function updateFooterTime() {
    var el = document.getElementById('footer-datetime');
    if (!el) return;

    var now    = new Date();
    var days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];

    var day  = days[now.getDay()];
    var dd   = String(now.getDate()).padStart(2, '0');
    var mon  = months[now.getMonth()];
    var yyyy = now.getFullYear();
    var HH   = String(now.getHours()).padStart(2, '0');
    var mm   = String(now.getMinutes()).padStart(2, '0');
    var ss   = String(now.getSeconds()).padStart(2, '0');

    el.textContent = day + ', ' + dd + ' ' + mon + ' ' + yyyy + ', ' + HH + ':' + mm + ':' + ss;
}

updateFooterTime();
setInterval(updateFooterTime, 1000);


/* =============================================
   CONNECTIVITY – Active nav highlight on scroll
   ============================================= */

var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav-links a');

var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            navLinks.forEach(function (a) {
                a.style.color = (a.getAttribute('href') === '#' + entry.target.id)
                    ? 'var(--accent-primary)'
                    : '';
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(function (s) { observer.observe(s); });
