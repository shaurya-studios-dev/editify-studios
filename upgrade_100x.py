import re

filepath = r'D:\DOCUMENTS\EDITIFY.STUDIOS\index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fonts and Scripts
# Replace Bebas Neue link with Inter and Bebas Neue
font_old = r'<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400&display=swap" rel="stylesheet">'
font_new = r'''<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js"></script>'''
if 'family=Inter' not in content:
    content = content.replace(font_old, font_new)

# 2. Extract and replace the entire <style> block
style_pattern = re.compile(r'<style>.*?</style>', re.DOTALL)

new_style = r'''<style>
        :root {
            --bg-color: #050505;
            --text-color: #f8f5ed;
            --text-muted: #a0a0a0;
            --card-bg: rgba(20, 20, 20, 0.6);
            --nav-bg: rgba(5, 5, 5, 0.8);
            --border-color: rgba(255, 255, 255, 0.08);
            --gold-light: #D4AF37;
            --gold-dark: #B8860B;
            --gold-glow: rgba(212, 175, 55, 0.15);
            --hover-bg: rgba(255, 255, 255, 0.03);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
            overflow-x: hidden;
        }

        /* Ambient Glow Background */
        body::before {
            content: '';
            position: fixed;
            top: -50%; left: -50%; width: 200vw; height: 200vh;
            background: radial-gradient(circle at 50% 50%, var(--gold-glow) 0%, transparent 40%);
            z-index: -1;
            pointer-events: none;
            animation: pulse-glow 15s infinite alternate;
        }

        @keyframes pulse-glow {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.2); opacity: 0.8; }
        }

        /* Typography */
        h1, h2, h3, .tagline, .nav-link, .work-category-title, .document-title {
            font-family: 'Bebas Neue', cursive;
            letter-spacing: 2px;
        }

        /* Header Navigation */
        .header {
            position: fixed;
            top: 0; left: 0; right: 0;
            background: var(--nav-bg);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid var(--border-color);
            z-index: 1000;
        }

        .top-left-logo {
            position: fixed;
            top: 10px; left: 20px;
            width: 50px; height: 50px;
            border-radius: 50%;
            border: 2px solid var(--gold-dark);
            box-shadow: 0 0 15px var(--gold-glow);
            z-index: 1001;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .top-left-logo:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 0 25px rgba(212, 175, 55, 0.4);
        }
        .top-left-logo img { width: 100%; height: 100%; object-fit: cover; }

        .nav-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .nav-bar {
            height: 70px; display: flex; align-items: center; justify-content: center; gap: 40px;
        }

        .nav-item { position: relative; }
        .nav-link {
            color: var(--text-color);
            text-decoration: none;
            padding: 10px 15px;
            font-size: 20px;
            transition: all 0.3s ease;
            position: relative;
        }
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0; left: 50%; width: 0; height: 2px;
            background: linear-gradient(90deg, var(--gold-light), var(--gold-dark));
            transition: all 0.3s ease;
            transform: translateX(-50%);
        }
        .nav-link:hover { color: var(--gold-light); text-shadow: 0 0 10px var(--gold-glow); }
        .nav-link:hover::after { width: 100%; }

        /* Dropdown Menu */
        .dropdown {
            position: absolute; top: 100%; left: 50%; transform: translateX(-50%) translateY(10px);
            background: rgba(15, 15, 15, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            opacity: 0; visibility: hidden;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            min-width: 200px; z-index: 1001;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            overflow: hidden;
        }
        .nav-item:hover .dropdown { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
        .dropdown-item {
            display: block; color: var(--text-muted); text-decoration: none; padding: 12px 20px;
            transition: all 0.2s ease; font-weight: 500; font-size: 14px;
        }
        .dropdown-item:hover { background: var(--hover-bg); color: var(--gold-light); padding-left: 25px; }

        /* Main Content */
        .main-content { margin-top: 100px; padding: 40px 20px; max-width: 1400px; margin-left: auto; margin-right: auto; }
        .offset-section { margin-left: 0; } /* Removed awkward offset */

        /* Home Section */
        .home-section { text-align: center; padding: 80px 0; }
        .logo-placeholder {
            width: 180px; height: 180px; margin: 0 auto 30px;
            border-radius: 50%; padding: 5px;
            background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
            box-shadow: 0 0 40px var(--gold-glow);
        }
        .logo-placeholder img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 4px solid var(--bg-color); }
        .tagline { font-size: 32px; color: var(--gold-light); margin-bottom: 60px; text-shadow: 0 0 20px var(--gold-glow); }

        /* Glass Cards (Features, Reviews, Pricing) */
        .feature-card, .pricing-card, .review-card {
            background: var(--card-bg);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            z-index: 1;
        }
        
        .feature-card::before, .pricing-card::before, .review-card::before {
            content: ''; position: absolute; inset: 0; border-radius: 20px;
            padding: 1px; background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
        }

        .feature-card:hover, .pricing-card:hover, .review-card:hover {
            border-color: rgba(212, 175, 55, 0.5);
            box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 20px var(--gold-glow);
            transform: translateY(-5px);
        }

        .content-section { display: none; padding: 40px 0; animation: fadeIn 0.5s ease; }
        .content-section.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .section-title {
            font-size: 42px; text-align: center; margin-bottom: 50px; color: var(--text-color);
            background: linear-gradient(90deg, var(--text-color), var(--gold-light));
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            display: inline-block; width: 100%;
        }
        .work-category-title { font-size: 36px; text-align: center; margin: 40px 0; color: var(--gold-light); }
        .work-subsection-title { font-size: 20px; text-align: center; margin: 30px 0; color: var(--text-muted); letter-spacing: 4px; font-weight: 600; }

        /* Based.com Masonry/Grid Gallery */
        .thumbnails-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px; margin-top: 30px;
        }
        
        .thumbnail-card {
            border-radius: 16px; overflow: hidden; position: relative;
            aspect-ratio: 16/9; background: #111; cursor: pointer;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        
        .thumbnail-placeholder {
            width: 100%; height: 100%; object-fit: cover;
            transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s;
        }

        .thumbnail-info {
            position: absolute; bottom: 0; left: 0; right: 0;
            padding: 30px 20px 20px;
            background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
            transform: translateY(100%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex; justify-content: space-between; align-items: flex-end;
        }
        
        .thumbnail-card:hover .thumbnail-placeholder { transform: scale(1.05); filter: brightness(0.6); }
        .thumbnail-card:hover .thumbnail-info { transform: translateY(0); }
        
        .thumbnail-type {
            background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
            color: #000; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700;
            text-transform: uppercase; letter-spacing: 1px;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
        }

        /* Features */
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .feature-card { padding: 40px 30px; text-align: center; }
        .feature-card h3 { font-size: 24px; color: var(--gold-light); margin-bottom: 20px; font-family: 'Bebas Neue', cursive; letter-spacing: 1px;}
        .feature-card p { font-size: 15px; color: var(--text-muted); }

        /* Pricing */
        .pricing-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; max-width: 1000px; margin: 0 auto; }
        .pricing-card { padding: 40px 30px; text-align: center; display: flex; flex-direction: column; }
        .pricing-type { font-size: 28px; color: var(--text-color); margin-bottom: 10px; font-family: 'Bebas Neue', cursive; letter-spacing: 1.5px; }
        .pricing-amount { font-size: 48px; font-weight: 700; color: var(--gold-light); margin-bottom: 30px; text-shadow: 0 0 20px var(--gold-glow); }
        .pricing-features { list-style: none; text-align: left; flex-grow: 1; }
        .pricing-features li { padding: 12px 0; color: var(--text-muted); border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 15px; }
        .pricing-features li:before { content: "✦"; color: var(--gold-light); margin-right: 10px; }
        
        .popular-badge {
            position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
            color: #000; padding: 8px 24px; border-radius: 20px; font-size: 13px; font-weight: 700;
            text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 5px 20px rgba(212, 175, 55, 0.5);
            z-index: 2;
        }
        .highlight { border-color: var(--gold-light); box-shadow: 0 0 30px rgba(212, 175, 55, 0.15); }

        /* Reviews */
        .reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
        .review-card { padding: 40px 30px; position: relative; }
        .review-logo { width: 50px; height: 50px; border-radius: 50%; margin-bottom: 20px; border: 2px solid var(--gold-dark); object-fit: cover; }
        .stars { color: var(--gold-light); font-size: 20px; margin-bottom: 15px; letter-spacing: 2px; }
        .review-text { font-size: 16px; color: var(--text-color); margin-bottom: 25px; font-style: italic; font-weight: 300; }
        .review-author { font-weight: 600; color: var(--gold-light); font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }

        /* Document / Legal Buttons */
        .legal-documents-section { display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; margin: 60px 0; }
        .document-item { text-align: center; }
        .document-title { color: var(--text-muted); font-size: 20px; margin-bottom: 15px; }
        .document-btn {
            display: inline-block; padding: 12px 30px; border-radius: 30px;
            background: rgba(255,255,255,0.05); color: var(--text-color); text-decoration: none;
            border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s ease; font-weight: 500;
        }
        .document-btn:hover { background: var(--gold-light); color: #000; border-color: var(--gold-light); box-shadow: 0 0 20px var(--gold-glow); }

        /* About Section */
        .about-content { max-width: 800px; margin: 0 auto; font-size: 18px; color: var(--text-muted); font-weight: 300; }
        .about-content p { margin-bottom: 25px; }
        .about-content h3 { color: var(--gold-light); font-size: 28px; margin: 40px 0 20px; }
        .about-content ul { list-style: none; margin-bottom: 30px; }
        .about-content ul li { margin-bottom: 15px; padding-left: 30px; position: relative; }
        .about-content ul li::before { content: '→'; color: var(--gold-light); position: absolute; left: 0; font-weight: bold; }
        hr { border: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); margin: 40px 0; }
        .about-logo { text-align: center; margin-top: 60px; }
        .about-logo img { width: 100px; height: 100px; border-radius: 50%; border: 2px solid var(--gold-dark); box-shadow: 0 0 30px var(--gold-glow); }

        /* Animations */
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        /* Responsive */
        @media (max-width: 768px) {
            .nav-bar { justify-content: space-between; padding: 0 20px; }
            .nav-item { display: none; }
            .mobile-menu-toggle { display: flex; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; }
            .hamburger-line { width: 25px; height: 2px; background: var(--text-color); transition: 0.3s; }
            
            .mobile-menu {
                position: absolute; top: 100%; left: 0; right: 0; background: var(--nav-bg);
                backdrop-filter: blur(16px); border-bottom: 1px solid var(--border-color);
                display: none; flex-direction: column; text-align: center; padding: 20px 0;
            }
            .mobile-menu.active { display: flex; }
            .mobile-menu-item { padding: 15px; color: var(--text-color); text-decoration: none; font-family: 'Bebas Neue', cursive; font-size: 24px; letter-spacing: 2px; }
            
            .section-title { font-size: 32px; }
            .pricing-amount { font-size: 36px; }
            .thumbnails-grid { grid-template-columns: 1fr; }
        }
        
        .theme-toggle { display: none; } /* Removed since we are full dark luxury */
    </style>'''

