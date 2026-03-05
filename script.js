


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


document.getElementById('hobby-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addBenefit();
});


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


function escapeHTML(str) {
    return str
        .replace(/&/g,  '&amp;')
        .replace(/</g,  '&lt;')
        .replace(/>/g,  '&gt;')
        .replace(/"/g,  '&quot;');
}


