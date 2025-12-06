document.addEventListener('DOMContentLoaded', () => {
  // NAVIGATION HIGHLIGHT
  const navLinks = document.querySelectorAll('nav a, .nav-link');
  navLinks.forEach(link => {
    if(link.href === window.location.href){
      link.style.fontWeight = 'bold';
      link.style.color = '#2563eb';
    }
  });

  // COLLAPSIBLE SECTIONS
  const collapsibleHeaders = document.querySelectorAll('.section-card h2');
  collapsibleHeaders.forEach(header => {
    header.style.cursor = 'pointer';
    const content = header.nextElementSibling;
    header.addEventListener('click', () => {
      if(content.style.display === 'none'){
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });
  });

  // STAT COUNTERS
  const counters = document.querySelectorAll('.big');
  counters.forEach(counter => {
    const target = parseInt(counter.innerText.replace(/,/g,'')) || 0;
    counter.innerText = '0';
    let count = 0;
    const increment = Math.ceil(target / 100);
    const update = () => {
      count += increment;
      if(count >= target){
        counter.innerText = target.toLocaleString();
      } else {
        counter.innerText = count.toLocaleString();
        requestAnimationFrame(update);
      }
    };
    update();
  });

  // OPPORTUNITIES PAGE FILTERING
  if(document.getElementById('filterForm')){
    const samplePrograms = [
      {title:'Intro to Scratch', age:'9-11', interest:'coding', desc:'Beginner block-based coding course.'},
      {title:'Home Music Club', age:'12-14', interest:'music', desc:'Weekly guided practice sessions.'},
      {title:'Art Explorers', age:'6-8', interest:'arts', desc:'Simple low-cost craft projects.'},
      {title:'Junior Robotics', age:'12-14', interest:'stem', desc:'Build and program simple robots.'},
      {title:'FitKids at Home', age:'9-11', interest:'sports', desc:'Bodyweight games and movement sessions.'}
    ];
    const resultsContainer = document.getElementById('results');

    window.showResults = function(){
      const age = document.getElementById('age').value;
      const interest = document.getElementById('interest').value;
      const results = samplePrograms.filter(p => p.age===age && p.interest===interest);
      resultsContainer.innerHTML = '';
      if(results.length === 0){
        resultsContainer.innerHTML = '<div style="grid-column:1/-1;padding:12px;background:#fff;border-radius:8px">No matches found. Try a different filter or <a href="create-opportunity.html">create an opportunity</a>.</div>';
        return;
      }
      results.forEach(r => {
        const el = document.createElement('div');
        el.className='card';
        el.innerHTML = `<h3>${r.title}</h3><p style='color:#6b7280'>${r.desc}</p><p><strong>Age:</strong> ${r.age} • <strong>Interest:</strong> ${r.interest}</p><p><button onclick="alert('Signups handled by program provider in a real site')" style="background:#2563eb;color:#fff;border:none;padding:8px 10px;border-radius:8px">Sign up</button></p>`;
        resultsContainer.appendChild(el);
      });
    };
  }

  // CREATE OPPORTUNITY FORM
  const opportunityFormBtn = document.querySelector('button[onclick^="submitOpportunity"]');
  if(opportunityFormBtn){
    window.submitOpportunity = function(){
      const title = document.getElementById('title').value;
      const age = document.getElementById('age').value;
      const interest = document.getElementById('interest').value;
      const desc = document.getElementById('desc').value;
      const link = document.getElementById('link').value;
      if(!title || !desc || !link){
        alert('Please complete required fields.');
        return;
      }
      alert('Thank you — your opportunity was submitted. (Demo: no data saved)');
    };
  }

  // DONATE FORM
  const donateBtn = document.querySelector('button[onclick^="donate"]');
  if(donateBtn){
    window.donate = function(){
      const amt = document.getElementById('amount').value;
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      if(!amt || !name || !email){
        alert('Please complete the form.');
        return;
      }
      alert('Thanks for your support — this is a demo and no payment was processed.');
    };
  }
});