content = style_pattern.sub(new_style, content)

# 3. Add data-tilt attributes to cards
content = re.sub(r'class="feature-card"', r'class="feature-card" data-tilt data-tilt-glare data-tilt-max-glare="0.2" data-tilt-scale="1.02"', content)
content = re.sub(r'class="pricing-card"', r'class="pricing-card" data-tilt data-tilt-glare data-tilt-max-glare="0.2" data-tilt-scale="1.02"', content)
content = re.sub(r'class="pricing-card highlight"', r'class="pricing-card highlight" data-tilt data-tilt-glare data-tilt-max-glare="0.2" data-tilt-scale="1.05"', content)
content = re.sub(r'class="review-card"', r'class="review-card" data-tilt data-tilt-glare data-tilt-max-glare="0.1" data-tilt-scale="1.02"', content)

# 4. Remove dark mode toggle button HTML (since it's a dedicated luxury theme)
content = re.sub(r'<button class="theme-toggle".*?</button>', '', content)

# 5. Clean up JS to use VanillaTilt if needed (already handles itself via attributes)
js_script = r'''    <script>
        // VanillaTilt is auto-initialized by data-tilt attributes.

        function showSection(sectionId) {
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            if (sectionId === 'works') {
                const live = document.getElementById('live-industry');
                const gaming = document.getElementById('gaming-sector');
                if (live.style.display !== 'block' && gaming.style.display !== 'block') {
                    showWorks('live-industry');
                }
            }
        }

        function showWorks(categoryId) {
            const categories = ['live-industry', 'gaming-sector'];
            categories.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.style.display = 'none';
                }
            });

            const targetElement = document.getElementById(categoryId);
            if (targetElement) {
                targetElement.style.display = 'block';
                // Trigger animation reflow
                const cards = targetElement.querySelectorAll('.thumbnail-card');
                cards.forEach((card, index) => {
                    card.style.animation = 'none';
                    card.offsetHeight; /* trigger reflow */
                    card.style.animation = `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s forwards`;
                    card.style.opacity = '0';
                });
            }
            showSection('works');
        }

        function toggleMobileMenu() {
            document.getElementById('mobileMenu').classList.toggle('active');
        }

        function closeMobileMenu() {
            document.getElementById('mobileMenu').classList.remove('active');
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Intersection Observer for scroll animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            document.querySelectorAll('.feature-card, .review-card, .pricing-card').forEach((el, index) => {
                el.style.opacity = '0';
                // Stagger animations based on DOM order
                el.style.animationDelay = `${(index % 3) * 0.1}s`;
                observer.observe(el);
            });
            
            // Initialize VanillaTilt explicitly for dynamically shown elements if needed
            if (window.VanillaTilt) {
                VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
            }
        });

        window.showSection = showSection;
        window.showWorks = showWorks;
        window.toggleMobileMenu = toggleMobileMenu;
        window.closeMobileMenu = closeMobileMenu;
    </script>'''

content = re.sub(r'<script>.*?</script>', js_script, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("100x Luxury Theme Update Complete!")
