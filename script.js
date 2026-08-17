const crackBtn = document.getElementById('crackBtn');
const gachaMachine = document.getElementById('gachaMachine');
const machineBg = document.getElementById('machineBg');
const gachaBall = document.getElementById('gachaBall');
const revealBox = document.getElementById('revealBox');
const revealImg = document.getElementById('revealImg');
const songNameText = document.getElementById('songName');
const crtOverlay = document.getElementById('crtOverlay');
const neonGlow = document.getElementById('neonGlow');

const spinAudio = new Audio('spin.wav');
spinAudio.preload = 'auto';

let currentMusic = null;
let isSpinning = false;
let musicTimeout = null;

// รายชื่อแทร็กทั้งหมด (ตรงตามชื่อไฟล์ล่าสุด)
const gachaItems = [
    {
        title: "opens arm",
        audio: "song1.mp3",
        ballImg: "ball_white.PNG",
        revealImg: "reveal_white.png",
        glowColor: "rgba(255, 255, 255, 0.85)"
    },
    {
        title: "better",
        audio: "song2.mp3",
        ballImg: "ball_neonblue.png",
        revealImg: "reveal_neonblue.png",
        glowColor: "rgba(0, 240, 255, 0.85)"
    },
    {
        title: "gold chain",
        audio: "song3.mp3",
        ballImg: "ball_neonpink.png",
        revealImg: "reveal_neonpink.png",
        glowColor: "rgba(255, 0, 127, 0.85)"
    },
    {
        title: "君のまま",
        audio: "song4.mp3",
        ballImg: "ball_black.png",
        revealImg: "reveal_black.png",
        glowColor: "rgba(138, 43, 226, 0.85)"
    },
    {
        title: "★ SPECIAL TRACK ★", // แทร็ก SSR แสงทอง
        audio: "song5.mp3",
        ballImg: "ball_ssr.png",
        revealImg: "reveal_ssr.png",
        glowColor: "rgba(255, 215, 0, 0.95)"
    }
];

crackBtn.addEventListener('click', () => {
    if (isSpinning) return; 
    isSpinning = true;

    const randomIndex = Math.floor(Math.random() * gachaItems.length);
    const selectedItem = gachaItems[randomIndex];

    gachaBall.style.opacity = '';
    gachaBall.className = 'ball-img';
    gachaBall.src = selectedItem.ballImg;
    
    revealImg.src = selectedItem.revealImg;
    songNameText.innerText = selectedItem.title;

    neonGlow.style.background = `radial-gradient(circle, ${selectedItem.glowColor} 0%, rgba(0,0,0,0) 70%)`;

    if (currentMusic) {
        currentMusic.pause();
    }
    currentMusic = new Audio(selectedItem.audio);
    currentMusic.preload = 'auto';

    spinAudio.currentTime = 0;
    spinAudio.play().catch(e => console.log(e));
    crackBtn.classList.add('spinning');

    setTimeout(() => {
        gachaMachine.classList.add('shaking');
    }, 200);

    setTimeout(() => {
        gachaMachine.classList.remove('shaking');
        gachaBall.classList.add('drop');

        setTimeout(() => {
            gachaBall.classList.add('center-stage');

            setTimeout(() => {
                gachaBall.classList.add('ball-shake');

                setTimeout(() => {
                    gachaBall.classList.remove('center-stage', 'ball-shake', 'drop');
                    gachaBall.style.opacity = '0';
                    
                    machineBg.classList.add('hidden');
                    crackBtn.classList.add('hidden');

                    revealBox.classList.add('pop');
                    crtOverlay.classList.add('active');
                    
                    currentMusic.currentTime = 0;
                    currentMusic.play().catch(e => console.log(e));

                    clearTimeout(musicTimeout);
                    musicTimeout = setTimeout(() => {
                        resetGacha();
                    }, 30000);

                }, 900);
            }, 600);
        }, 500);
    }, 600);
});

revealBox.addEventListener('click', () => {
    resetGacha();
});

function resetGacha() {
    clearTimeout(musicTimeout);
    if (currentMusic) {
        currentMusic.pause();
    }
    
    revealBox.classList.remove('pop');
    crtOverlay.classList.remove('active');
    
    machineBg.classList.remove('hidden');
    crackBtn.classList.remove('hidden', 'spinning');

    setTimeout(() => {
        isSpinning = false;
    }, 300);
} 