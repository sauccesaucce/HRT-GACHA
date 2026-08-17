const crackBtn = document.getElementById('crackBtn');
const gachaMachine = document.getElementById('gachaMachine');
const machineBg = document.getElementById('machineBg');
const gachaBall = document.getElementById('gachaBall');
const revealBox = document.getElementById('revealBox');
const revealImg = document.getElementById('revealImg');
const songNameText = document.getElementById('songName');
const skyStars = document.getElementById('skyStars');

const spinAudio = new Audio('spin.wav');
spinAudio.preload = 'auto';

let currentMusic = null;
let isSpinning = false;
let musicTimeout = null;

const gachaItems = [
    {
        title: "opens arm",
        audio: "song1.mp3",
        ballImg: "ball_white.PNG",
        revealImg: "reveal_white.PNG"
    },
    {
        title: "better",
        audio: "song2.mp3",
        ballImg: "ball_neonblue.png",
        revealImg: "reveal_neonblue.jpg"
    },
    {
        title: "gold chain",
        audio: "song3.mp3",
        ballImg: "ball_neonpink.png",
        revealImg: "reveal_neonpink.PNG"
    },
    {
        title: "君のまま",
        audio: "song4.mp3",
        ballImg: "ball_black.png",
        revealImg: "reveal_black.PNG"
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

                    // เปิดไข่และเปิดท้องฟ้าดวงดาว + ดาวตก
                    revealBox.classList.add('pop');
                    skyStars.classList.add('active');
                    
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
    skyStars.classList.remove('active'); // ซ่อนดาวกลับไป
    
    machineBg.classList.remove('hidden');
    crackBtn.classList.remove('hidden', 'spinning');

    setTimeout(() => {
        isSpinning = false;
    }, 300);
}
