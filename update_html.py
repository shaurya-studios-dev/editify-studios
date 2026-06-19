import re
import os

filepath = r'D:\DOCUMENTS\EDITIFY.STUDIOS\index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove orphaned closing bracket (Line 735)
content = re.sub(r'(\.mobile-menu-item:hover\s*{\s*background-color:\s*#333;\s*color:\s*white;\s*})\s*}(?=\s*/\*\s*Responsive Design\s*\*/)', r'\1', content, flags=re.IGNORECASE)

# 2. Fix background attachment fixed
bg_css_old = r'''        body {
            font-family: 'Arial', sans-serif;
            background-image: url('background.jpg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-repeat: no-repeat;
            color: #333;
            line-height: 1.6;
        }'''
bg_css_new = r'''        :root {
            --bg-color: #ffffff;
            --text-color: #333333;
            --card-bg: #ffffff;
            --nav-bg: #ffffff;
            --border-color: #dddddd;
            --hover-bg: #333333;
            --hover-text: #ffffff;
        }

        [data-theme='dark'] {
            --bg-color: #121212;
            --text-color: #e0e0e0;
            --card-bg: #1e1e1e;
            --nav-bg: #1e1e1e;
            --border-color: #444444;
            --hover-bg: #ffffff;
            --hover-text: #121212;
        }

        body {
            font-family: 'Arial', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        body::before {
            content: '';
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background-image: url('background.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            z-index: -1;
            opacity: 0.8;
        }'''
content = content.replace(bg_css_old, bg_css_new)

# Update colors to use CSS variables
content = content.replace('background: white;', 'background: var(--nav-bg);')
content = content.replace('background-color: white;', 'background-color: var(--nav-bg);')
content = content.replace('color: #333;', 'color: var(--text-color);')
content = content.replace('border: 2px solid #ddd;', 'border: 2px solid var(--border-color);')
content = content.replace('border-bottom: 1px solid #e0e0e0;', 'border-bottom: 1px solid var(--border-color);')
content = content.replace('border-bottom: 1px solid #eee;', 'border-bottom: 1px solid var(--border-color);')
content = content.replace('border: 2px solid #333;', 'border: 2px solid var(--text-color);')
content = content.replace('border-bottom: 3px solid #333;', 'border-bottom: 3px solid var(--text-color);')
content = content.replace('border: 2px solid black;', 'border: 2px solid var(--text-color);')
content = content.replace('color: black;', 'color: var(--text-color);')
content = content.replace('background: black;', 'background: var(--hover-bg);')
content = content.replace('color: white;', 'color: var(--hover-text);')
content = content.replace('background-color: #333;', 'background-color: var(--hover-bg);')
content = content.replace('background: #333;', 'background: var(--hover-bg);')

# 3. Fix logo
content = content.replace('class=review-logo', 'class="review-logo"')

# 4. Fix review card hover glitch
content = re.sub(r'\.review-card img:not\(\.review-logo\) \{[^\}]+\}', '', content)
content = re.sub(r'\.review-card:hover img:not\(\.review-logo\) \{[^\}]+\}', '', content)

# 5. Hamburger menu HTML & Dark Mode Toggle
nav_items_old = r'<button class="mobile-menu-toggle" onclick="toggleMobileMenu()">⋯</button>'
nav_items_new = r'''
                <button class="theme-toggle" onclick="toggleTheme()" style="background: none; border: none; cursor: pointer; font-size: 20px; color: var(--text-color); margin-right: 15px;">🌙</button>
                <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">
                    <div class="hamburger-line"></div>
                    <div class="hamburger-line"></div>
                    <div class="hamburger-line"></div>
                </button>'''
content = content.replace(nav_items_old, nav_items_new)

# 6. Add Loading Lazy to images
content = re.sub(r'<img(?!.*loading=)([^>]+)>', r'<img\1 loading="lazy">', content)
content = content.replace('loading="lazy" loading="lazy"', 'loading="lazy"')

# 7. Add preload=none to videos
content = re.sub(r'<video(?!.*preload=)([^>]+)>', r'<video\1 preload="none">', content)

# 8. Add JS for Theme Toggle and Live Industry Default
js_add = r'''
        function toggleTheme() {
            const body = document.documentElement;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            document.querySelector('.theme-toggle').innerText = newTheme === 'dark' ? '☀️' : '🌙';
        }

        // Initialize Theme & Default Work section
        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            document.querySelector('.theme-toggle').innerText = savedTheme === 'dark' ? '☀️' : '🌙';
            
            // Intersection Observer for Animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.feature-card, .thumbnail-card, .review-card, .pricing-card').forEach(el => {
                el.style.opacity = '0';
                observer.observe(el);
            });
        });

        // Modify showSection to default to live-industry if Works is clicked and no category is visible
        const originalShowSection = showSection;
        showSection = function(sectionId) {
            originalShowSection(sectionId);
            if (sectionId === 'works') {
                const live = document.getElementById('live-industry');
                const gaming = document.getElementById('gaming-sector');
                if (live.style.display !== 'block' && gaming.style.display !== 'block') {
                    showWorks('live-industry');
                }
            }
        };
'''
content = content.replace('function showSection(sectionId) {', js_add + '\n        function showSection(sectionId) {')

# 9. Add Animations CSS
anim_css = r'''
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
        }
'''
content = content.replace('</style>', anim_css + '</style>')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated index.html')
