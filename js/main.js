document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.remove('no-js');
  document.body.classList.add('js');

  if ( window.location.hash ) {
    toggle(window.location.hash);
  } else {
    toggle('#home');
  }
}, false);

document.addEventListener('click', function(event) {
  const clicked = event.target.closest('a');
  if ( !clicked ) return;
  checklink(clicked, event);
})

function checklink(el, event) {
  let hashtag = el.getAttribute("href");
  if ( hashtag.startsWith("#") ) {
    event.preventDefault();
    toggle(hashtag);
  }  
}

function toggle(hashtag) {
  let target = document.querySelector(hashtag);
  if (!target) {
    console.warn("Missing section:", hashtag);
    hashtag = '#home';
    target = document.querySelector(hashtag);
  }

  if (!target) return;

  const sections = document.querySelectorAll('section');
  const navlinks = document.querySelectorAll('nav a');

  sections.forEach((element) => {
    element.classList.remove('active');
  });
  target.classList.add('active');

  navlinks.forEach((element) => {
    element.classList.remove('active');
  });
  const activeLink = document.querySelector(`nav a[href="${hashtag}"]`);
  if (activeLink) activeLink.classList.add('active');

  history.pushState({}, '', hashtag);
  window.scrollTo(0,0);
}