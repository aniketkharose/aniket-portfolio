document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const subjectCode = params.get('subject');
    const type = params.get('type'); // 'insem' or 'endsem'

    const titleEl = document.getElementById('viewer-title');
    const subtitleEl = document.getElementById('viewer-subtitle');
    const gridEl = document.getElementById('previews-grid');
    const downloadBtn = document.getElementById('download-btn');

    // Subject Code to Full Name Mapping
    const subjectNames = {
        'DC': 'Digital Communication',
        'MCA': 'Microcontroller and Applications',
        'EMFT': 'Electromagnetic Field Theory',
        'DBMS': 'Database Management System',
        'CN': 'Computer Networks'
    };

    // Instamojo Links (Separate for In-Sem and End-Sem)
    const instamojoLinks = {
        'DC': {
            'insem': 'https://imojo.in/subject-insem',
            'endsem': 'https://imojo.in/dOCTv0'
        },
        'MCA': {
            'insem': 'https://imojo.in/1SqR1T4',
            'endsem': 'https://imojo.in/1SqR1T4'
        },
        'EMFT': {
            'insem': 'https://imojo.in/cr2NT',
            'endsem': 'https://imojo.in/cr2NTX'
        },
        'DBMS': {
            'insem': 'https://imojo.in/Mx0B0f',
            'endsem': 'https://imojo.in/Mx0B0f'
        },
        'CN': {
            'insem': 'https://imojo.in/subject-insem',
            'endsem': 'https://imojo.in/Mx0B0f'
        }
    };

    const fullName = subjectNames[subjectCode] || subjectCode;
    const typeLabel = type === 'insem' ? 'In-Sem Notes' : 'End-Sem Notes';

    // Logic for In-Sem Notes (Unavailable)
    if (type === 'insem') {
        titleEl.innerText = "In-Sem Notes — Coming Soon";
        subtitleEl.innerText = "These notes are currently unavailable.";

        // Disable Download Button
        downloadBtn.style.opacity = '0.5';
        downloadBtn.style.pointerEvents = 'none'; // Make unclickable
        downloadBtn.href = '#';
        downloadBtn.innerHTML = '<i class="fas fa-lock" style="margin-right: 10px;"></i> UNAVAILABLE';

        // Clear Grid (No images)
        gridEl.innerHTML = '';

        return; // Stop execution here
    }

    // Normal Logic for End-Sem (or other types if added later)

    // Set Title
    if (fullName && type === 'endsem') {
        titleEl.innerText = `${fullName} — ${typeLabel}`;
        subtitleEl.innerText = `Previewing Units 3-6 samples`;
    } else {
        titleEl.innerText = "Subject Not Found";
        subtitleEl.innerText = "Please return to the store.";
        downloadBtn.style.display = 'none';
        return;
    }

    // Set Download Link
    const subjectLinks = instamojoLinks[subjectCode];
    let purchaseUrl = subjectLinks ? subjectLinks[type] : '#';



    if (purchaseUrl) {
        downloadBtn.href = purchaseUrl;
    } else {
        downloadBtn.style.display = 'none'; // Hide if no link found
    }

    // Generate Preview Images
    // Logic: Try PNG -> If fail, try JPG -> If fail, show placeholder

    const numImages = 5; // Number of sample images to show

    for (let i = 1; i <= numImages; i++) {
        const link = document.createElement('a');
        link.href = purchaseUrl;
        link.className = 'glass-card preview-card';
        link.style.display = 'block';
        link.style.overflow = 'hidden';
        link.style.position = 'relative';
        link.style.cursor = 'pointer';
        link.style.transition = '0.3s';

        // Paths
        const pngPath = `assets/previews/${subjectCode}/${type}/${i}.png`;
        const jpgPath = `assets/previews/${subjectCode}/${type}/${i}.jpg`;
        const placeholder = `https://via.placeholder.com/300x400/111/00f2ff?text=Preview+${i}`;

        link.innerHTML = `
            <div style="aspect-ratio: 3/4; background: #222; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <img id="img-${i}" src="${pngPath}" alt="Page ${i}" 
                    style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s;">
            </div>
            <div style="padding: 15px; text-align: center; background: rgba(0,0,0,0.5);">
                <span style="color: var(--primary-color); font-weight: 600;">Page ${i}</span>
            </div>
        `;

        // Image Fallback Logic
        const img = link.querySelector('img');

        img.onerror = function () {
            if (this.src.endsWith('.png')) {
                this.src = jpgPath; // Try JPG
            } else if (this.src.endsWith('.jpg')) {
                this.src = placeholder; // Give up, show placeholder
                this.onerror = null; // Prevent infinite loop
            }
        };

        // Hover Effect Logic
        link.onmouseenter = () => {
            link.style.transform = 'translateY(-5px)';
            link.style.boxShadow = '0 10px 30px rgba(0, 242, 255, 0.2)';
            link.querySelector('img').style.transform = 'scale(1.1)';
        };
        link.onmouseleave = () => {
            link.style.transform = 'translateY(0)';
            link.style.boxShadow = 'none';
            link.querySelector('img').style.transform = 'scale(1)';
        };

        gridEl.appendChild(link);
    }
});


